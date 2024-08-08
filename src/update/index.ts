/**
 * Always update the signal regardless of the values the current state and the
 * future state holds.
 *
 * @example
 * () => true
 *
 * @preserve
 */
export const always = <T>(_0: T, _1: T) => true;

/**
 * Update the signal if the current state and the future state are strictly
 * not equal.
 *
 * @example
 * (current, future) => current !== future
 *
 * @preserve
 */
export const unequal = <T>(current: T, future: T) => current !== future;

/**
 * Update the signal if the current state and the future state return false in
 * an Object.is comparison.
 *
 * @example
 * (current, future) => !Object.is(current, future)
 *
 * @preserve
 */
export const isnt = <T>(current: T, future: T) => !Object.is(current, future);

/**
 * The signal will never be updated.
 *
 * @example
 * () => false
 *
 * @preserve
 */
export const never = <T>(_0: T, _1: T) => false;

export const integer = <T>(current: T, future: T) => {
  if (Number.isNaN(current)) throw new TypeError("The state is not a number");
  if (Number.isNaN(future)) throw new TypeError("The state is not a number");

  const sum = (current as number) + (future as number);
  return Math.trunc(sum) === sum;
};
