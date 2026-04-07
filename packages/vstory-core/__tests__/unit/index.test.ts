import { Player } from '../../src/core/player';
import { globalTickerStore } from '../../src/tools/global-ticker';
import type { IActionProcessor } from '../../src/interface/action-processor';
import type { IActionSpec, IActSpec } from '../../src/interface/dsl/dsl';
import type { IStory } from '../../src/interface/story';

class FakeTicker {
  listeners = new Map<string, Set<(delta?: number) => void>>();
  start = jest.fn();
  getTimelines = jest.fn(() => [{ clear: jest.fn() }]);

  addListener(event: string, handler: (delta?: number) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(handler);
  }

  removeListener(event: string, handler: (delta?: number) => void) {
    this.listeners.get(event)?.delete(handler);
  }

  emit(event: string, delta?: number) {
    this.listeners.get(event)?.forEach(handler => handler(delta));
  }

  getListenerCount(event: string) {
    return this.listeners.get(event)?.size ?? 0;
  }
}

function createAction(action: string, startTime: number, duration: number): IActionSpec {
  return {
    action,
    startTime,
    payload: {
      animation: {
        duration
      }
    }
  };
}

function createActions(duration: number = 100): IActSpec[] {
  return [
    {
      id: 'act-1',
      scenes: [
        {
          id: 'scene-1',
          actions: [
            {
              characterId: 'character-1',
              characterActions: [createAction('appear', 0, 0), createAction('move', 0, duration)]
            }
          ]
        }
      ]
    }
  ];
}

function createActionProcessor(): IActionProcessor {
  return {
    getActInfo: jest.fn((characterId: string, action: IActionSpec) => ({
      startTime: action.startTime ?? 0,
      duration: (Array.isArray(action.payload) ? action.payload[0] : action.payload)?.animation?.duration ?? 0
    })),
    getProcessorList: jest.fn(),
    getProcessor: jest.fn(),
    doAction: jest.fn(),
    applyAppearAttrs: jest.fn(),
    release: jest.fn()
  } as unknown as IActionProcessor;
}

function createStory() {
  const character = {
    config: { type: 'text' },
    tickTo: jest.fn()
  };
  const story = {
    reset: jest.fn(),
    getCharacterById: jest.fn(() => character),
    getCharacterList: jest.fn(() => [character]),
    canvas: {
      tickTo: jest.fn()
    }
  } as unknown as IStory;

  return {
    story,
    character
  };
}

describe('Player', () => {
  let ticker: FakeTicker;

  beforeEach(() => {
    ticker = new FakeTicker();
    jest.spyOn(globalTickerStore, 'getGlobalTicker').mockReturnValue(ticker as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should pause and resume playback without relying on private fields', () => {
    const { story, character } = createStory();
    const actionProcessor = createActionProcessor();
    const player = new Player(story, { actionProcessor });
    (story.reset as jest.Mock).mockImplementation(() => player.reset());
    player.initActions(createActions(200));

    const stateEvents: string[] = [];
    player.on('stateChange', event => stateEvents.push(event.state));

    const nowSpy = jest.spyOn(Date, 'now');
    nowSpy.mockReturnValueOnce(1000).mockReturnValueOnce(1100).mockReturnValueOnce(1600).mockReturnValueOnce(1650);

    player.play(0);
    expect(player.state).toBe('playing');
    expect(player.totalTime).toBe(200);
    expect(ticker.getListenerCount('tick')).toBe(1);

    ticker.emit('tick');
    ticker.emit('tick');

    expect(player.currentTime).toBe(100);

    player.pause();
    expect(player.state).toBe('paused');
    expect(ticker.getListenerCount('tick')).toBe(0);

    ticker.emit('tick');
    expect(player.currentTime).toBe(100);

    player.resume();
    expect(player.state).toBe('playing');
    expect(ticker.getListenerCount('tick')).toBe(1);

    ticker.emit('tick');
    expect(player.currentTime).toBe(100);

    ticker.emit('tick');
    expect(player.currentTime).toBe(150);
    expect(player.state).toBe('playing');
    expect(character.tickTo).toHaveBeenCalledWith(150);
    expect(stateEvents).toEqual(['playing', 'paused', 'playing']);
  });

  it('should emit end and expose ended state when playback completes', () => {
    const { story } = createStory();
    const actionProcessor = createActionProcessor();
    const player = new Player(story, { actionProcessor });
    player.initActions(createActions());

    const endEvents: Array<{ currentTime: number; totalTime: number }> = [];
    player.on('end', event => endEvents.push(event));

    player.play(0);
    ticker.emit('tick', 100);

    expect(player.state).toBe('ended');
    expect(player.currentTime).toBe(100);
    expect(endEvents).toEqual([{ currentTime: 100, totalTime: 100 }]);
    expect(ticker.getListenerCount('tick')).toBe(0);
  });

  it('should restart story and scheduler state when play is called after pause or end', () => {
    const { story } = createStory();
    const actionProcessor = createActionProcessor();
    const player = new Player(story, { actionProcessor });
    (story.reset as jest.Mock).mockImplementation(() => player.reset());
    player.initActions(createActions());

    player.play(0);
    ticker.emit('tick', 50);

    player.pause();
    expect(player.state).toBe('paused');

    player.play(0);
    expect(story.reset).toHaveBeenCalledTimes(1);
    ticker.emit('tick', 100);

    expect(player.state).toBe('ended');
    expect(actionProcessor.applyAppearAttrs).toHaveBeenCalledTimes(2);
    expect(actionProcessor.doAction).toHaveBeenCalledTimes(4);

    player.play(0);
    expect(story.reset).toHaveBeenCalledTimes(2);
    ticker.emit('tick', 100);

    expect(player.state).toBe('ended');
    expect(actionProcessor.applyAppearAttrs).toHaveBeenCalledTimes(3);
    expect(actionProcessor.doAction).toHaveBeenCalledTimes(6);
  });
});
