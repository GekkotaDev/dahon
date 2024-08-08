import type { Signal } from "../signal/types/oop";
import { isSignal, isWritableSignal } from "./is-signal";
import type { SignalsToRefs } from "./types/to-ref";

export const signalsToRefs = <T extends object>(
  object: T,
): SignalsToRefs<T> => {
  const refs: {
    [key: string]: unknown;
  } = {};

  for (const [key, value] of Object.entries(object)) {
    if (value === null) continue;

    if (isWritableSignal(value)) {
      refs[key] = value.ref;
      continue;
    }

    if (isSignal(value)) {
      refs[key] = value.ref;
      continue;
    }

    if (
      typeof value === "object" &&
      (value as Signal<unknown>)?.ref === undefined
    ) {
      refs[key] = signalsToRefs(value);
      continue;
    }

    refs[key] = value;
  }

  return refs as SignalsToRefs<T>;
};
