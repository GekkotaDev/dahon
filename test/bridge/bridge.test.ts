import { describe, expect, it } from "vitest";
import { signal, toSignal } from "../../src";
import { isRef, ref } from "vue";

describe("Bridge", () => {
  it("converts to ref", () => {
    const count = signal(0);
    expect(isRef(count.ref)).toBeTruthy();
  });

  it("converts to signal", () => {
    const count = ref(2);
    const proxy = toSignal(count);
    expect(proxy()).toBe(2);

    count.value = 4;
    expect(count.value).toBe(4);
    expect(proxy()).toBe(4);
  });
});
