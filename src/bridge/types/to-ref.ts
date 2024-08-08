import type { ComputedRef, Ref } from "vue";
import type { Signal, WritableSignal } from "../../signal/types/oop";

export type SignalsToRefs<Type extends object> = {
  [Key in keyof Type]: Type[Key] extends Signal<infer T>
    ? ComputedRef<T>
    : Type[Key] extends WritableSignal<infer T>
      ? Ref<T>
      : Type[Key] extends object
        ? SignalsToRefs<Type[Key]>
        : Type[Key];
};
