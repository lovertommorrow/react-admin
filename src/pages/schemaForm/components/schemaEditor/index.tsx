/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Input, Button, Space, Alert, Typography } from 'antd'
import { CopyOutlined, FormatPainterOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const { Text } = Typography

interface SchemaEditorProps {
  value: string
  onChange: (schema: Record<string, any>, text: string) => void
}

export default function SchemaEditor({ value, onChange }: SchemaEditorProps) {
  const { t } = useTranslation();
  const [text, setText] = useState(value)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (newText: string) => {
    setText(newText)
    try {
      const schema = JSON.parse(newText)
      setError(null)
      onChange(schema, newText)
    } catch (e: any) {
      setError(e.message)
    }
  }

  const handleFormat = () => {
    try {
      const obj = JSON.parse(text)
      const formatted = JSON.stringify(obj, null, 2)
      setText(formatted)
      setError(null)
      onChange(obj, formatted)
    } catch (e: any) {
      setError(e.message)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Space style={{ marginBottom: 12 }}>
        {/* 格式化按钮 */}
        <Button size="small" icon={<FormatPainterOutlined />} onClick={handleFormat}>
          {t('schemaForm.schemaEditor.format')}
        </Button>
        {/* 复制按钮 */}
        <Button size="small" icon={<CopyOutlined />} onClick={handleCopy}>
          {t('schemaForm.schemaEditor.copy')}
        </Button>
        {/* 子标题 */}
        <Text type="secondary" style={{ fontSize: 12 }}>
          {t('schemaForm.schemaEditor.subTitle')}
        </Text>
      </Space>
      {/* 输入框 */}
      <Input.TextArea
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        style={{
          flex: 1,
          fontFamily: 'ui-monospace, SFMono-Regular, monospace',
          fontSize: 13,
          lineHeight: 1.6,
          minHeight: 400,
        }}
        spellCheck={false}
      />
      {/* 错误提示 */}
      {error && (
        <Alert
          message={`${t('schemaForm.parseError')}: ${error}`}
          type="error"
          style={{ marginTop: 8 }}
          showIcon
        />
      )}
    </div>
  )
}
