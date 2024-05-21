<!--
 * @Date: 2024-03-27 14:14:31
 * @LastEditors: @yujie
 * @LastEditTime: 2024-05-21 14:54:53
 * @Description: 
-->
<template>
  <div class="low-code">
    <div class="content-left">
      <div class="left-title">组件</div>
      <div>form组件</div>
      <VueDraggable
        class="left-content"
        v-model="componentsListForm"
        :animation="150"
        :group="{ name: 'g1', pull: 'clone', put: false }"
        :clone="onClone"
        :sort="false"
      >
        <div class="component" v-for="(item, index) in componentsListForm" :key="index">
          {{ item.name }}
        </div>
      </VueDraggable>
      <div>布局组件</div>
      <VueDraggable
        class="left-content"
        v-model="componentsListContainer"
        :animation="150"
        :group="{ name: 'g1', pull: 'clone', put: false }"
        :clone="onClone"
        :sort="false"
      >
        <div class="component" v-for="(item, index) in componentsListContainer" :key="index">
          {{ item.name }}
        </div>
      </VueDraggable>
    </div>
    <div class="content-center" style="overflow-x: hidden">
      <div class="center-title">
        <el-button @click="copyCode('v2')">生成vue2代码</el-button>
        <!-- <el-button @click="copyCode('v3')">生成vue3代码</el-button> -->
        <el-button @click="resetComponentsList">重置</el-button>
      </div>
      <div>
        <html-render
          class="html-render"
          v-model="htmlEditList"
          @component-click="componentClick"
          @success="cloneSuccess"
          @order-update="orderUpdate"
        ></html-render>
      </div>
    </div>
    <div class="content-right" style="overflow-x: hidden">
      <div class="right-title">组件配置项</div>
      <div class="right-detail">
        <div style="text-align: center; margin-top: 10px">
          组件名称：{{ currentAttribute.name }}，Id：{{ currentAttribute.id }}
        </div>
        <options-setting
          :currentInfo="currentAttribute"
          @settingChange="settingChange"
          @copy="copyComponents"
          @delete="deleteComponents"
        ></options-setting>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue'
import componentsOptions from './componentsOptions.js'
import { VueDraggable } from 'vue-draggable-plus'
import optionsSetting from './optionsSetting.vue'
import htmlRender from './htmlRender.vue'
import { cloneDeep } from 'lodash'
import { ElMessage } from 'element-plus'

const componentsList = ref([...componentsOptions])
const htmlEditList = ref([])
const currentAttribute = ref([])
let currentAttributeTemporary = {}
const currentComponentInfo = ref({})
let currentComponentInfoTemporary = {}
const vueData = ref({})
const vueMethods = ref('')
let Id = 0

const componentsListForm = computed(() => {
  const list = componentsList.value
  return list.filter((item) => item.type === 'form')
})
const componentsListContainer = computed(() => {
  const list = componentsList.value
  return list.filter((item) => item.type === 'container')
})

function resetComponentsList() {
  htmlEditList.value = []
  currentAttribute.value = {}
  currentComponentInfo.value = {}
}

function onClone(params) {
  let attributesInfo = {}
  params.attributes.forEach((element, index) => {
    if (index !== 0 || element.name !== 'readonly') {
      const key = element.name
      const value = element.modelValue
      attributesInfo[key] = value
    }
  })
  Id += 1
  const newParams = {
    name: params.name,
    attributes: attributesInfo,
    info: params,
    children: 'children' in params ? [] : null,
    id: Id
  }
  if ('otherChildren' in params) {
    newParams['otherChildren'] = []
  }
  currentAttributeTemporary = cloneDeep({
    ...params,
    id: Id,
    parentId: null
  })
  console.log('aaaaaaaaaa')
  currentComponentInfoTemporary = cloneDeep(newParams)
  return currentComponentInfoTemporary
}
function cloneMethod(params) {
  console.log('params', params)
}

function copyCode(type) {
  const attrString = attributesToHtml(htmlEditList.value)
  let htmlString = ''
  if (type === 'v2') {
    htmlString = `<template>
                <div>
                    ${attrString}
                </div>
            </template>
            <script>
                export default {
                    data () {
                        return ${jsonToString(vueData.value)}
                    },
                    watch: {},
                    computed: {},
                    created() {},
                    mounted() {
                        ${vueMethods.value}
                    },
                    methods: {}
                }
            <\/script>
            <style scoped><\/style>
            `
  } else {
    htmlString = `<template>
                <div>
                    ${attrString}
                </div>
            </template>
            <script setup>
                
            <\/script>
            <style scoped><\/style>
            `
  }
  console.log('htmlString', htmlString)
  copyTextToClipboard(htmlString)
}

function jsonToString(params) {
  let objString = '{'
  for (const [key, value] of Object.entries(params)) {
    if (variableType(value) === 'Object') {
      objString += `${key}: ${jsonToString(value)},`
    } else if (variableType(value) === 'Array') {
      objString += `${key}: ${JSON.stringify(value)},`
    } else {
      objString += `${key}: ${value},`
    }
  }
  objString += '}'
  return objString
}
// 配置项变更
function settingChange(params) {
  const { id } = currentComponentInfo.value
  const list = treeToList(htmlEditList.value)
  const currentInfo = list.find((item) => item.id === id)
  currentInfo.attributes[params.name] = params.modelValue
  const infoAttributesList = currentInfo.info.attributes
  const attrIndex = infoAttributesList.findIndex((item) => item.name === params.name)
  currentInfo.info.attributes[attrIndex].modelValue = params.modelValue
}
// 获取变量类型
function variableType(data) {
  return Object.prototype.toString.call(data).slice(8, -1)
}

// 解析组件标签生成html
function attributesToHtml(params, parentInfo = null) {
  console.log('parentInfo', parentInfo)
  // vueMethods.value = ''
  // vueData.value = {}
  let htmlString = ''
  params.forEach((element) => {
    let attributesString = ''
    const tagName = camelToKebab(element.name)

    for (const [key, value] of Object.entries(element.attributes)) {
      const attributesInfo = arrayToObject(element.info.attributes)[key]
      if (key !== 'options') {
        const isBind =
          ['Boolean', 'Array', 'Object'].includes(variableType(value)) || attributesInfo?.isVariable
            ? ':'
            : ''
        let kebab = camelToKebab(key)
        let newValue = value
        const {modelValue, accepted, attrType} = attributesInfo
        if (attrType === 'event' && value !== '') {
          kebab = `@${kebab}`
          newValue = modelValue
          console.log('attributesInfo', value)
          vueMethods.value += modelValue.includes('(')
            ? `
                        ${modelValue}{
                          this.${key==='size-change'?'pageSize':'pageNum'} = ${modelValue.match(/\((.+)\)/)[1]}
                          this.loadData()
                        },
                    `
            : `
                        ${modelValue}${accepted?accepted.match(/\(.+\)/)[0]:'(value)'}{
                          this.${key==='size-change'?'pageSize':'pageNum'} = ${accepted?modelValue.match(/\((.+)\)/)[1]:'value'}
                          this.loadData()
                        },
                    `
        }
        if (attrType === 'methods' && value !== '') {
          vueMethods.value += `
                    ${modelValue}(){
                        this.$refs[${element.attributes.ref}].${key}${
                          accepted.match(/\(.+\)$/)[0]
                        }
                    },
                    `
        }
        if (tagName === 'form' && kebab === 'rules') {
          const formItemList = getFormItemList()
          if (formItemList.length > 0) {
            let formObj = {}
            formItemList.forEach((item) => (formObj[item.attributes.prop] = null))
            const formName = element.attributes.model
            vueData.value[formName] = formObj
          }
          if (!element.attributes.isInlineRules) {
            const rules = formRulesFormatter()
            if (rules) {
              kebab = ':rules'
              newValue = 'rules'
              vueData.value['rules'] = rules
            } else {
              continue
            }
          }
        } else if (tagName === 'form-item') {
          if (kebab === 'rules') {
            if (element.attributes.required && element.attributes.isInlineRules) {
              kebab = ':rules'
            } else {
              continue
            }
          }
          if (key === 'isInlineRules') {
            continue
          }
          if (
            key === 'required' &&
            (value === false || (!element.attributes.isInlineRules && value === true))
          ) {
            continue
          }
        } else if (tagName === 'pagination') {
          if (key === 'currentPage') {
            newValue = 'pageNum'
          } else if (key === 'pageSize') {
            newValue = 'pageSize'
          } else if (key === 'total') {
            newValue = 'total'
          }
        }
        if (kebab === 'disabled' && !newValue) {
          continue
        }
        if (attributesInfo.isTagAttr) {
          if (typeof newValue === 'boolean') {
            if (newValue) {
              attributesString += `${isBind}${kebab}="${newValue}" `
            }
          } else if (kebab.includes('model') || newValue !== '') {
            attributesString += `${isBind}${kebab}="${newValue}" `
          }
        }
      }
    }
    if (tagName === 'filter-table') {
      vueData.value[element.attributes.filterForm] = {}
      vueMethods.value += `
        loadData() {},
      `
    } else if (
      (tagName === 'select' || tagName === 'input' || tagName === 'date-picker') &&
      parentInfo &&
      (parentInfo.name === 'filterTable' || parentInfo.name === 'ythSearchPanel')
    ) {
      const filterFormName =
        parentInfo.name === 'filterTable'
          ? parentInfo.attributes.filterForm
          : parentInfo.attributes.model
      if (filterFormName) {
        vueData.value[filterFormName][element.attributes.vModel] = null
      }
      attributesString += `label="${element.attributes.formLabel}"`
    } else if (tagName === 'table') {
      const key = element.attributes.data
      vueData.value[key] = []
    } else if (tagName === 'pagination') {
      vueData.value['pageNum'] = element.attributes.currentPage
      vueData.value['pageSize'] = element.attributes.pageSize
      vueData.value['total'] = element.attributes.total
    }

    const childrenHtml = element.children ? attributesToHtml(element.children, element) : ''
    const otherChildrenHtml = element.otherChildren
      ? attributesToHtml(element.otherChildren, element)
      : ''
    let tagContent = ''
    console.log('>>>>', tagName)
    switch (tagName) {
      case 'table-column':
        console.log('123123')
        if (childrenHtml) {
          tagContent = `<template>
                    ${childrenHtml}
                <\/template>`
        }
        break
      case 'select':
        const optionsInfo = element.attributes.options
        tagContent =
          typeof optionsInfo === 'string'
            ? optionsInfo
            : `<el-option
                    v-for="item in ${optionsInfo.options}"
                    :key="item.value"
                    :label="${optionsInfo.label}"
                    :value="${optionsInfo.value}">
                </el-option>`
        break
      case 'filter-table':
        tagContent = `
            <template #filter>
              ${childrenHtml}
            <\/template>
          `
        if (element.attributes.tableTop) {
          tagContent += `
            <template #tableTop>
              ${element.attributes.tableTop}
            <\/template>
          `
        }
        if (otherChildrenHtml) {
          tagContent += `
            <template #table>
              ${otherChildrenHtml}
            <\/template>
          `
        }
        break
      default:
        tagContent = `${childrenHtml}`
        break
    }
    const tagNameStart = element.info.isCustom
      ? `
      <${tagName} ${attributesString}>
      `
      : `
      <el-${tagName} ${attributesString}>
      `
    const tagNameEnd = element.info.isCustom
      ? `
    </${tagName}>`
      : `
    </el-${tagName}>`
    htmlString += tagNameStart + tagContent + tagNameEnd
  })
  return htmlString
}
function arrayToObject(array) {
  let newObject = {}
  array.forEach((item) => {
    newObject[item.name] = item
  })
  return newObject
}
// 设置rules
function formRulesFormatter() {
  const list = getFormItemList()
  const formItemListRules = list.filter((item) => {
    return item.attributes.required && !item.attributes.isInlineRules
  })
  let rules = null
  if (formItemListRules.length > 0) {
    rules = {}
    formItemListRules.forEach((item) => {
      const { attributes } = item
      rules[attributes.prop] = attributes.rules
    })
  }
  return rules
}
const getFormItemList = function () {
  const list = treeToList(htmlEditList.value)
  const formItemList = list.filter((item) => {
    return item.name === 'formItem'
  })
  return formItemList
}
// 驼峰转横杠
function camelToKebab(string) {
  return string.replace(/([A-Z])/g, '-$1').toLowerCase()
}
// 点击组件回调，设置当前组件信息
function componentClick(params) {
  currentComponentInfo.value = params
  currentAttribute.value = {
    ...params.info,
    id: params.id,
    parentId: params.parentId
  }
}
// 复制到剪贴板
async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    ElMessage({
      type: 'success',
      message: 'Vue代码已复制到剪贴板！'
    })
  } catch (err) {
    ElMessage.error('复制失败')
  }
}
function treeToList(list) {
  let newList = []
  for (let index = 0; index < list.length; index++) {
    const element = list[index]
    newList.push(element)
    if (element.children) {
      newList.push(...treeToList(element.children))
    }
  }
  return newList
}
// 拖拽克隆成功回调
function cloneSuccess(data) {
  const componentName = data.item.innerText
  const toComponentName = data.to.className
  console.log(999, componentName, toComponentName)
  if (componentName === 'tableColumn' && !toComponentName.includes('table')) {
    ElMessage.error('table-column只能放入table组件中')
    return
  }
  currentAttribute.value = cloneDeep(currentAttributeTemporary)
  currentComponentInfo.value = cloneDeep(currentComponentInfoTemporary)
  htmlEditListIdReset()
}
function orderUpdate() {
  htmlEditListIdReset()
}
// 重置htmlEditList中数据id
function htmlEditListIdReset() {
  idFormatter(htmlEditList.value)
  console.log('htmlEditList.value', htmlEditList.value)
}
function idFormatter(list, parentId = '') {
  list.forEach((item) => {
    item.parentId = parentId
    console.log('item', item)
    if (item.children) {
      idFormatter(item.children, item.id)
    }
  })
}
// 复制组件
function copyComponents(params) {
  const { id } = params
  const component = componentsInfoEdit(htmlEditList.value, id)
  if (component) {
    const newComponent = cloneDeep(setId(component))
    htmlEditList.value.push(newComponent)
    updateCurrentComponentInfoTemporary(newComponent)
  }
  cloneSuccess()
}
// 复制组件时将当前组件复制插入父组件内
function componentsInfoEdit(array, id) {
  Id++
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    if (element.id === id) {
      return cloneDeep(element)
    } else if (element.children && element.children.length) {
      const component = componentsInfoEdit(element.children, id)
      if (component) {
        const newComponent = cloneDeep(setId(component))
        element.children.push(newComponent)
        updateCurrentComponentInfoTemporary(newComponent)
      }
    } else {
      continue
    }
  }
}
function updateCurrentComponentInfoTemporary(newComponent) {
  const { id, parentId, info, ...other } = newComponent
  currentComponentInfoTemporary = {
    id,
    info,
    ...other
  }
  currentAttributeTemporary = {
    ...info,
    id,
    parentId
  }
}
// 复制组件时设置新id
function setId(component) {
  console.log('setId', component)
  const newComponent = component
  newComponent.id = component.id + Id
  let newChildren = []
  if (component.children && component.children.length) {
    component.children.forEach((item) => {
      newChildren.push(setId(item))
    })
  }
  newComponent.children = newChildren
  return newComponent
}
// 删除组件
function deleteComponents(params) {
  listDelete(htmlEditList.value, params.parentId, params.id)
  currentAttribute.value = {}
  currentComponentInfo.value = {}
}
function listDelete(array, parentId, id) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    if (element.id === parentId) {
      const delIndex = element.children.findIndex((item) => item.id === id)
      element.children.splice(delIndex, 1)
    } else if (element.children.length) {
      listDelete(element.children, parentId, id)
    } else {
      continue
    }
  }
}
</script>

<style lang="less" scoped>
.low-code {
  display: flex;
  width: 100vw;
  height: 100vh;
  gap: 12px;
  overflow: hidden;

  .content-left {
    width: 260px;
    box-shadow: 0 0 5px 1px #ddd;

    .left-content {
      margin-top: 12px;
      padding: 0 10px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(1fr);

      .component {
        padding: 10px 0;
        margin: 6px;
        box-shadow: 0 0 1px 1px rgba(66, 184, 131, 0.8);
        border-radius: 4px;
        cursor: pointer;
        text-align: center;
      }
    }

    .left-title {
      text-align: center;
      padding: 10px;
      background-color: #4caf50;
      color: #fff;
    }
  }

  .content-center {
    flex: 1;

    .center-title {
      padding: 12px 0;
      text-align: right;
      border-bottom: 1px dashed #279aff;
    }

    .html-render {
      width: 100%;
      height: 100vh;
      padding: 10px 0;
    }

    .chosen-class {
      box-shadow: 0 0 2px 1px #42b883;
    }
  }

  .content-right {
    width: 300px;

    box-shadow: 0 0 5px 1px #ddd;

    .right-title {
      text-align: center;
      padding: 16px;
      box-shadow: 0px 3px 5px -2px #279aff;
      position: relative;
      z-index: 1;
    }

    .right-detail {
      height: 92vh;
      overflow-y: scroll;
    }

    .render-item {
      width: 100%;
      padding: 8px;
      border: 2px solid #fff;

      // &:hover {
      //     border-color: #279aff;
      // }
    }
  }

  .simulation-input {
    width: 100%;
  }
}
</style>
