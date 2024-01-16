import { toRefs } from 'vue';
<!--
 * @Date: 2023-11-09 15:21:25
 * @LastEditors: @yujie
 * @LastEditTime: 2023-11-09 16:32:58
 * @Description: 
-->
<template>
    <div>
        <el-radio-group v-bind="$attrs" :model-value="modelValue" @change="handleChange">
            <el-radio v-for="item in data" :key="item" :label="item[options.valueKey]">{{ item[options.labelKey] }}</el-radio>
        </el-radio-group>
    </div>
</template>

<script setup>
import {toRefs, toRaw} from 'vue';
const props = defineProps({
    modelValue: String | Number, // 绑定值
    data: Array, // 选项列表
    options: { // 配置项
        type: Object,
        default() {
            return {
                labelKey: 'label', // 指定选项的label为数据对象的某个属性值
                valueKey: 'value' // 指定选项的value为数据对象的某个属性值
            }
        }
    },
})
const {modelValue, data, options} = toRefs(props)

const emits = defineEmits(['update:modelValue', 'change'])

function handleChange(val) {
    const valueKey = options.value.valueKey
    const valueInfo = data.value.find(item=>item[valueKey] === val)
    emits('update:modelValue', val)
    // 返回选中值及其Object
    emits('change', val, toRaw(valueInfo))
}
</script>

<style lang="less" scoped>

</style>