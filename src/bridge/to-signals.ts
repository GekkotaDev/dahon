import type { Signal } from "../signal/types/oop";
import { toSignal } from "./to-signal";
import type { ToSignals } from "./types/to-signal";

export const toSignals = <T extends object>(object: T): ToSignals<T> => {
  const signals: {
    [key: string]: unknown;
  } = {};

  for (const [key, value] of Object.entries(object)) {
    if (value === null) continue;

    if (
      typeof value === "object" &&
      (value as Signal<unknown>)?.ref === undefined
    ) {
      signals[key] = toSignals(value);
      continue;
    }

    if (Array.isArray(value)) {
      signals[key] = value.map((item) => toSignal(item));
      continue;
    }

    signals[key] = toSignal(value);
  }

  return signals as ToSignals<T>;
};
