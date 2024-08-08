export const nuxt = [
  {
    from: "dahon/bridge",
    imports: ["toSignal"],
  },
  {
    from: "dahon/signal",
    imports: ["signal", "WritableSignal", "SignalHooks"],
  },
  {
    from: "dahon/mutable",
    imports: ["useMutable", "ActionsOf"],
  },
];
