import type { ComputedRef, Ref } from "vue";
import type { Signal, WritableSignal } from "../signal";

import { isReadonly, isRef } from "vue";
import { signal } from "../signal";

export function toSignal<T>(ref: ComputedRef<T>): Signal<T>;
export function toSignal<T>(ref: Ref<T>): WritableSignal<T>;
export function toSignal<T>(value: T): T;
export function toSignal<T>(value: ComputedRef<T> | Ref<T> | T) {
  if (isRef(value) === false) return value;

  if (isReadonly(value)) {
    const ref = value as ComputedRef<T>;
    const proxy = signal.from(() => ref.value);
    return proxy;
  }

  const ref = value as Ref<T>;
  const proxy = signal.bind({
    get() {
      return ref.value;
    },

    set(value) {
      ref.value = value;
    },
  });
  return proxy;
}
