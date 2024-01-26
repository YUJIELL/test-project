<template>
    <div>
        <filter-table filter :search-form="searchForm" :tableData="tableData" :hideColumns="['age']" @search="">
            <template #search>
                <div>
                    <el-select label="aaa" v-model="searchForm.name" placeholder="">
                    </el-select>
                    <el-input label="bbbb" v-model="searchForm.name"></el-input>
                    <el-input label="cccc" v-model="searchForm.name"></el-input>
                    <el-input label="dddd" v-model="searchForm.name"></el-input>
                    <el-input label="eeee" v-model="searchForm.name"></el-input>
                </div>
            </template>
            <template #table>
                <el-table-column label="名称" prop="name"></el-table-column>
                <el-table-column label="年龄" prop="age"></el-table-column>
                <el-table-column label="score" prop="score"></el-table-column>
            </template>
            <!-- <template #buttonGroup>
                <el-button type="primary">九九九</el-button>
            </template>
            <template #column-age="{ row }">
                <el-input></el-input>
            </template> -->
        </filter-table>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import FilterTable from '@/components/FilterTable.vue';
const searchForm = reactive({
    name: '',
    pageNum: 1,
    pageSize: 10,
    total: 20,
})
const tableData = reactive([
    { name: '123', score: 10, age: '20' },
    { name: '456', score: 20, age: '20' },
])
const columns = reactive([
    {
        id: '1',
        prop: 'name',
        label: '名称',
        custom: false,
        formatter: function (row) {
            return `A:${row.name}`
        },
    },
    {
        id: '2',
        prop: 'age',
        label: '年龄',
        custom: true,
    },
    {
        id: '3',
        prop: 'score',
        label: '分数',
        custom: true,
    },
    {
        id: '4',
        prop: 'score',
        label: 'xingbie',
        custom: true,
    },
])

function loadData(params) {
    console.log('params', params);
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve({
                data: tableData
            })
        }, 3000);
    })
}

</script>
<style lang="less" scoped></style>
