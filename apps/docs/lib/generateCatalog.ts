import { hooks } from 'usehook-js/registry'
import type { HookMetadata } from 'usehook-js/registry'

export function generateCatalog(): HookMetadata[] {
  return hooks
}

export function getHookById(id: string): HookMetadata | undefined {
  return hooks.find((hook) => hook.id === id)
}
