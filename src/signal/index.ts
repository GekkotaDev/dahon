export type { WritableSignal } from "./types/oop";
export type { SignalHooks } from "./types/hooks";

export { signal } from "./signal";

export type Signal<T> = () => T;
