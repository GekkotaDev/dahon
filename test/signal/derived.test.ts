import { describe, expect, it } from "vitest";
import { signal } from "../../src";
import { isRef } from "vue";

describe("Derived Signal ", () => {
  it("initializes derived state", () => {
    const count = signal(2);
    const square = signal.from(() => count() * count());

    expect(square()).toBe(4);
  });

  it("updates derived state", () => {
    const count = signal(2);
    const square = signal.from(() => count() * count());

    count.set(4);

    expect(square()).toBe(16);
  });

  it("provides ref", () => {
    const count = signal(2);
    const square = signal.from(() => count() * count());

    expect(isRef(square.ref)).toBeTruthy();
  });
});
