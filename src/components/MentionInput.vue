<!--
 * @Date: 2024-04-28 10:12:14
 * @LastEditors: @yujie
 * @LastEditTime: 2024-04-29 17:10:15
 * @Description: 
-->
<template>
  <div class="mention">
    <div class="mention-input" id="atInput" contentEditable="true" @input="inputValue"></div>
    <div
      class="select-user"
      :class="{ 'select-show': isShow }"
      :style="{ top: cursorPosition.top, left: cursorPosition.left }"
    >
      <div
        class="user-item"
        v-for="(item, index) in userListFilter"
        :key="index"
        @click="userItemClick(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
const emits = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  modeValue: String,
  userList: {
    type: Array,
    default(rawProps) {
      return [
        { name: '张三', id: '1' },
        { name: '李四', id: '2' },
        { name: '王五', id: '3' },
        { name: '小明', id: '4' },
        { name: '小红', id: '5' }
      ]
    }
  }
})
const filterValue = ref('')
let cursorPosition = ref({
  top: 0,
  left: 0
})
const atUserList = ref([])

let focusNode = null
let cursorBeforeStr = null
let lastAtIndex = null

const userListFilter = computed(() => {
  if (filterValue.value) {
    return props.userList.filter((item) => {
      return item.name.includes(filterValue.value)
    })
  } else {
    return props.userList
  }
})
const isShow = ref(false)
function inputValue(params) {
  console.log('params', params)
  const selection = window.getSelection()
  if (params.data === '@') {
    isShow.value = true
    getCursorPosition()
  } else if (isShow.value) {
    const range = selection?.getRangeAt(0)
    const value = range.commonAncestorContainer.nodeValue
    const startOffset = range.startOffset
    const firstHalfPart = value.substring(0, startOffset)
    filterValue.value = firstHalfPart.match(/.+@(.+)$/)?.[1]
  }
  focusNode = selection.focusNode
  // 截取从开始到当前光标位置的字符串
  cursorBeforeStr = selection.focusNode?.data.slice(0, selection.focusOffset)
  // 获取最后一个@位置
  lastAtIndex = cursorBeforeStr?.lastIndexOf('@')  
  filterSelectUsers()
  inputChange()
}

// 获取光标位置坐标
function getCursorPosition() {
  const { x, y } = window.getSelection()?.getRangeAt(0).getBoundingClientRect()
  const editorDom = document.getElementById('atInput')
  const { x: eX, y: eY } = editorDom?.getBoundingClientRect()
  cursorPosition.value.top = `${y - eY + 16}px`
  cursorPosition.value.left = `${x - eX}px`
  console.log('cursorPosition.value', cursorPosition.value)
}

function userItemClick(params) {
  isShow.value = false
  const inputDom = document.getElementById('atInput')

  const selection = window.getSelection()
  const range = selection?.getRangeAt(0)
  const startIndex = lastAtIndex
  const endIndex = startIndex + filterValue.value.length + 1
  // 选中输入的 @关键字  -> @xxx
  range.setStart(focusNode, startIndex)
  range.setEnd(focusNode, endIndex)
  // 删除输入的 @xxx
  range.deleteContents()
  // 插入元素节点
  const atEle = createAtSpanTag(params.id, params.name, '#0535ff')
  range.insertNode(atEle)
  // 光标移动到末尾
  range.collapse()
  // 获取焦点
  inputDom.focus()
  filterSelectUsers()
}
// 创建用户标签
const createAtSpanTag = (id, name, color = 'blue') => {
  const ele = document.createElement('span')
  ele.className = 'at-span'
  ele.style.color = color
  ele.id = id.toString()
  ele.contentEditable = 'false'
  ele.innerText = `@${name}`
  return ele
}

function filterSelectUsers() {
  const spanList = document.querySelectorAll('.at-span')
  let ids = new Set()
  spanList.forEach((span) => {
    ids.add({
      id: span.id,
      name: span.innerText.replace('@', '')
    })
    atUserList.value = ids
  })
}

watch(
  atUserList,
  (newValue) => {
    const inputValue = document.getElementById('atInput').innerText
    console.log('dddd', inputValue);
    emits('change', {
      list: newValue,
      text: inputValue
    })
    inputChange()
  },
  { deep: true }
)
function inputChange() {
  const inputValue = document.getElementById('atInput').innerText
  emits('update:modelValue',inputValue)
}
</script>

<style lang="less" scoped>
.mention {
  width: 100%;
  color: #606266;
  display: inline-flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  position: relative;
  [contenteditable]:focus {
    outline: none;
  }
  .mention-input {
    width: 100%;
    min-height: 100px;
    font-size: 14px;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
      '微软雅黑', Arial, sans-serif;
    padding: 8px 11px;
    border-radius: 4px;
    box-shadow: 0 0 0 1px #dcdfe6 inset;
    color: #606266;
  }
  .select-user {
    width: 200px;
    height: 200px;
    box-shadow: 0 0 2px 1px #ddd;
    border-radius: 4px;
    position: absolute;
    z-index: 1;
    background-color: #fff;
    display: none;
    overflow-y: scroll;
    .user-item {
      padding: 12px;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
      &:hover {
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  .select-show {
    display: block;
  }
}
.at-span {
  margin: 0 4px;
}
</style>
