<!--
 * @Date: 2024-04-16 16:19:05
 * @LastEditors: @yujie
 * @LastEditTime: 2024-05-11 10:35:12
 * @Description: 
-->
<template>
    <div v-if="loading" style="overflow: hidden;">
        <div style="position: fixed;top: 20px; right: 0;z-index: 1;">
            <el-button type="primary" :icon="CopyDocument" circle @click="copyComponents"></el-button>
            <el-button type="danger" :icon="DeleteFilled" circle @click="deleteComponents"></el-button>
        </div>

        <div class="right-item" v-for="(item, index) in currentAttributes" :key="item">
            <div class="item-title">{{ item.label }}</div>
            <el-input v-if="item.inputType === 'text' || item.inputType === 'textarea'" :type="item.inputType" :placeholder="item.accepted"
                v-model="item.modelValue" @change="settingChange(item)"></el-input>
            <el-switch v-if="item.inputType === 'switch'" v-model="item.modelValue" :active-text="`${item.accepted[1]}`"
                :inactive-text="`${item.accepted[0]}`" active-color="#13ce66" inactive-color="#dcdfe6"
                @change="settingChange(item)">
            </el-switch>
            <div v-if="item.inputType === 'radio'" @change="settingChange(item)">
                <el-radio-group v-model="item.modelValue">
                    <el-radio v-for="(radio, radioIndex) in item.accepted" :key="radioIndex" :label="radio"></el-radio>
                </el-radio-group>
            </div>
            <div v-if="item.inputType === 'array'">
                <div v-for="item in item.modelValue" :key="item.rule" style="margin: 10px 0;">
                    <el-input v-model="item.rule" type="textarea" :autosize="{ minRows: 3 }" placeholder=""></el-input>
                </div>

                <el-button type="primary" :icon="Plus" circle @click="addRule(item.modelValue)" />
            </div>
            <div v-if="item.inputType === 'options'">
                <el-switch v-model="item.isCustom" active-text="使用自定义" inactive-text="使用配置项" active-color="#13ce66"
                    inactive-color="#dcdfe6" @change="selectOptionsCustomChange(item)"></el-switch>
                <el-input v-if="item.isCustom" v-model="item.modelValue" type="textarea"
                    @change="settingChange(item)"></el-input>
                <template v-else>
                    <div class="options-input">
                        label: <el-input v-model="item.modelValue.label" placeholder="选项label的key"></el-input>
                    </div>
                    <div class="options-input">
                        value: <el-input v-model="item.modelValue.value" placeholder="选项value的key"></el-input>
                    </div>
                    <div class="options-input">
                        options: <el-input v-model="item.modelValue.options" placeholder="选项对象的key"></el-input>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    Plus,
    DeleteFilled,
    CopyDocument
} from '@element-plus/icons-vue'
import { defineProps, watch, ref } from 'vue';
import { cloneDeep } from 'lodash';


const props = defineProps({
    currentInfo: Object,
})
const currentAttributes = ref({})
const loading = ref(true)
const emit = defineEmits(['settingChange', 'copyComponents', 'deleteComponents', 'copy', 'delete'])
currentAttributes.value = cloneDeep(props.currentInfo.attributes)
watch(() => props.currentInfo.id, (newValue) => {
    currentAttributes.value = cloneDeep(props.currentInfo.attributes)
})

function selectOptionsCustomChange(params) {
    if (params.isCustom) {
        params.modelValue = ''
    } else {
        params.modelValue = { label: 'label', value: 'value', options: '' }
    }
}
function settingChange(params) {
    emit('settingChange', params)
}

function addRule(params) {
    params.push({ rule: 'name: [{ required: true, message: "", trigger: "blur" }]' })
}

function copyComponents() {
    emit('copy', props.currentInfo)
}
function deleteComponents() {
    emit('delete', props.currentInfo)
}
</script>

<style lang="less" scoped>
.right-item {
    margin: 16px;
    padding: 8px;
    box-shadow: 0 0 5px 1px #ddd;
    border-radius: 4px;
}

.item-title {
    padding: 4px;
    // border-bottom: 1px dashed #279aff
}

.options-input {
    margin: 10px 0;
    display: flex;
    gap: 10px;
    align-items: center;
}
</style>