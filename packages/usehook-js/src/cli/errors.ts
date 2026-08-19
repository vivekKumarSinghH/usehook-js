export class InvalidHookIdError extends Error {
  constructor(public readonly hookId: string, public readonly validIds: string[]) {
    super(`Unknown hook "${hookId}". Valid hooks: ${validIds.join(', ')}`)
  }
}

export class TargetExistsError extends Error {
  constructor(public readonly path: string) {
    super(`"${path}" already exists. Re-run with --force to overwrite.`)
  }
}
