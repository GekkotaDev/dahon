export const SignalLock = {
  write: false,
  read: false,
};

export class LockViolationError extends Error {}

export class SignalWriteInEffectError extends LockViolationError {
  cause = [
    "",
    //
  ].join(" ");
}
