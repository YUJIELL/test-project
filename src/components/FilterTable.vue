<!--
 * @Date: 2023-11-01 14:45:05
 * @LastEditors: @yujie
 * @LastEditTime: 2023-11-09 16:17:06
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
            <column-filter :columns="columns" @change="columnChange"></column-filter>
        </div>
        <div class="table">
            <el-table v-bind="$attrs" :data="tableData" border stripe>
                <template v-if="$slots.table">
                    <!-- <slot name="default"></slot> -->
                    <template v-for="(item, index) in $slots.default()">
                        <template v-if="index === 1">
                            <component :is="item"></component>
                        </template>
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
                            <template v-else-if="'children' in col">
                                <el-table-column v-for="child in col.children" :key="child.label"
                                    :header-align="child.headerAlign" :align="child.align" :prop="child.prop"
                                    :label="child.label">
                                    <template #default="childScore">
                                        <template v-if="child.custom">
                                            <slot :name="'column-'+child.prop" :row="childScore.row">{{ childScore.row[child.prop] }}
                                            </slot>
                                        </template>
                                        <span v-else>{{ child.formatter ? child.formatter(childScore.row) :
                                            childScore.row[child.prop] }}</span>
                                    </template>
                                </el-table-column>
                            </template>
                            <span v-else>{{ col.formatter ? col.formatter(row) : row[col.prop] }}</span>
                        </template>
                    </el-table-column>
                </template>

            </el-table>
        </div>

        <div v-show="pagination && tableData.length" class="pagination">
            <el-pagination v-model:current-page="searchForm.pageNum" v-model:page-size="searchForm.pageSize"
                :page-sizes="paginationOption.pageSizes" :small="paginationOption.small"
                :disabled="paginationOption.disabled" :background="paginationOption.background"
                :layout="paginationOption.layout" :total="searchForm.total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, useSlots, toRefs, h } from 'vue'
import { cloneDeep } from 'lodash';
import ColumnFilter from './ColumnFilter.vue';
import SearchFormGroup from './SearchFormGroup.vue';

const emit = defineEmits(['sizeChange', 'currentChange'])
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
    columns: Array,
    tableData: Array, // table数据
    loadData: Function, // 加载方法
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


const searchFormSource = cloneDeep(props.searchForm)

const columnFilter = ref(props.columns)

const handleSizeChange = function (val) {
    emit('sizeChange')
    props.searchForm.pageSize = val
}
const handleCurrentChange = function (val) {
    emit('currentChange')
    props.searchForm.pageNum = val
}


const columnChange = function ({ column, checkList }) {
    columnFilter.value = column
}

const search = function () {
    props.loadData(props.searchForm)
}
const reset = function () {
    for (const key of Object.keys(props.searchForm)) {
        props.searchForm[key] = searchFormSource[key]
    }
    search()
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
