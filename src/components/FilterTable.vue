<!--
 * @Date: 2023-11-01 14:45:05
 * @LastEditors: @yujie
 * @LastEditTime: 2024-01-16 17:25:09
 * @Description: 
-->
<!--
 * @Date: 2023-11-01 14:45:05
 * @LastEditors: @yujie
 * @LastEditTime: 2024-01-16 09:59:24
 * @Description: 
-->
<template>
    <div class="m-table-content">
        <div v-if="filter">
            <search-form-group :form="searchForm">
                <template #search>
                    <slot name="search"></slot>
                </template>
                <template #actions>
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button type="primary" plain @click="reset">重置</el-button>
                </template>
            </search-form-group>
        </div>
        <div class="button-group">
            <div>
                <slot name="buttonGroup">
                    <span></span>
                </slot>
            </div>
            <column-filter :columns="columnList" @change="columnChange"></column-filter>
        </div>
        <div class="table">
            <el-table v-bind="$attrs" :data="tableDataCopy" border stripe>
                <template v-if="$slots.table">
                    <template v-for="(item, index) in $slots.table()">
                        <searchSlot :v-node="item" :show="columnIsCheck(item.props.prop)"></searchSlot>
                    </template>
                </template>
                <template v-else>
                    <el-table-column v-if="selection" type="selection" width="55" />
                    <el-table-column v-for="col in columnFilter" :prop="col.prop" :key="col.prop" :label="col.label"
                        :width="col.width" :header-align="col.headerAlign" :align="col.align">
                        <template #default="{ row }">
                            <template v-if="col.custom">
                                <slot :name="col.prop" :row="row">{{ row[col.prop] }}</slot>
                            </template>
                            <span v-else>{{ col.formatter ? col.formatter(row) : row[col.prop] }}</span>
                        </template>
                    </el-table-column>
                </template>

            </el-table>
        </div>

        <div v-show="pagination && tableDataCopy.length" class="pagination">
            <el-pagination v-model:current-page="searchForm.pageNum" v-model:page-size="searchForm.pageSize"
                :page-sizes="paginationOption.pageSizes" :small="paginationOption.small"
                :disabled="paginationOption.disabled" :background="paginationOption.background"
                :layout="paginationOption.layout" :total="searchForm.total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, useSlots, toRefs, unref, h } from 'vue'
import { cloneDeep } from 'lodash';
import ColumnFilter from './ColumnFilter.vue';
import SearchFormGroup from './SearchFormGroup.vue';

import createSlot from './render.js';
const searchSlot = createSlot()

const slots = useSlots()
const emit = defineEmits(['search', 'reset', 'sizeChange', 'currentChange'])
const props = defineProps({
    filter: Boolean, // 是否开启筛选
    selection: Boolean, // 是否开启多选
    pagination: { // 是否开启分页
        type: Boolean,
        default: true,
    },
    searchForm: { // 筛选条件的form对象
        type: Object,
        default() {
            return {
                pageNum: 1,
                pageSize: 10,
                total: 0,
            }
        }
    },
    /**
     * columns：table的列数据，筛选列依赖此数据
     * 属性：prop、label、width、header-align、align、children、formatter
     */
    columns: {
        type: Array,
        default: () => []
    },
    hideColumns: {
        type: Array,
        default: () => []
    }, // 用于隐藏筛选列及表格列的字段prop
    tableData: Array, // table数据
    loadDataFunc: Function, // 加载方法
    paginationOption: { // 分页配置
        type: Object,
        default() {
            return {
                pageSizes: [10, 20, 50, 100],
                small: false,
                disabled: false,
                background: true,
                layout: 'total, sizes, prev, pager, next, jumper',
            }
        }
    }
})

let tableDataCopy = ref(props.tableData || [])

const searchFormSource = cloneDeep(props.searchForm)
// 数据用于表格列渲染
const columnFilter = ref([])
// 数据用于筛选列渲染
const columnList = ref([])

let columns = []

// 过滤要隐藏的列
// 传入columns时，使用columns
if (props.columns.length && props.hideColumns.length) {
    columns = filterHideColumns(props.columns)
} else {
    // 未传入columns时，使用table插槽，获取插槽数据以用于渲染表格
    const tableColumns = slots.table().map(item => item.props)
    columns = filterHideColumns(tableColumns)
}
columnList.value = cloneDeep(columns)
columnFilter.value = cloneDeep(columns)


function handleSizeChange(val) {
    emit('sizeChange')
    props.searchForm.pageSize = val
}
function handleCurrentChange(val) {
    emit('currentChange')
    props.searchForm.pageNum = val
}

// 使用hideColumns过滤要隐藏的列
function filterHideColumns(list) {
    return list.filter(item => !props.hideColumns.includes(item.prop))
}

// 筛选列变更回调
function columnChange({ column, checkList }) {
    columnFilter.value = column
}

// 判断列是否隐藏
function columnIsCheck(prop) {
    if (columnFilter.value && columnFilter.value.length) {
        const props = columnFilter.value.map(item => item.prop)
        return props.includes(prop)
    } else {
        return false
    }
}
if (!props.tableData) {
    search()
}
function search() {
    if (!props.tableData) {
        new Promise((resolve)=>resolve(props.loadDataFunc(props.searchForm))).then((result) => {
            tableDataCopy.value = result.data
        }).catch((err) => {
            
        });
    }
    emit('search', props.searchForm)
}
function reset() {
    for (const key of Object.keys(props.searchForm)) {
        props.searchForm[key] = searchFormSource[key]
    }
    search()
    emit('reset', props.searchForm)
}


</script>

<style lang="less" scoped>
.m-table-content {
    padding: 20px;

    .button-group {
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
    }

    .table {
        margin: 20px 0;
    }

    .pagination {
        margin: 20px 0;
        display: flex;
        justify-content: flex-end;
    }
}
</style>
