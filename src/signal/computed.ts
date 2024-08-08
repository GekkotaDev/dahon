import type {
  ComputedGetter,
  DebuggerOptions,
  WritableComputedOptions,
} from "vue";
import type { Options } from "./types/factory";
import type { Signal, WritableSignal } from "./types/oop";

import { computed, readonly, shallowRef } from "vue";
// import { SignalLock, SignalWriteInEffectError } from "./lock";

export const computedSignal = <T>(
  derived: ComputedGetter<T>,
  options: Options<T> & DebuggerOptions,
): Signal<T> => {
  const state = computed(derived, options);

  return Object.assign(() => state.value, {
    get ref() {
      return readonly(state);
    },
  }) as Signal<T>;
};

export function bindSignal<T>(
  derived: WritableComputedOptions<T>,
  options: Options<T> & DebuggerOptions,
): WritableSignal<T> {
  const frozen = shallowRef(false);
  const state = computed(derived, options);

  const update = (derivation: (value: T) => T | undefined) => {
    if (frozen.value) return;

    const { update } = options;
    // if (SignalLock.write !== false) throw new SignalWriteInEffectError();

    const next = derivation(state.value);
    if (next && update(state.value, next)) state.value = next;
  };

  const set = (value: T) => {
    if (frozen.value) return;

    const { update } = options;
    // if (SignalLock.write !== false) throw new SignalWriteInEffectError();

    if (update(state.value, value)) state.value = value;
  };

  const freeze = () => {
    frozen.value = true;
  };

  const mutable = () => {
    frozen.value = false;
  };

  return Object.assign(() => state.value, {
    update,
    set,

    freeze,
    mutable,

    get readonly() {
      return Object.assign(() => state.value, {
        get ref() {
          return state;
        },
      }) as Signal<T>;
    },

    get ref() {
      return state;
    },
  }) as WritableSignal<T>;
}
