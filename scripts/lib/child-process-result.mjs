// A spawned release gate has succeeded only when it started and exited zero.
// spawnSync reports launch failures separately and leaves `status` null, so a
// truthiness check on status alone can accidentally turn a skipped gate green.
export const childProcessFailed = (result) =>
  Boolean(result?.error) || result?.status !== 0
