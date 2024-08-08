# Mutable

The `/mutable` namespace exposes two utilities to manage local state mutations, `useImmer` and `useMutable`.

The `useImmer` composable is merely a reactive wrapper for Immer. It follows the same implementation as documented in [Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html#immutable-data) with the addition of type safety and an optional patch listener if Immer's JSON Patches feature is used in your application.

The `useMutable` composable on the other hand is a more opinionated abstraction over Immer, implementing the state reducer pattern and returns a signal instead of a plain old Vue ref, along with an action dispatcher. Unlike Redux, you do not have to conform to the Flux Standard Action interface and Immer is used transparently under the hood.

The following is a minimal example of the `useMutable` API.

```typescript
import { useMutable } from "dahon"
import { match } from "ts-pattern"
import { watchEffect } from "vue"

const [count, messageCount] = useMutable(
  { count: 0 },
  (action: "increment" | "decrement" | "reset", mutate) =>
    match(action)
      .with("increment", () => mutate((state) => { state.count++ }))
      .with("decrement", () => mutate((state) => { state.count-- }))
      .with("reset", () => mutate((state) => { state.count = 0 }))
      .exhaustive(),
)

watchEffect(() => console.log(count())) //-> 0

messageCount("increment") //-> 1
```

For use cases such as this example, the `useMutable` composable is unnecessary. Where the `useMutable` composable is most useful are where complex state logic is involved and/or managing the state of a complex object. Rather than directly mutating the state anywhere by anything, the state mutation logic is instead encapsulated at a single point of interest, and those wanting to change the state may only do so by declaratively passing messages.
