import type { DeepReadonly, Ref, UnwrapRef } from "vue";

export interface Signal<T> {
  /**
   * Read the current value of the signal.
   *
   * Outside of a reactive context such as composables and templates, callers
   * of the getter would receive a snapshot of the current state. Only in
   * reactive contexts should these signals be observed and made reactive.
   *
   * @preserve
   */
  (): UnwrapRef<T>;

  readonly ref: Readonly<Ref<DeepReadonly<UnwrapRef<T>>>>;
}

export interface WritableSignal<T> {
  /**
   * Read the current value of the signal.
   *
   * Outside of a reactive context such as composables and templates, callers
   * of the getter would receive a snapshot of the current state. Only in
   * reactive contexts should these signals be observed and made reactive.
   *
   * @preserve
   */
  (): UnwrapRef<T>;

  /**
   * Derive the next state from the current state.
   *
   * @param derived Callback function which accepts the current state as its
   * sole parameter and returns the next state. An early return may be used to
   * programmatically cancel the state update.
   *
   * @preserve
   */
  update(derivation: (value: UnwrapRef<T>) => UnwrapRef<T> | undefined): void;

  /**
   * Directly set the state of the signal.
   *
   * @preserve
   */
  set(value: UnwrapRef<T>): void;

  freeze(): void;

  mutable(): void;

  /**
   * Read only copy of the signal.
   *
   * @preserve
   */
  readonly readonly: Signal<T>;

  readonly ref: Ref<UnwrapRef<T>>;
}
