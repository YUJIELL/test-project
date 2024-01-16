<!--
 * @Date: 2023-11-09 14:49:34
 * @LastEditors: @yujie
 * @LastEditTime: 2023-12-20 15:31:21
 * @Description: dialog-form表单重置组件
-->
<template>
    <div>
        <el-dialog :model-value="modelValue" v-bind="$attrs" @open="handleOpen" @close="handleClose">
            <slot></slot>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, ref, toRefs } from 'vue';
import { cloneDeep } from 'lodash';
/**
 * emits reset事件 form重置事件
 * emits init事件 form初始化事件
 */
const emits = defineEmits(['reset', 'init', 'update:modelValue'])
/**
 * props.form 表单数据
 * props.modelValue dialog打开/关闭 (default:false)
 * props.noReset 不重置表单 (default:false)
 */
const props = defineProps({
    form: Object,
    modelValue: Boolean,
    noReset: Boolean, // 不执行重置表单数据
})
const { form, modelValue } = toRefs(props)
const onceInit = ref(true)
const originData= cloneDeep(props.form)
const handleOpen = function () {
    // 重置表单数据
    if (!props.noReset) {
        Object.assign(props.form, originData)
        emits('reset')
    }
    // 返回init事件，用于页面初始化数据
    if (onceInit.value) {
        emits('init')
    }
    // 不执行重置且init只执行一次
    if (props.noReset) {
        onceInit.value = false
    }
}
const handleClose = function () {
    emits('update:modelValue', false)
}
</script>

<style lang="less" scoped>

</style>