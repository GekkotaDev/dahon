import type { PatchListener } from "immer";
import type { Ref, UnwrapRef } from "vue";

import { produce } from "immer";
import { shallowRef } from "vue";

export const useImmer = <T>(
  initial: T,
  listener?: PatchListener,
): [Ref<UnwrapRef<T>>, (updater: (state: T) => void) => void] => {
  const state = shallowRef<T>(initial);
  const update = (updater: (state: T) => void) => {
    state.value = produce(state.value, updater, listener);
  };

  return [state as Ref<UnwrapRef<T>>, update] as const;
};
