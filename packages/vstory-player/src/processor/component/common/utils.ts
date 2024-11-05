import type { IActionSpec } from '@visactor/vstory-core';

export function getPayload(action: IActionSpec) {
  return (Array.isArray(action.payload) ? action.payload[0] : action.payload) ?? {};
}
