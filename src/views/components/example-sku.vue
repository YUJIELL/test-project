<!--
 * @Date: 2023-12-07 13:29:45
 * @LastEditors: @yujie
 * @LastEditTime: 2024-01-16 10:04:52
 * @Description: 
-->
<template>
    <div class="sku">
        <div class="left">
            <div></div>
            <div class="row">
                <div v-for="(item, index) in specAllList" :key="index" class="item">{{ item }}</div>
            </div>
            <div class="column">
                <div v-for="(item, index) in specAllList" :key="index" class="item" :class="checkedList.includes(item)?'active':''">{{ item }}</div>
            </div>
            <div class="content">
                <div v-for="(item, index) in vertexList" :key="index" class="item" style="background-color: #ccc;">
                    {{ item }}
                </div>
            </div>
        </div>
        <div class="right">
            <specification-checked :data="specList" :combination="specCombinationList" v-model="checkedList"></specification-checked>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import Adjoin from '@/utils/adjoin.ts';
import SpecificationChecked from '@/components/SpecificationChecked.vue';
const specList = ref([
    { title: "颜色", list: ["红色", "紫色"] },
    { title: "套餐", list: ["套餐一", "套餐二"] },
    { title: "内存", list: ["64G", "128G", "256G"] },
]);
const checkedList = ref([])
let specAllList = specList.value.reduce((total, num) => {
    return [...total, ...num.list]
}, [])
const specification = ref(specAllList)
const specCombinationList = [
    { id: "1", specs: ["紫色", "套餐一", "64G"] },
    { id: "2", specs: ["紫色", "套餐一", "128G"] },
    { id: "3", specs: ["紫色", "套餐二", "128G"] },
    { id: "4", specs: ["红色", "套餐二", "256G"] }
]


// 创建矩阵
const demo = new Adjoin(specList.value)

demo.setAllVertexRelevance(specCombinationList)
const vertexList = ref([])
vertexList.value = demo.getAdjoinArray();


</script>

<style lang="less" scoped>
.sku {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 20px;

    .left {
        display: grid;
        grid-template-rows: 60px 1fr;
        grid-template-columns: 60px 1fr;
        gap: 10px;
    }


    .content {
        display: grid;
        grid-template-rows: repeat(7, 60px);
        grid-template-columns: repeat(7, 60px);
        gap: 10px;
    }

    .row {
        // width: 760px;
        height: 100%;
        // border: 1px solid;
        display: grid;
        grid-template-rows: 60px;
        grid-template-columns: repeat(7, 60px);
        gap: 10px;
    }

    .column {
        height: 100%;
        // border: 1px solid;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .item {
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #454d64;
    }
    .active {
        background-color: #4169e1;
        color: #fff;
    }
}
</style>