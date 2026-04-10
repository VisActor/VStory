global.__DEV__ = true;
global.__VERSION__ = true;

if (typeof global.Event === 'undefined') {
  global.Event = class Event {
    constructor(type, init = {}) {
      this.type = type;
      this.bubbles = Boolean(init.bubbles);
      this.cancelable = Boolean(init.cancelable);
      this.defaultPrevented = false;
    }

    preventDefault() {
      if (this.cancelable) {
        this.defaultPrevented = true;
      }
    }
  };
}

if (typeof global.CustomEvent === 'undefined') {
  global.CustomEvent = class CustomEvent extends global.Event {
    constructor(type, init = {}) {
      super(type, init);
      this.detail = init.detail;
    }
  };
}

if (typeof global.EventTarget === 'undefined') {
  global.EventTarget = class EventTarget {
    constructor() {
      this._listeners = new Map();
    }

    addEventListener(type, listener) {
      if (!listener) {
        return;
      }

      const listeners = this._listeners.get(type) ?? new Set();
      listeners.add(listener);
      this._listeners.set(type, listeners);
    }

    removeEventListener(type, listener) {
      this._listeners.get(type)?.delete(listener);
    }

    dispatchEvent(event) {
      if (!event || !event.type) {
        throw new TypeError('Invalid event');
      }

      event.target = this;
      const listeners = this._listeners.get(event.type);

      if (!listeners) {
        return !event.defaultPrevented;
      }

      listeners.forEach(listener => {
        if (typeof listener === 'function') {
          listener.call(this, event);
        } else if (typeof listener.handleEvent === 'function') {
          listener.handleEvent(event);
        }
      });

      return !event.defaultPrevented;
    }
  };
}
