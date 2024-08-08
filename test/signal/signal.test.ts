import { describe, expect, it } from "vitest";
import { signal } from "../../src";
import { isRef } from "vue";

describe("Object Oriented Signals API", () => {
  it("initializes state", () => {
    const count = signal(2);
    expect(count()).toBe(2);
  });

  it("sets state", () => {
    const count = signal(2);

    count.set(4);

    expect(count()).toBe(4);
  });

  it("updates state", () => {
    const data = signal({
      username: "johndoe",
      age: 17,
    });

    data.update((state) => {
      const data = { ...state };
      data.age++;
      return data;
    });

    expect(data().age).toBe(18);
  });

  it("provides ref", () => {
    const count = signal(2);

    expect(isRef(count)).toBeFalsy();
    expect(isRef(count.ref)).toBeTruthy();
  });

  it("creates readonly proxy", () => {
    const count = signal(2);
    const proxy = count.readonly;

    expect(count()).toEqual(proxy());

    count.set(4);

    expect(count()).toEqual(proxy());
  });

  it("freezes state", () => {
    const count = signal(2);

    count.freeze();
    count.set(4);
    expect(count()).toBe(2);

    count.mutable();
    count.set(4);
    expect(count()).toBe(4);
  });
});
