<template>
    <div class="search-box">
        <el-form :form="form">
            <el-row :gutter="gutter">
                <el-col :span="span" v-for="(item, index) in slotsSearch" :key="index">
                    <el-form-item :label="item.props?.label">
                        <searchSlot :v-node="item"></searchSlot>
                    </el-form-item>
                </el-col>
                <div class="search-button-group">
                    <slot name="actions"></slot>
                </div>
            </el-row>
        </el-form>
    </div>
</template>

<script setup>
import createSlot from './render.js';
import { ref, useSlots } from 'vue';

const searchSlot = createSlot()
const slots = useSlots()
const slotsFilter = slots.search().filter(item =>{
    if (typeof item.type === 'symbol') {
        const type = item.type.toString()
        return type !== 'Symbol(v-cmt)' // 注释节点
    } else {
        return true
    }
})
let slotsSearch = ref([])
const vNodeAnalysis = function (vNode) {
    vNode.forEach(element => {
        if (typeof element.type === 'object') {
            slotsSearch.value.push(element)
            return
        } else {
            vNodeAnalysis(element.children)
        }
    });
}
vNodeAnalysis(slotsFilter)

defineProps({
    form: Object,
    gutter: {
        type: Number,
        default: 10
    },
    span: {
        type: Number,
        default: 6
    }
})

</script>

<style lang="less" scoped>
.search-box {
    .search-button-group {
        flex: 1;
        text-align: right;
        padding-right: 10px;
    }
}
</style>