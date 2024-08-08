import type { Signal, WritableSignal } from "../signal/types/oop";

export const isSignal = <T>(signal: Signal<T> | T): signal is Signal<T> =>
  (signal as Signal<T>)?.ref !== undefined;

export const isWritableSignal = <T>(
  signal: WritableSignal<T> | T,
): signal is WritableSignal<T> =>
  (signal as WritableSignal<T>)?.ref !== undefined &&
  (signal as WritableSignal<T>)?.set !== undefined &&
  (signal as WritableSignal<T>)?.update !== undefined;
