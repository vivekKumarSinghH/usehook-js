import { hooks } from 'usehookify/registry'
import type { HookMetadata } from 'usehookify/registry'

export function generateCatalog(): HookMetadata[] {
  return hooks
}

export function getHookById(id: string): HookMetadata | undefined {
  return hooks.find((hook) => hook.id === id)
}
