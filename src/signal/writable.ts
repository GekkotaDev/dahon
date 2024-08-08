import type { DeepReadonly, Ref, UnwrapRef } from "vue";
import type { Options } from "./types/factory";
import type { Signal, WritableSignal } from "./types/oop";

import { shallowRef } from "vue";
// import { SignalLock, SignalWriteInEffectError } from "./lock";

export const writableSignal = <T>(
  initial: T,
  options: Options<T>,
): WritableSignal<T> => {
  const frozen = shallowRef(false);
  const state = shallowRef(initial) as Ref<UnwrapRef<T>>;

  const update = (
    derivation: (value: UnwrapRef<T>) => UnwrapRef<T> | undefined,
  ): void => {
    if (frozen.value) return;

    const { update } = options;
    // if (SignalLock.write !== false) throw new SignalWriteInEffectError();

    const next = derivation(state.value);
    if (next && update(state.value, next as T)) state.value = next;
  };

  const set = (value: UnwrapRef<T>): void => {
    if (frozen.value) return;

    const { update } = options;
    // if (SignalLock.write !== false) throw new SignalWriteInEffectError();

    if (update(state.value, value as T)) state.value = value;
  };

  const freeze = (): void => {
    frozen.value = true;
  };

  const mutable = (): void => {
    frozen.value = false;
  };

  const self = Object.assign(() => state.value, {
    update,
    set,

    freeze,
    mutable,

    get readonly(): Signal<T> {
      return Object.assign(() => state.value, {
        ref: state as Readonly<Ref<DeepReadonly<UnwrapRef<T>>>>,
      });
    },

    get ref(): Ref<UnwrapRef<T>> {
      return state as Ref<UnwrapRef<T>>;
    },
  });

  return self;
};
