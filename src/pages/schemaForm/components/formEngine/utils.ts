/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSONSchema } from './types'

export function getValue(obj: any, path: string): any {
  if (!path) return obj
  const parts = path.split('.')
  let current = obj
  for (const part of parts) {
    if (current == null) return undefined
    const match = part.match(/^(.+)\[(\d+)\]$/)
    if (match) {
      current = current[match[1]]?.[parseInt(match[2])]
    } else {
      current = current[part]
    }
  }
  return current
}

export function setValue(obj: any, path: string, value: any): any {
  if (!path) return value
  const result = Array.isArray(obj) ? [...obj] : { ...obj }
  const parts = path.split('.')
  let current: any = result

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]
    const match = part.match(/^(.+)\[(\d+)\]$/)
    if (match) {
      const key = match[1]
      const idx = parseInt(match[2])
      if (!current[key]) current[key] = []
      if (!current[key][idx]) current[key][idx] = {}
      current = current[key][idx]
    } else {
      if (!current[part]) current[part] = {}
      current = current[part]
    }
  }

  const last = parts[parts.length - 1]
  const lastMatch = last.match(/^(.+)\[(\d+)\]$/)
  if (lastMatch) {
    const key = lastMatch[1]
    const idx = parseInt(lastMatch[2])
    if (!current[key]) current[key] = []
    current[key][idx] = value
  } else {
    current[last] = value
  }
  return result
}

export function deleteArrayItem(obj: any, path: string, index: number): any {
  const arr = getValue(obj, path)
  if (!Array.isArray(arr)) return obj
  const newArr = [...arr]
  newArr.splice(index, 1)
  return setValue(obj, path, newArr)
}

export function moveArrayItem(obj: any, path: string, from: number, to: number): any {
  const arr = getValue(obj, path)
  if (!Array.isArray(arr)) return obj
  const newArr = [...arr]
  const [item] = newArr.splice(from, 1)
  newArr.splice(to, 0, item)
  return setValue(obj, path, newArr)
}

export function shouldHide(schema: JSONSchema, formData: any): boolean {
  if (schema['x-hidden'] === true) return true
  if (typeof schema['x-hidden'] === 'string') {
    try {
      const fn = new Function('formData', `return ${schema['x-hidden']}`)
      return fn(formData)
    } catch {
      return false
    }
  }
  return false
}

export function getDefaultValue(schema: JSONSchema): any {
  if (schema.default !== undefined) return schema.default
  if (schema.type === 'string') return ''
  if (schema.type === 'number' || schema.type === 'integer') return undefined
  if (schema.type === 'boolean') return false
  if (schema.type === 'array') return []
  if (schema.type === 'object') return {}
  return undefined
} 