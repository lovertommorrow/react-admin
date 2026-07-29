/* eslint-disable @typescript-eslint/no-explicit-any */
export type JSONSchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'null'

export interface JSONSchema {
  type?: JSONSchemaType | JSONSchemaType[]
  title?: string
  description?: string
  default?: any
  enum?: any[]
  enumNames?: string[]
  properties?: Record<string, JSONSchema>
  required?: string[]
  items?: JSONSchema
  minLength?: number
  maxLength?: number
  minimum?: number
  maximum?: number
  pattern?: string
  format?: 'email' | 'password' | 'textarea' | 'date' | string
  uniqueItems?: boolean
  minItems?: number
  maxItems?: number
  'x-component'?: string
  'x-props'?: Record<string, any>
  'x-hidden'?: boolean | string
}

export interface FormEngineProps {
  schema: JSONSchema
  value?: Record<string, any>
  onChange?: (value: Record<string, any>) => void
  onSubmit?: (value: Record<string, any>) => void
  disabled?: boolean
  readOnly?: boolean
  className?: string
  style?: React.CSSProperties
  components?: Record<string, React.ComponentType<any>>
}

export interface FieldProps {
  schema: JSONSchema
  name: string
  value: any
  onChange: (value: any) => void
  disabled?: boolean
  readOnly?: boolean
  errors?: string[]
}
