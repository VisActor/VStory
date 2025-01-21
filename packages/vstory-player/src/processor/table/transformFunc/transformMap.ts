import { runPanelAppear, runTableAppear } from './common/tableAppear';

export const transformMap = {
  appear: {
    // table:
    table: runTableAppear,
    // panel
    panel: runPanelAppear
  }
};
