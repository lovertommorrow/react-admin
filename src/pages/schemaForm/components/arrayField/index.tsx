/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Space, Tooltip } from 'antd'
import {
  PlusOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons'
import type { JSONSchema } from '../formEngine/types'
import FieldRenderer from '../fieldRender'
import { getDefaultValue, deleteArrayItem, moveArrayItem } from '../formEngine/utils'
import { useTranslation } from 'react-i18next'

interface ArrayFieldProps {
  schema: JSONSchema
  name: string
  value: any[]
  onChange: (value: any[]) => void
  disabled?: boolean
  readOnly?: boolean
}

export default function ArrayField(props: ArrayFieldProps) {
  const { t } = useTranslation();
  const {
    schema,
    name,
    value = [],
    onChange,
    disabled,
    readOnly,
  } = props
  const items = value || []
  const itemSchema = schema.items || { type: 'string' }

  const handleAdd = () => {
    onChange([...items, getDefaultValue(itemSchema)])
  }

  const handleDelete = (index: number) => {
    onChange(deleteArrayItem({ [name]: items }, name, index)[name])
  }

  const handleMove = (from: number, to: number) => {
    onChange(moveArrayItem({ [name]: items }, name, from, to)[name])
  }

  const handleItemChange = (index: number, val: any) => {
    const newItems = [...items]
    newItems[index] = val
    onChange(newItems)
  }

  return (
    <div>
      {items.map((item, index) => (
        <Card
          key={index}
          size="small"
          style={{ marginBottom: 8 }}
          title={itemSchema.title ? `${itemSchema.title} #${index + 1}` : `${t('schemaForm.project')} #${index + 1}`}
          extra={
            !readOnly && (
              <Space size={4}>
                <Tooltip title={t('schemaForm.moveUp')}>
                  <Button
                    type="text"
                    size="small"
                    icon={<ArrowUpOutlined />}
                    disabled={index === 0}
                    onClick={() => handleMove(index, index - 1)}
                  />
                </Tooltip>
                <Tooltip title={t('schemaForm.moveDown')}>
                  <Button
                    type="text"
                    size="small"
                    icon={<ArrowDownOutlined />}
                    disabled={index === items.length - 1}
                    onClick={() => handleMove(index, index + 1)}
                  />
                </Tooltip>
                <Tooltip title={t('schemaForm.delete')}>
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(index)}
                  />
                </Tooltip>
              </Space>
            )
          }
        >
          <FieldRenderer
            schema={itemSchema}
            name={`${name}[${index}]`}
            value={item}
            onChange={(val) => handleItemChange(index, val)}
            disabled={disabled}
            readOnly={readOnly}
          />
        </Card>
      ))}
      {!readOnly && (
        <Button type="dashed" block icon={<PlusOutlined />} onClick={handleAdd}>
          {t('schemaForm.add')}
        </Button>
      )}
    </div>
  )
}
