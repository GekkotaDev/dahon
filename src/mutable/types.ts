import type { DeepReadonly, Ref, UnwrapRef } from "vue";

export type Reducer<State, Action> = (
  action: Action,
  mutate: (updater: (state: State) => void) => void,
) => void;

export type ReadonlyRef<T> = Readonly<Ref<DeepReadonly<UnwrapRef<T>>>>;

/**
 * Extract the action types of the channel.
 *
 * @example
 * ActionsOf<typeof messageCount>
 *
 * @preserve
 */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ActionsOf<T extends (...args: any) => void> = Parameters<T>[0];
