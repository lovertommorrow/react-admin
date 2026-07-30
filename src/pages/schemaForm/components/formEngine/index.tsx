/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo } from 'react'
import { Form, Button, Card, Alert } from 'antd'
import type { FormEngineProps, JSONSchema } from './types'
import { validateField, isEmptyValue } from './validators'
import { getValue, setValue, shouldHide } from './utils'
import FieldRender from '../fieldRender'
import { useTranslation } from 'react-i18next'

function FormEngineContent(props: FormEngineProps) {
  const { t } = useTranslation();
  const {
    schema,
    value,
    onChange,
    onSubmit,
    disabled,
    readOnly,
    className,
    style,
  } = props
  const [formData, setFormData] = useState<Record<string, any>>(value || {})
  const [touched, setTouched] = useState<Set<string>>(new Set())
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleChange = useCallback(
    (newData: Record<string, any>) => {
      setFormData(newData)
      onChange?.(newData)
    },
    [onChange]
  )

  const validateAll = useCallback(function validateAll(
    data: any,
    schema: JSONSchema,
    path = ''
  ): Record<string, string[]> {
    const errors: Record<string, string[]> = {}

    if (schema.type === 'object' && schema.properties) {
      const required = schema.required || []
      for (const [key, fieldSchema] of Object.entries(schema.properties)) {
        if (shouldHide(fieldSchema, data)) continue
        const fieldPath = path ? `${path}.${key}` : key
        const fieldValue = getValue(data, key)

        if (required.includes(key) && isEmptyValue(fieldValue)) {
          errors[fieldPath] = ['此项为必填项']
        }

        const fieldErrors = validateField(fieldValue, fieldSchema)
        if (fieldErrors.length > 0) {
          errors[fieldPath] = [...(errors[fieldPath] || []), ...fieldErrors]
        }

        if (fieldSchema.type === 'object' && fieldValue) {
          Object.assign(errors, validateAll(fieldValue, fieldSchema, fieldPath))
        }
        if (
          fieldSchema.type === 'array' &&
          Array.isArray(fieldValue) &&
          fieldSchema.items
        ) {
          fieldValue.forEach((item, idx) => {
            if (fieldSchema.items!.type === 'object') {
              Object.assign(
                errors,
                validateAll(item, fieldSchema.items!, `${fieldPath}[${idx}]`)
              )
            } else {
              const itemErrors = validateField(item, fieldSchema.items!)
              if (itemErrors.length > 0) {
                errors[`${fieldPath}[${idx}]`] = itemErrors
              }
            }
          })
        }
      }
    }
    return errors
  }, [])

  // 修复：非提交状态下只显示已触摸字段的错误
  const errors = useMemo(() => {
    // 初始状态：没有任何交互，不显示任何错误
    if (!submitAttempted && touched.size === 0) return {}

    const allErrors = validateAll(formData, schema)

    // 提交后：全量显示所有错误
    if (submitAttempted) return allErrors

    // 未提交时：只显示已触摸（touched）字段的错误
    const filteredErrors: Record<string, string[]> = {}
    for (const path of touched) {
      if (allErrors[path]) {
        filteredErrors[path] = allErrors[path]
      }
    }
    return filteredErrors
  }, [formData, schema, submitAttempted, touched, validateAll])

  const handleFieldChange = useCallback(
    (path: string, val: any) => {
      const newData = setValue(formData, path, val)
      setTouched((prev) => new Set(prev).add(path))
      handleChange(newData)
    },
    [formData, handleChange]
  )

  const handleSubmit = useCallback(() => {
    setSubmitAttempted(true)
    const allErrors = validateAll(formData, schema)
    if (Object.keys(allErrors).length === 0) {
      onSubmit?.(formData)
    }
    // 重置表单状态
    setTouched(new Set());
    setSubmitAttempted(false)
  }, [formData, schema, onSubmit, validateAll])

  const renderFields = () => {
    if (schema.type !== 'object' || !schema.properties) {
      return <Alert message="Schema 根类型必须是 object" type="error" showIcon />
    }

    const properties = schema.properties;
    const required = schema.required || [];

    return Object.entries(properties).map(([key, fieldSchema]) => {
      if (shouldHide(fieldSchema, formData)) return null
      const fieldPath = key
      const fieldValue = getValue(formData, key)
      const isRequired = required.includes(key)
      const fieldErrors = errors[fieldPath]

      return (
        <Form.Item
          key={key}
          label={
            <span>
              {fieldSchema.title || key}
              {isRequired && <span style={{ color: '#ff4d4f', marginLeft: 4 }}>*</span>}
            </span>
          }
          help={fieldSchema.description}
          validateStatus={fieldErrors ? 'error' : undefined}
          extra={fieldErrors ? fieldErrors[0] : undefined}
        >
          <FieldRender
            schema={fieldSchema}
            name={fieldPath}
            value={fieldValue}
            onChange={(val) => handleFieldChange(fieldPath, val)}
            disabled={disabled}
            readOnly={readOnly}
            errors={fieldErrors}
          />
        </Form.Item>
      )
    })
  }

  return (
    <Card className={className} style={style} title={schema.title}>
      <Form layout="vertical">
        {renderFields()}
        {!readOnly && onSubmit && (
          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" size="large" onClick={handleSubmit} block>
              {t('schemaForm.submit')}
            </Button>
          </Form.Item>
        )}
      </Form>
    </Card>
  )
}

export default function FormEngine(props: FormEngineProps) {
  const { schema } = props
  const schemaKey = useMemo(() => JSON.stringify(schema), [schema])
  return <FormEngineContent key={schemaKey} {...props} />
}
