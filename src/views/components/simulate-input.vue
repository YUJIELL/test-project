<!--
 * @Date: 2024-02-29 09:51:46
 * @LastEditors: @yujie
 * @LastEditTime: 2024-03-04 15:55:05
 * @Description: 
-->
<template>
    <div v-if="isSpan || disabled" class="simulate-box" :style="{width}" @click="handleSpan">
        <slot name="text">
            <div :class="[type, {disabled}]" style="width: 100%;display: flex;justify-content: space-between;">
                <span>{{ value }}</span>
                <el-icon v-if="type === 'select'" color="#606266"><ArrowDown /></el-icon>
            </div>
        </slot>
    </div>
    <div v-else ref="simulateInput" style="display: inline-block;">
        <slot></slot>
    </div>
</template>

<script setup>
import { ref, computed, useSlots, watch, getCurrentInstance } from 'vue';
import activeComponent from '@/utils/activeComponent.js';
// 获取当前vue实例uid
const {uid} = getCurrentInstance()

const props = defineProps({
    value: [String, Number],
    width: {
        type: String,
        default: '195px',
    },
    type: {
        type: String,
        default: 'input',
        validator(value, props) {
        return ['input', 'select', 'span'].includes(value)
        },
    },
    disabled: Boolean
})
const simulateInput = ref(null)
// const { value, width, type, disabled } = toRefs(props)
const isSpan = ref(true)
const setCurrentActive = ()=>{
    isSpan.value = true
}
// 缓存当前组件uid
activeComponent.setComponent({
    id: uid,
    func: setCurrentActive
})
function handleSpan(params) {
    if (!props.disabled) {
        isSpan.value = false
        // 设置当前组件活跃并关闭其他组件
        activeComponent.setComponentActive(uid)
    }
}
</script>

<style lang="less" scoped>
.simulate-box{
    // width: 100%;
    color: #606266;
    display: inline-flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    .span{
    }
    .input,.select{
        width: inherit;
        font-size: 14px;
        font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;
        padding: 8px 11px;
        border-radius: 4px;
        box-shadow: 0 0 0 1px #dcdfe6 inset;
        color: #606266;
    }
    .disabled{
        background-color: #f5f7fa;
    }
}

</style>