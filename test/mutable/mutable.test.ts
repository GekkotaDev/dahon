import { beforeEach, describe, expect, it } from "vitest";
import { match } from "ts-pattern";
import { useMutable } from "../../src";

describe("useMutable API", () => {
  const [count, messageCount] = useMutable(
    { value: 0 },
    (action: "increment" | "decrement" | "reset", mutate) =>
      match(action)
        .with("increment", () =>
          mutate((state) => {
            state.value++;
          }),
        )
        .with("decrement", () =>
          mutate((state) => {
            state.value--;
          }),
        )
        .with("reset", () =>
          mutate((state) => {
            state.value = 0;
          }),
        )
        .exhaustive(),
  );

  beforeEach(() => {
    messageCount("reset");
  });

  it("initializes state", () => expect(count().value).toBe(0));

  it("updates state", () => {
    messageCount("increment");

    expect(count().value).toBe(1);
  });
});
