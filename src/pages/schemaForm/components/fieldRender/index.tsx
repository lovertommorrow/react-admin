
import { Input, InputNumber, Select, Radio, Switch, DatePicker } from 'antd'
import ArrayField from '../arrayField'
import ObjectField from '../objectField'
import { useTranslation } from 'react-i18next'
import type { FieldProps } from '../formEngine/types'

const { TextArea } = Input

export default function FieldRender(props: FieldProps) {
  const { t } = useTranslation()

  const {
    schema,
    name,
    value,
    onChange,
    disabled,
    readOnly,
    errors,
  } = props
  const commonProps = {
    disabled,
    style: { width: '100%' },
    status: errors && errors.length > 0 ? ('error' as const) : undefined,
  }

  if (schema['x-component']) {
    return <div style={{ color: '#999' }}>{t('schemaForm.customComponent')}: {schema['x-component']}</div>
  }

  if (schema.type === 'string') {
    if (schema.enum) {
      const options = schema.enum.map((val, i) => ({
        label: schema.enumNames?.[i] || val,
        value: val,
      }))
      if (schema.enumNames && schema.enumNames.length === schema.enum.length) {
        return (
          <Radio.Group
            name={schema.title}
            {...commonProps}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            options={options}
          />
        )
      }
      return (
        <Select
          {...commonProps}

          value={value}
          onChange={onChange}
          placeholder={t('schemaForm.placeholder')}
          options={options}
          allowClear
        />
      )
    }
    if (schema.format === 'textarea') {
      return (
        <TextArea
          name={schema.title}
          {...commonProps}
          rows={3}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )
    }
    if (schema.format === 'date') {
      return <DatePicker name={schema.title} {...commonProps} value={value} onChange={onChange} />
    }
    // default input field
    return (
      <Input
        {...commonProps}
        name={schema.title}
        type={schema.format === 'password' ? 'password' : schema.format === 'email' ? 'email' : 'text'}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }

  if (schema.type === 'number' || schema.type === 'integer') {
    return (
      <InputNumber
        name={schema.title}
        {...commonProps}
        value={value}
        onChange={onChange}
        min={schema.minimum}
        max={schema.maximum}
        precision={schema.type === 'integer' ? 0 : undefined}
        placeholder={t('schemaForm.numberPlaceholder')}
      />
    )
  }

  if (schema.type === 'boolean') {
    return (
      <Switch
        checked={!!value}
        onChange={onChange}
        disabled={disabled}
        checkedChildren={t('schemaForm.yes')}
        unCheckedChildren={t('schemaForm.no')}
      />
    )
  }

  if (schema.type === 'array') {
    return (
      <ArrayField
        schema={schema}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
      />
    )
  }

  if (schema.type === 'object') {
    return (
      <ObjectField
        schema={schema}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
      />
    )
  }

  return <div style={{ color: '#ff4d4f' }}>{t('schemaForm.noSupportType')}: {String(schema.type)}</div>
}
