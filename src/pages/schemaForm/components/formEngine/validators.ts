/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSONSchema } from "./types"

export function validateField(value: any, schema: JSONSchema): string[] {
  const errors: string[] = []
  if (value === undefined || value === null || value === '') return errors

  if (schema.type === 'string') {
    if (typeof value !== 'string') {
      errors.push('必须是字符串')
    } else {
      if (schema.minLength !== undefined && value.length < schema.minLength) {
        errors.push(`最少 ${schema.minLength} 个字符`)
      }
      if (schema.maxLength !== undefined && value.length > schema.maxLength) {
        errors.push(`最多 ${schema.maxLength} 个字符`)
      }
      if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
        errors.push('格式不正确')
      }
      if (schema.format === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.push('请输入有效的邮箱地址')
      }
    }
  }

  if (schema.type === 'number' || schema.type === 'integer') {
    const num = Number(value)
    if (isNaN(num)) {
      errors.push('必须是数字')
    } else {
      if (schema.type === 'integer' && !Number.isInteger(num)) {
        errors.push('必须是整数')
      }
      if (schema.minimum !== undefined && num < schema.minimum) {
        errors.push(`不能小于 ${schema.minimum}`)
      }
      if (schema.maximum !== undefined && num > schema.maximum) {
        errors.push(`不能大于 ${schema.maximum}`)
      }
    }
  }

  if (schema.type === 'array') {
    if (!Array.isArray(value)) {
      errors.push('必须是数组')
    } else {
      if (schema.minItems !== undefined && value.length < schema.minItems) {
        errors.push(`至少需要 ${schema.minItems} 项`)
      }
      if (schema.maxItems !== undefined && value.length > schema.maxItems) {
        errors.push(`最多 ${schema.maxItems} 项`)
      }
      if (schema.uniqueItems) {
        const seen = new Set()
        for (const item of value) {
          const key = JSON.stringify(item)
          if (seen.has(key)) {
            errors.push('数组项不能重复')
            break
          }
          seen.add(key)
        }
      }
    }
  }

  return errors
}

export function isEmptyValue(value: any): boolean {
  if (value === undefined || value === null) return true
  if (typeof value === 'string' && value.trim() === '') return true
  if (Array.isArray(value) && value.length === 0) return true
  if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) return true
  return false
}
