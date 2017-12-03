export const DETECT_TOUCH = 'DETECT_TOUCH';

export const entities = {
  DETECT_TOUCH: 'DETECT_TOUCH',
};

export function detectTouch(flag) {
  return { type: DETECT_TOUCH, flag };
}
