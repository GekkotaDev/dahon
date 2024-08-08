import type { UnwrapRef } from "vue";

export interface Options<T> {
  /**
   * Determine if the signal should update given the current state and the
   * future state.
   *
   * @param current Current state.
   * @param future Future state.
   * @returns Future state permission to overwrite current state.
   *
   * @preserve
   */
  update(current: T | UnwrapRef<T>, future: T | UnwrapRef<T>): boolean;
}
