import type { IUpdateConfigParams } from '../common/interface';

export interface IConfigProcess {
  checkEnable: (diffConfig: IUpdateConfigParams, config: IUpdateConfigParams) => boolean;
  updateConfig: (
    diffConfig: IUpdateConfigParams,
    config: IUpdateConfigParams,
    targetConfig: IUpdateConfigParams
  ) => boolean;
}

// export interface IAttributeProcess {
//   applyConfigToAttribute: (diffConfig: IUpdateConfigParams, nextConfig: IUpdateConfigParams) => boolean;
//   getDefaultAttribute: () => any;
//   getAttribute: () => any;
// };
