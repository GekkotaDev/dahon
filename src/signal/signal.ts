import type {
  ComputedGetter,
  DebuggerOptions,
  WritableComputedOptions,
} from "vue";
import type { Options } from "./types/factory";
import type { SignalHooks } from "./types/hooks";
import type { Signal, WritableSignal } from "./types/oop";

import { unequal as update } from "../update";
import { bindSignal, computedSignal } from "./computed";
import { createSignal } from "./hooks";
import { writableSignal } from "./writable";

/**
 * Container for state (data that changes over the duration of time).
 *
 * @preserve
 */
export const signal = Object.assign(
  /**
   * Container that stores and updates state, and returns a snapshot of the
   * current state.
   *
   * @param initial The initial state of the signal. It must be explicitly
   * initialized, otherwise explicitly specify it being optional with a
   * generic.
   *
   * @returns Writable signal.
   *
   * @preserve
   */
  <T>(initial: T, options: Partial<Options<T>> = {}): WritableSignal<T> => {
    const opts = {
      update,
      ...options,
    };

    return writableSignal(initial, opts);
  },
  {
    /**
     * Create a derived signal with two way data binding.
     *
     * @param binder Object containing `.get` and `.set` methods to interact
     * with the composed signals.
     *
     * @returns Writable computed signal.
     *
     * @preserve
     */
    bind: <T>(
      binder: WritableComputedOptions<T>,
      options: Partial<Options<T>> & DebuggerOptions = {},
    ): WritableSignal<T> => {
      const opts = {
        update,
        ...options,
      };

      return bindSignal(binder, opts);
    },

    /**
     * Create a cached derived signal computed from a callback function.
     *
     * @param derived Callback function that derives the state of this signal
     * by composing it from other signals.
     *
     * @returns The derived signal.
     *
     * @preserve
     */
    from: <T>(
      derived: ComputedGetter<T>,
      options: Partial<Options<T>> & DebuggerOptions = {},
    ): Signal<T> => {
      const opts = {
        update,
        ...options,
      };

      return computedSignal(derived, opts);
    },

    hook: <T>(
      initial: T,
      options: Partial<Options<T>> = {},
    ): SignalHooks<T> => {
      const opts = {
        update,
        ...options,
      };

      return createSignal(initial, opts);
    },
  },
);
