# Signals

As quoted in the Vue documentation under [Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html#connection-to-signals)

> Fundamentally, signals are the same kind of reactivity primitive as Vue refs. It's a value container that provides dependency tracking on access, and side-effect triggering on mutation.

If you've installed this library solely for an easy performance gain, this unfortunately is not true and it is recommended instead to look into the (upcoming) [Vapor Mode](https://github.com/vuejs/core-vapor). Signals in this library instead add more expressive APIs.

For example, Solid.js style decoupled getter and setters

```typescript
const [count, setCount] = signal.hook(2)
```

In contrast to Vue's `ref` primitive, the reference to the contained state will always be read only unless the is also setter explicitly exposed whereas with the `ref` primitive it must not be forgotten it should be wrapped first with the `readonly` function. Whether this additional layer of safety is justified in your project is left at your own discretion.

Otherwise, syntax more similar to Angular's interface for signals is also available

```typescript
const count = signal(2)
```

This syntax however does not explicitly decouple setters and getters but still makes their separation clearly distinct.

```typescript
const foo = signal(0)
const bar = ref(0)

// Getters
foo()
bar.value

// Setters
foo.set(2)
foo.update(count => count * count)
bar.value = 2
bar.value = bar.value * bar.value
```

No imports are necessary when converting signals with the Object Oriented API to read only.

```typescript
const count = signal(2)
count.readonly
```

For computed signals, Dahon exposes the `signal.from` and `signal.bind` methods that are comparable to Vue's `computed` primitive.
