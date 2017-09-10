export const INIT = 'INIT';

export const entities = {
  INIT: 'INIT',
};

export function init(text) {
  return { type: INIT, text };
}
