import { describe, expect, it } from "vitest";
import { signal } from "../../src";

describe("Writable Derived Signal", () => {
  it("binds to state", () => {
    const first = signal("John");
    const last = signal("Doe");
    const name = signal.bind({
      get() {
        return `${first()} ${last()}`;
      },

      set(value) {
        const name = value.split(" ");

        first.set(name[0]);
        last.set(name[1]);
      },
    });

    expect(name()).toBe("John Doe");
  });

  it("is writable", () => {
    const first = signal("John");
    const last = signal("Doe");
    const name = signal.bind({
      get() {
        return `${first()} ${last()}`;
      },

      set(value) {
        const name = value.split(" ");

        first.set(name[0]);
        last.set(name[1]);
      },
    });

    expect(name()).toBe("John Doe");

    name.set("Jane Doe");

    expect(name()).toBe("Jane Doe");
  });
});
