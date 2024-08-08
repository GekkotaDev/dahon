import type { PatchListener } from "immer";
import type { Reducer } from "./types";

import { toSignal } from "../bridge";
import { useImmer } from "./immer";

/**
 * Declarative state mutation based on message passing and constraints instead
 * of direct, imperative changes.
 *
 * @param initial The initial state.
 * @param mutator Maps messages to respective mutations.
 * @returns Signal and channel.
 *
 * @example
 * const [count, messageCount] = useMutable(
 *   { count: 0 },
 *   (action: "increment" | "decrement" | "reset", mutate) =>
 *     match(action)
 *       .with("increment", () => mutate((state) => state.count++))
 *       .with("decrement", () => mutate((state) => state.count--))
 *       .with("reset", () => mutate((state) => (state.count = 0)))
 *       .exhaustive(),
 * )
 *
 * @preserve
 */
export const useMutable = <Actions, T extends object>(
  initial: T,
  mutator: Reducer<T, Actions>,
  history: PatchListener | undefined = undefined,
) => {
  const [state, update] = useImmer(initial, history);

  /**
   * Dispatch a message to the mutator.
   *
   * @param action Action to perform.
   * @returns `void`
   */
  const dispatcher = (action: Actions): void => void mutator(action, update);

  return [toSignal(state), dispatcher] as const;
};
