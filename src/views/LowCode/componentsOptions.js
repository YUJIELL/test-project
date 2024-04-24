/*
 * @Date: 2024-04-12 13:59:17
 * @LastEditors: @yujie
 * @LastEditTime: 2024-04-23 17:03:27
 * @Description:
 */
const inputOptions = {
  name: 'input',
  type: 'form',
  attributes: [
    {
      name: 'vModel',
      label: 'model',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'formLabel',
      label: 'formLabel',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: false
    },
    {
      name: 'type',
      label: 'type',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'maxlength',
      label: 'maxlength最大输入长度',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'minlength',
      label: 'minlength最小输入长度',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'showWordLimit',
      label: 'show-word-limit是否显示输入字数统计',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'placeholder',
      label: 'placeholder占位文本',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '清输入',
      isTagAttr: true
    },
    {
      name: 'clearable',
      label: 'clearable是否可清空',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'readonly',
      label: 'readonly是否只读',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'disabled',
      label: '是否禁用',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'blur',
      label: '在 Input 失去焦点时触发',
      isVariable: false,
      accepted: 'blur(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'focus',
      label: '在 Input 获得焦点时触发',
      isVariable: false,
      accepted: 'focus(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'change',
      label: '仅在输入框失去焦点或用户按下回车时触发',
      isVariable: false,
      accepted: 'change(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'input',
      label: '在 Input 值改变时触发',
      isVariable: false,
      accepted: 'input(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'clear',
      label: '在点击由 clearable 属性生成的清空按钮时触发',
      isVariable: false,
      accepted: 'clear(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
  ]
}
const selectOptions = {
  name: 'select',
  type: 'form',
  attributes: [
    {
      name: 'vModel',
      label: 'model',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'formLabel',
      label: 'formLabel',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: false
    },
    {
      name: 'options',
      label: 'options选项是否自定义',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'options',
      modelValue: { label: 'label', value: 'value', options: 'options' },
      isTagAttr: true,
      isCustom: false
    },
    {
      name: 'multiple',
      label: 'multiple是否多选',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'valueKey',
      label: '作为 value 唯一标识的键名，绑定值为对象类型时必填',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: 'value',
      isTagAttr: true
    },
    {
      name: 'placeholder',
      label: 'placeholder占位文本',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '请选择',
      isTagAttr: true
    },
    {
      name: 'clearable',
      label: 'clearable是否可清空',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'readonly',
      label: 'readonly是否只读',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'disabled',
      label: '是否禁用',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'filterable',
      label: 'filterable是否可搜索',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'collapseTags',
      label: '多选时是否将选中值按文字的形式展示',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'change',
      label: '选中值发生变化时触发',
      isVariable: false,
      accepted: 'change(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'visibleChange',
      label: '下拉框出现/隐藏时触发',
      isVariable: false,
      accepted: 'visibleChange(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'clear',
      label: '可清空的单选模式下用户点击清空按钮时触发',
      isVariable: false,
      accepted: 'clear(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'blur',
      label: '在 Input 失去焦点时触发',
      isVariable: false,
      accepted: 'blur(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'focus',
      label: '在 Input 获得焦点时触发',
      isVariable: false,
      accepted: 'focus(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
  ]
}

const buttonOptions = {
  name: 'button',
  type: 'form',
  attributes: [
    {
      name: 'vModel',
      label: 'model',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'type',
      label: 'type',
      isVariable: false,
      accepted: ['primary', 'success', 'warning', 'danger', 'info', 'text'],
      attrType: 'attr',
      inputType: 'radio',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'plain',
      label: '是否朴素按钮',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'round',
      label: '是否圆角按钮',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'circle',
      label: '是否圆形按钮',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'loading',
      label: '是否加载中状态',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'disabled',
      label: '是否禁用',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'icon',
      label: '图标类名',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'click',
      label: 'click',
      isVariable: false,
      accepted: 'click(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'focus',
      label: '在 Input 获得焦点时触发',
      isVariable: false,
      accepted: 'focus(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
  ]
}

const linkOptions = {
  name: 'link',
  type: 'form',
  attributes: [
    {
      name: 'type',
      label: 'type',
      isVariable: false,
      accepted: ['primary', 'success', 'warning', 'danger', 'info'],
      attrType: 'attr',
      inputType: 'radio',
      modelValue: 'default',
      isTagAttr: true
    },
    {
      name: 'underline',
      label: '是否下划线',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: true,
      isTagAttr: true
    },
    {
      name: 'disabled',
      label: '是否禁用',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'href',
      label: 'href',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'icon',
      label: '图标类名',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'click',
      label: 'click',
      isVariable: false,
      accepted: 'click(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
  ]
}
const switchOptions = {
  name: 'switch',
  type: 'form',
  attributes: [
    {
      name: 'vModel',
      label: 'model',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'disabled',
      label: '是否禁用',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'activeText',
      label: '打开时的文字描述',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'inactiveText',
      label: '关闭时的文字描述',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'activeValue',
      label: '打开时的值',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: true,
      isTagAttr: true
    },
    {
      name: 'inactiveValue',
      label: '关闭时的值',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'activeColor',
      label: '打开时的背景色',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '#409EFF',
      isTagAttr: true
    },
    {
      name: 'inactiveColor',
      label: '关闭时的背景色',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '#C0CCDA',
      isTagAttr: true
    },
    {
      name: 'name',
      label: 'name',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'change',
      label: 'change',
      isVariable: false,
      accepted: 'change(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
  ]
}
const datePickerOptions = {
  name: 'datePicker',
  type: 'form',
  attributes: [
    {
      name: 'vModel',
      label: 'model',
      isVariable: true,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'formLabel',
      label: 'formLabel',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: false
    },
    {
      name: 'type',
      label: 'type',
      isVariable: false,
      accepted: ['year', 'month', 'date', 'dates', 'months', 'years week', 'datetime', 'datetimerange', 'daterange', 'monthrange'],
      attrType: 'attr',
      inputType: 'radio',
      modelValue: 'date',
      isTagAttr: true
    },
    {
      name: 'readonly',
      label: '是否只读',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'disabled',
      label: '是否禁用',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'valueFormat',
      label: 'valueFormat',
      isVariable: false,
      accepted: '绑定值的格式,不指定则绑定值为 Date 对象',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'format',
      label: 'format',
      isVariable: false,
      accepted: '显示在输入框中的格式',
      attrType: 'attr',
      inputType: 'text',
      modelValue: 'yyyy-MM-dd',
      isTagAttr: true
    },
    {
      name: 'editable',
      label: '文本框可输入',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'clearable',
      label: '是否显示清除按钮',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: true,
      isTagAttr: true
    },
    {
      name: 'placeholder',
      label: 'placeholder',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '请选择',
      isTagAttr: true
    },
    {
      name: 'startPlaceholder',
      label: 'start-placeholder',
      isVariable: false,
      accepted: '开始日期',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'endPlaceholder',
      label: 'end-placeholder',
      isVariable: false,
      accepted: '结束日期',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'defaultValue',
      label: 'default-value',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'change',
      label: '用户确认选定的值时触发',
      isVariable: false,
      accepted: 'change(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'input',
      label: '在 Input 值改变时触发',
      isVariable: false,
      accepted: 'input(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'clear',
      label: '在点击由 clearable 属性生成的清空按钮时触发',
      isVariable: false,
      accepted: 'clear(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },

  ]
}

const formOptions = {
  name: 'form',
  type: 'container',
  children: [],
  attributes: [
    {
      name: 'model',
      label: 'model',
      isVariable: true,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: 'form',
      isTagAttr: true
    },
    {
      name: 'ref',
      label: 'ref',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'rules',
      label: 'rules表单验证规则',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'inline',
      label: 'inline行内表单模式',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'labelPosition',
      label: 'label-position表单域标签的位置',
      isVariable: false,
      accepted: ['right', 'left', 'top'],
      attrType: 'attr',
      inputType: 'radio',
      modelValue: 'right',
      isTagAttr: true
    },
    {
      name: 'labelWidth',
      label: 'label-width',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'disabled',
      label: '是否禁用',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'validate',
      label: '对整个表单进行校验的方法',
      isVariable: false,
      accepted: 'Function(callback: Function(boolean, object))',
      attrType: 'methods',
      inputType: 'text',
      modelValue: '',
      isTagAttr: false
    },
    {
      name: 'validateField',
      label: '对部分表单字段进行校验的方法',
      isVariable: false,
      accepted: 'Function(props: array | string, callback: Function(errorMessage: string))',
      attrType: 'methods',
      inputType: 'text',
      modelValue: '',
      isTagAttr: false
    },
    {
      name: 'resetFields',
      label: '对整个表单进行重置，将所有字段值重置为初始值并移除校验结果',
      isVariable: false,
      accepted: 'Function()',
      attrType: 'methods',
      inputType: 'text',
      modelValue: '',
      isTagAttr: false
    },
    {
      name: 'clearValidate',
      label: '移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果',
      isVariable: false,
      accepted: 'Function(props: array | string)',
      attrType: 'methods',
      inputType: 'text',
      modelValue: '',
      isTagAttr: false
    },
  ]
}

const formItemOptions = {
  name: 'formItem',
  type: 'container',
  children: [],
  attributes: [
    {
      name: 'prop',
      label: 'prop',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'label',
      label: 'label',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '标题：',
      isTagAttr: true
    },
    {
      name: 'labelWidth',
      label: 'label-width',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '80px',
      isTagAttr: true
    },
    {
      name: 'required',
      label: 'required是否必填，如不设置，则会根据校验规则自动生成',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'isInlineRules',
      label: 'isInlineRules是否行内rules，非必填项可忽略',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: false
    },
    {
      name: 'rules',
      label: 'rules表单验证规则，根据isInlineRules生成行内rules或表单rules',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'textarea',
      modelValue: '[{ required: true, message: "请输入", trigger: "blur" }]',
      isTagAttr: true
    },
    {
      name: 'showMessage',
      label: 'show-message是否显示校验错误信息',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    }
  ]
}
const radioGroupOptions = {
  name: 'radioGroup',
  type: 'container',
  children: [],
  attributes: [
    {
      name: 'vModel',
      label: 'model',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'size',
      label: 'size',
      isVariable: false,
      accepted: ['medium', 'small', 'mini'],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'disabled',
      label: '是否禁用',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'textColor',
      label: '按钮形式的 Radio 激活时的文本颜色',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '#FFFFFF',
      isTagAttr: true
    },
    {
      name: 'fill',
      label: '按钮形式的 Radio 激活时的填充色和边框色',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '#409EFF',
      isTagAttr: true
    },
    {
      name: 'inline',
      label: '是否横向排列',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: false
    },
    {
      name: 'input',
      label: '绑定值变化时触发的事件',
      isVariable: false,
      accepted: 'input(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: false
    },
  ]
}
const radioOptions = {
  name: 'radio',
  type: 'form',
  children: [],
  attributes: [
    {
      name: 'vModel',
      label: 'model',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'label',
      label: 'label / Radio 的 value',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '选项',
      isTagAttr: true
    },
    {
      name: 'size',
      label: 'size',
      isVariable: false,
      accepted: ['medium', 'small', 'mini'],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'disabled',
      label: '是否禁用',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'border',
      label: '是否显示边框',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'input',
      label: '绑定值变化时触发的事件',
      isVariable: false,
      accepted: 'input(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: false
    }
  ]
}
const checkboxGroupOptions = {
  name: 'checkboxGroup',
  type: 'container',
  children: [],
  attributes: [
    {
      name: 'vModel',
      label: 'model',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'size',
      label: '多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效',
      isVariable: false,
      accepted: ['medium', 'small', 'mini'],
      attrType: 'attr',
      inputType: 'radio',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'disabled',
      label: '是否禁用',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'textColor',
      label: '按钮形式的 Checkbox 激活时的文本颜色',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '#FFFFFF',
      isTagAttr: true
    },
    {
      name: 'fill',
      label: '按钮形式的 Checkbox 激活时的填充色和边框色',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '#409EFF',
      isTagAttr: true
    },
    {
      name: 'change',
      label: '绑定值变化时触发的事件',
      isVariable: false,
      accepted: 'change(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: false
    },
  ]
}
const checkboxOptions = {
  name: 'checkbox',
  type: 'form',
  attributes: [
    {
      name: 'vModel',
      label: 'model',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'label',
      label: 'label',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'trueLabel',
      label: '选中时的值',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'falseLabel',
      label: '没有选中时的值',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'disabled',
      label: '是否禁用',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'border',
      label: '是否显示边框',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'checked',
      label: '当前是否勾选',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'change',
      label: '绑定值变化时触发的事件',
      isVariable: false,
      accepted: 'change(value)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: false
    },
  ]
}
const rowOptions = {
  name: 'row',
  type: 'container',
  children: [],
  attributes: []
}
const colOptions = {
  name: 'col',
  type: 'container',
  children: [],
  attributes: [
    {
      name: 'span',
      label: 'span栅格占据的列数',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: 24,
      isTagAttr: true
    },
    {
      name: 'offset',
      label: 'offset栅格左侧的间隔格数',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: 0,
      isTagAttr: true
    }
  ]
}

const tableOptions = {
  name: 'table',
  type: 'container',
  children: [],
  attributes: [
    {
      name: 'data',
      label: 'tableData',
      isVariable: true,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: false
    },
    {
      name: 'height',
      label: 'height高度',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'maxHeight',
      label: 'max-height',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'stripe',
      label: '是否为斑马纹',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'border',
      label: '是否带有纵向边框',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'rowKey',
      label: 'row-key',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'showSummary',
      label: '是否在表尾显示合计行',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'select',
      label: '当用户手动勾选数据行的 Checkbox 时触发的事件',
      isVariable: false,
      accepted: 'select(selection, row)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: false
    },
    {
      name: 'selectAll',
      label: '当用户手动勾选全选 Checkbox 时触发的事件',
      isVariable: false,
      accepted: 'selectAll(selection)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: false
    },
    {
      name: 'selectionChange',
      label: '当选择项发生变化时会触发该事件',
      isVariable: false,
      accepted: 'selectionChange(selection)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: false
    },
    {
      name: 'cellClick',
      label: '当某个单元格被点击时会触发该事件',
      isVariable: false,
      accepted: 'cellClick(row, column, cell, event)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: false
    },
    {
      name: 'rowClick',
      label: '当某一行被点击时会触发该事件',
      isVariable: false,
      accepted: 'rowClick(row, column, event)',
      attrType: 'event',
      inputType: 'text',
      modelValue: '',
      isTagAttr: false
    },
  ]
}
const tableItemOptions = {
  name: 'tableColumn',
  type: 'container',
  children: [],
  attributes: [
    {
      name: 'label',
      label: '标题',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '标题',
      isTagAttr: true
    },
    {
      name: 'prop',
      label: 'prop',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'width',
      label: '宽度',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'minWidth',
      label: 'min-width最小宽度',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'type',
      label: '对应列的类型。selection显示多选框,index显示该行的索引,expand显示为一个可展开的按钮',
      isVariable: false,
      accepted: ['selection', 'index', 'expand'],
      attrType: 'attr',
      inputType: 'radio',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'index',
      label: '如果设置了 type=index，可以通过传递 index 属性来自定义索引',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: 0,
      isTagAttr: true
    },
    {
      name: 'fixed',
      label: '列是否固定在左侧或者右侧，true 表示固定在左侧',
      isVariable: false,
      accepted: [true, 'left', 'right'],
      attrType: 'attr',
      inputType: 'radio',
      modelValue: null,
      isTagAttr: true
    },
    {
      name: 'showOverflowTooltip',
      label: '当内容过长被隐藏时显示 tooltip',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'align',
      label: '对齐方式',
      isVariable: false,
      accepted: ['left', 'center', 'right'],
      attrType: 'attr',
      inputType: 'radio',
      modelValue: 'left',
      isTagAttr: true
    },
    {
      name: 'headerAlign',
      label: '表头对齐方式',
      isVariable: false,
      accepted: ['left', 'center', 'right'],
      attrType: 'attr',
      inputType: 'radio',
      modelValue: 'left',
      isTagAttr: true
    }
  ]
}
const contentPageOptions = {
  name: 'contentPage',
  type: 'container',
  children: [],
  attributes: [
    {
      name: 'title',
      label: '标题',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '标题',
      isTagAttr: true
    },
    {
      name: 'backAction',
      label: 'back-action',
      isVariable: false,
      accepted: '{ show: false }',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'type',
      label: 'type',
      isVariable: false,
      accepted: ['default', 'detail'],
      attrType: 'attr',
      inputType: 'radio',
      modelValue: 'default',
      isTagAttr: true
    },
  ]
}
const contentBlockOptions = {
  name: 'contentBlock',
  type: 'container',
  children: [],
  attributes: [
    {
      name: 'title',
      label: '标题',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '标题',
      isTagAttr: true
    },
    {
      name: 'noTitle',
      label: 'noTitle',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'noBody',
      label: 'noBody',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'noMargin',
      label: 'noMargin',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: false,
      isTagAttr: true
    },
    {
      name: 'hdStyle',
      label: 'hdStyle',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'textarea',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'bdStyle',
      label: 'bdStyle',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'textarea',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'border',
      label: 'border',
      isVariable: false,
      accepted: ['none', 'dashed', 'solid'],
      attrType: 'attr',
      inputType: 'radio',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'id',
      label: 'id',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
  ]
}

const ythSearchPanelOptions = {
  name: 'ythSearchPanel',
  type: 'container',
  children: [],
  attributes: [
    {
      name: 'model',
      label: 'model',
      isVariable: true,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'span',
      label: 'span',
      isVariable: false,
      accepted: '8',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'xl',
      label: 'xl',
      isVariable: false,
      accepted: '6',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'border',
      label: 'border',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: true,
      isTagAttr: true
    },
    {
      name: 'holdLabelSpace',
      label: 'holdLabelSpace',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: true,
      isTagAttr: true
    },
    {
      name: 'margin',
      label: 'margin',
      isVariable: false,
      accepted: [false, true],
      attrType: 'attr',
      inputType: 'switch',
      modelValue: true,
      isTagAttr: true
    },
    {
      name: 'labelWidth',
      label: 'labelWidth',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'labelSuffix',
      label: 'labelSuffix',
      isVariable: false,
      accepted: '：',
      attrType: 'attr',
      inputType: 'text',
      modelValue: '',
      isTagAttr: true
    },
    {
      name: 'actions',
      label: 'slot: actions',
      isVariable: false,
      accepted: '',
      attrType: 'attr',
      inputType: 'textarea',
      modelValue: '',
      isTagAttr: false
    },
  ]
}

export default [
  inputOptions,
  selectOptions,
  formOptions,
  formItemOptions,
  radioGroupOptions,
  radioOptions,
  rowOptions,
  colOptions,
  tableOptions,
  tableItemOptions,
  buttonOptions,
  linkOptions,
  checkboxGroupOptions,
  checkboxOptions,
  switchOptions,
  datePickerOptions,
  contentPageOptions,
  contentBlockOptions,
  ythSearchPanelOptions
]
