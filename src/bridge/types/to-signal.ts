import type { ComputedRef, Ref } from "vue";
import type { Signal, WritableSignal } from "../../signal/types/oop";

export type ToSignal<R> = R extends ComputedRef<infer T>
  ? Signal<T>
  : R extends Ref<infer T>
    ? WritableSignal<T>
    : R;

export type ToReadonlySignal<R> = R extends ComputedRef<infer T>
  ? Signal<T>
  : R extends Ref<infer T>
    ? Signal<T>
    : R;

export type ToSignals<Type extends object> = {
  [Key in keyof Type]: Type[Key] extends ComputedRef<infer T>
    ? Signal<T>
    : Type[Key] extends Ref<infer T>
      ? WritableSignal<T>
      : Type[Key] extends object
        ? ToSignals<Type[Key]>
        : Type[Key];
};

export type ToReadonlySignals<Type extends object> = {
  [Key in keyof Type]: Type[Key] extends ComputedRef<infer T>
    ? Signal<T>
    : Type[Key] extends Ref<infer T>
      ? Signal<T>
      : Type[Key] extends object
        ? ToSignals<Type[Key]>
        : Type[Key];
};
