/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Row, Col, Card, Tabs, message } from 'antd'
import FormEngine from './components/formEngine'
import SchemaEditor from './components/schemaEditor'
import { BasicContent } from '@/components/basicContent'
import { useTranslation } from 'react-i18next'


const defaultSchema = {
  type: 'object',
  title: '用户注册',
  required: ['username', 'email', 'password', 'age'],
  properties: {
    username: {
      type: 'string',
      title: '用户名',
      minLength: 3,
      maxLength: 20,
      description: '3-20 个字符，支持字母、数字和下划线',
    },
    email: {
      type: 'string',
      title: '邮箱',
      format: 'email',
      description: '请输入有效的邮箱地址',
    },
    password: {
      type: 'string',
      title: '密码',
      minLength: 8,
      format: 'password',
      description: '至少 8 位字符',
    },
    age: {
      type: 'integer',
      title: '年龄',
      minimum: 18,
      maximum: 120,
      description: '必须年满 18 岁',
    },
    gender: {
      type: 'string',
      title: '性别',
      enum: ['male', 'female', 'other'],
      enumNames: ['男', '女', '其他'],
    },
    bio: {
      type: 'string',
      title: '个人简介',
      format: 'textarea',
      maxLength: 200,
    },
    newsletter: {
      type: 'boolean',
      title: '订阅新闻邮件',
      default: true,
    },
  },
}

const productSchema = {
  type: 'object',
  title: '商品配置',
  required: ['name', 'price', 'category'],
  properties: {
    name: { type: 'string', title: '商品名称', minLength: 2 },
    sku: { type: 'string', title: 'SKU 编码', pattern: '^[A-Z]{2}-\\d{4}$', description: '格式: XX-0000' },
    price: { type: 'number', title: '售价', minimum: 0.01, description: '人民币' },
    category: {
      type: 'string',
      title: '分类',
      enum: ['electronics', 'clothing', 'food', 'home'],
      enumNames: ['数码', '服饰', '食品', '家居'],
    },
    tags: {
      type: 'array',
      title: '标签',
      description: '添加商品标签',
      items: { type: 'string', title: '标签' },
    },
    inStock: { type: 'boolean', title: '有库存', default: true },
    description: { type: 'string', title: '详细描述', format: 'textarea' },
  },
}

const surveySchema = {
  type: 'object',
  title: '产品满意度调查',
  required: ['satisfaction', 'wouldRecommend'],
  properties: {
    satisfaction: {
      type: 'integer',
      title: '满意度评分',
      minimum: 1,
      maximum: 10,
      description: '1-10 分',
    },
    usageFrequency: {
      type: 'string',
      title: '使用频率',
      enum: ['daily', 'weekly', 'monthly', 'rarely'],
      enumNames: ['每天', '每周', '每月', '很少'],
    },
    features: {
      type: 'array',
      title: '常用功能（多选）',
      items: {
        type: 'string',
        enum: ['export', 'share', 'collaborate', 'api', 'analytics'],
        enumNames: ['数据导出', '团队分享', '协作编辑', 'API 接口', '数据分析'],
      },
      uniqueItems: true,
    },
    wouldRecommend: {
      type: 'boolean',
      title: '愿意推荐给朋友',
    },
    feedback: {
      type: 'string',
      title: '其他建议',
      format: 'textarea',
    },
  },
}

const nestedSchema = {
  type: 'object',
  title: '公司信息',
  required: ['companyName'],
  properties: {
    companyName: { type: 'string', title: '公司名称' },
    address: {
      type: 'object',
      title: '地址信息',
      properties: {
        province: { type: 'string', title: '省份' },
        city: { type: 'string', title: '城市' },
        detail: { type: 'string', title: '详细地址', format: 'textarea' },
      },
    },
    contacts: {
      type: 'array',
      title: '联系人列表',
      items: {
        type: 'object',
        title: '联系人',
        properties: {
          name: { type: 'string', title: '姓名' },
          phone: { type: 'string', title: '电话', pattern: '^1\\d{10}$' },
          email: { type: 'string', title: '邮箱', format: 'email' },
        },
        required: ['name'],
      },
    },
  },
}

export default function SchemaFormPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('user')
  const [schemas, setSchemas] = useState<Record<string, any>>({
    user: defaultSchema,
    product: productSchema,
    survey: surveySchema,
    nested: nestedSchema,
  })
  const [formData, setFormData] = useState<Record<string, any>>({})

  const handleSchemaChange = (tab: string, schema: any) => {
    setSchemas((prev) => ({ ...prev, [tab]: schema }))
  }

  const handleSubmit = (data: Record<string, any>) => {
    console.log('提交数据:', data)
    message.success('表单验证通过，数据已输出到控制台')
    // 清空当前 tab 的数据  
    setFormData((prev) => ({ ...prev, [activeTab]: {} }));
  }

  const items = [
    { key: 'user', label: t('schemaForm.user'), schema: schemas.user },
    { key: 'product', label: t('schemaForm.product'), schema: schemas.product },
    { key: 'survey', label: t('schemaForm.survey'), schema: schemas.survey },
    { key: 'nested', label: t('schemaForm.contact'), schema: schemas.nested },
  ]

  return (
    <BasicContent>
      <Row gutter={12}>
        <Col xs={24} lg={8}>
          <Card title={t('schemaForm.schemaEditor.title')} styles={{ body: { height: 660, padding: 0 } }}>
            <Tabs
              style={{ padding: 16 }}
              activeKey={activeTab}
              onChange={setActiveTab}
              items={items.map((item) => ({
                key: item.key,
                label: item.label,
                children: (
                  <div style={{ maxHeight: 560 }}>
                    <SchemaEditor
                      value={JSON.stringify(item.schema, null, 2)}
                      onChange={(schema) => handleSchemaChange(item.key, schema)}
                    />
                  </div>
                ),
              }))}
            />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title={t('schemaForm.schemaEditor.previewTitle')} styles={{ body: { maxHeight: 660, overflow: 'auto' } }}>
            <FormEngine
              schema={schemas[activeTab]}
              value={formData[activeTab]}
              onChange={(data) =>
                setFormData((prev) => ({ ...prev, [activeTab]: data }))
              }
              onSubmit={handleSubmit}
            />
          </Card>
        </Col>
        <Col xs={24} lg={6}>
          <Card title={t('schemaForm.schemaEditor.formDataTitle')} styles={{ body: { height: 660, overflow: 'auto' } }}>
            <pre
              style={{
                background: '#f8f9fa',
                padding: 16,
                borderRadius: 8,
                margin: 0,
                fontSize: 13,
                lineHeight: 1.6,
                overflow: 'auto',
                maxHeight: 300,
              }}
            >
              {JSON.stringify(formData[activeTab] || {}, null, 2)}
            </pre>
          </Card>
        </Col>
      </Row>
    </BasicContent>
  )
}
