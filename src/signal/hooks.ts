import type { DeepReadonly, Ref, UnwrapRef } from "vue";
import type { Options } from "./types/factory";
import type { SignalHooks } from "./types/hooks";

import { readonly, shallowRef } from "vue";
// import { SignalLock, SignalWriteInEffectError } from "./lock";

export const createSignal = <T>(
  initial: T,
  options: Options<T>,
): SignalHooks<T> => {
  const frozen = shallowRef(false);
  const state = shallowRef<T>(initial) as Ref<UnwrapRef<T>>;

  const getter = Object.assign(() => state.value as UnwrapRef<T>, {
    ref: readonly(state) as Readonly<Ref<DeepReadonly<UnwrapRef<T>>>>,
  });

  const setter = Object.assign(
    (value: UnwrapRef<T>) => {
      if (frozen.value) return;
      const { update } = options;
      // if (SignalLock.write !== false) throw new SignalWriteInEffectError();
      if (update(state.value, value as T)) state.value = value;
    },
    {
      from: (
        setter: (state: UnwrapRef<T>) => UnwrapRef<T> | undefined,
      ): void => {
        if (frozen.value) return;

        const { update } = options;

        // if (SignalLock.write !== false) throw new SignalWriteInEffectError();

        const next = setter(state.value);
        if (next && update(state.value, next as T)) state.value = next;
      },

      freeze(): void {
        frozen.value = true;
      },

      mutable(): void {
        frozen.value = false;
      },
    },
  );

  return [getter, setter] as const;
};
