/* eslint-disable @typescript-eslint/no-explicit-any */
import FieldRenderer from '../fieldRender'
import type { JSONSchema } from '../formEngine/types'
import { getValue, setValue, shouldHide } from '../formEngine/utils'

interface ObjectFieldProps {
  schema: JSONSchema
  name: string
  value: Record<string, any>
  onChange: (value: Record<string, any>) => void
  disabled?: boolean
  readOnly?: boolean
}

export default function ObjectField(props: ObjectFieldProps) {
  const {
    schema,
    name,
    value = {},
    onChange,
    disabled,
    readOnly,
  } = props
  const properties = schema.properties || {}
  const required = schema.required || []

  const handleFieldChange = (fieldName: string, fieldValue: any) => {
    onChange(setValue(value, fieldName, fieldValue))
  }

  return (
    <div
      style={{
        padding: 16,
        background: '#fafafa',
        borderRadius: 8,
        border: '1px solid #f0f0f0',
      }}
    >
      {schema.title && (
        <div style={{ fontWeight: 500, marginBottom: 16, fontSize: 14 }}>
          {schema.title}
        </div>
      )}
      {Object.entries(properties).map(([key, fieldSchema]) => {
        if (shouldHide(fieldSchema, value)) return null
        const fieldValue = getValue(value, key)
        const isRequired = required.includes(key)

        return (
          <div key={key} style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 6, fontWeight: 500, fontSize: 14 }}>
              {fieldSchema.title || key}
              {isRequired && <span style={{ color: '#ff4d4f', marginLeft: 4 }}>*</span>}
            </div>
            {fieldSchema.description && (
              <div style={{ fontSize: 12, color: '#999', marginBottom: 6 }}>
                {fieldSchema.description}
              </div>
            )}
            <FieldRenderer
              schema={fieldSchema}
              name={`${name}.${key}`}
              value={fieldValue}
              onChange={(val) => handleFieldChange(key, val)}
              disabled={disabled}
              readOnly={readOnly}
            />
          </div>
        )
      })}
    </div>
  )
}
