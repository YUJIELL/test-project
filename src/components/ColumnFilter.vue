<!--
 * @Date: 2023-11-02 15:52:10
 * @LastEditors: @yujie
 * @LastEditTime: 2023-11-09 16:12:49
 * @Description: 
-->
<template>
    <div class="column-filter">
        <el-dropdown trigger="click" @visible-change="visibleChange">
            <span class="el-dropdown-link">
                <el-icon color="#409EFC" class="no-inherit">
                    <Operation />
                </el-icon>
                筛选列
            </span>
            <template #dropdown>
                <div style="padding: 20px 12px;padding-bottom: 0;">
                    <el-checkbox-group v-model="checkList" @change="checkboxChange">
                        <el-checkbox v-for="item in columnsList" :key="item" :label="item"
                            style="display: block"></el-checkbox>
                    </el-checkbox-group>
                </div>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
import { ref, reactive, watch, toRefs } from 'vue';
const emits = defineEmits(['change', 'visible-change'])
const props = defineProps({
    columns: {
        type: Array,
        default() {
            return []
        },
    },
})

// 列数据转筛选下拉
const sourceColumnsToList = function (list, parentName = null) {
    let newList = []
    let checkList = []
    list.forEach((element) => {
        if ('children' in element) {
            const sourceColumns = sourceColumnsToList(element.children, element.label)
            newList.push(
                ...sourceColumns.list
            )
            checkList.push(
                ...sourceColumns.checkList
            )
        } else {
            const label = parentName ? `${parentName}-${element.label}` : element.label
            newList.push(label)
            if (!('defaultChecked' in element) || element.defaultChecked) {
                checkList.push(label)
            }
        }
    })
    return { list: newList, checkList }
}
// 更新表格列
const columnsFilter = function (list, checkList, parentName = null) {
    let newList = []
    list.forEach((element) => {
        if ('children' in element) {
            const objList = columnsFilter(element.children, checkList, element.label)
            if (objList.length) {
                const { children, ...other } = toRefs(element)
                newList.push({
                    ...other,
                    children: [...objList]
                })
            }
        } else {
            const label = parentName
                ? `${parentName}-${element.label}`
                : element.label
            if (checkList.includes(label)) {
                newList.push(element)
            }
        }
    })
    return newList
}

let columnsList = ref([])
let checkList = ref([])

const sourceColumns = sourceColumnsToList(props.columns)
columnsList.value = sourceColumns.list
checkList.value = sourceColumns.checkList

const checkboxChange = function (checkList) {
    const column = columnsFilter(props.columns, checkList)
    emits('change', {
        column,
        checkList
    })
}
const visibleChange = function (val) {
    emits('visible-change', val)
}
</script>

<style lang="less" scoped>
.column-filter {
    .el-dropdown-link {
        line-height: 32px;
        cursor: pointer;
        color: #409eff;
    }
}
</style>