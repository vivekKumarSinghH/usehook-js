export interface Param {
  name: string
  type: string
  description: string
  required: boolean
}

export interface Example {
  title: string
  code: string
}

export interface HookMetadata {
  id: string
  name: string
  description: string
  category: string
  sourceFile: string
  params: Param[]
  returns: string
  examples: Example[]
}
