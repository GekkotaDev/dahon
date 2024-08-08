import { describe, expect, it } from "vitest";
import { signal } from "../../src";
import { isRef } from "vue";

describe("Functional Signals API", () => {
  it("initializes state", () => {
    const [count, _] = signal.hook(2);

    expect(count()).toBe(2);
  });

  it("sets state", () => {
    const [count, setCount] = signal.hook(2);

    setCount(4);

    expect(count()).toBe(4);
  });

  it("updates state", () => {
    const [count, setCount] = signal.hook(4);

    setCount.from((count) => count * count);

    expect(count()).toBe(16);
  });

  it("throws on writing getter", () => {
    const [count, _] = signal.hook(2);

    expect(() => {
      // @ts-ignore
      count.set(0);
    }).toThrow();
  });

  it("provides ref", () => {
    const [count, _] = signal.hook(2);
    expect(isRef(count.ref)).toBeTruthy();
  });
});
