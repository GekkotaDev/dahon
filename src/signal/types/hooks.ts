import type { UnwrapRef } from "vue";
import type { Signal } from "./oop";

interface Getter<T> extends Signal<T> {}
interface Setter<T> {
  /**
   * Directly set the state of the signal.
   *
   * @preserve
   */
  (value: UnwrapRef<T>): void;

  /**
   * Derive the next state from the current state.
   *
   * @param derived Callback function which accepts the current state as its
   * sole parameter and returns the next state. An early return may be used to
   * programmatically cancel the state update.
   *
   * @preserve
   */
  from(derived: (state: UnwrapRef<T>) => UnwrapRef<T>): void;

  freeze(): void;

  mutable(): void;
}
type Hooks<T> = [Getter<T>, Setter<T>];

export type { Hooks as SignalHooks };
