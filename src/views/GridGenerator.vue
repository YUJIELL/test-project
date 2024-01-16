<!--
 * @Date: 2023-11-25 16:39:47
 * @LastEditors: @yujie
 * @LastEditTime: 2023-11-28 14:50:18
 * @Description: 
-->
<template>
    <div class="grid-generator">
        <div class="view-title">Grid布局编辑器</div>
        <div class="generator-content">
            <div class="content-item content-left">
                <div class="grid-column">
                    <div v-for="(item, index) in columnNum" :key="item.id">
                        <el-input style="width: 50px" v-if="['fr', 'px', '%', 'minmax()'].includes(item.sizing)"
                            v-model="item.val"></el-input>
                        <span v-else style="display: inline-block;width: 50px;">{{ item.val }}</span>
                        <el-select style="width: 100px" v-model="item.sizing" value-key="" placeholder="" clearable
                            filterable @change="">
                            <el-option v-for="(item, sizeIndex) in sizing" :key="sizeIndex" :label="item" :value="item">
                            </el-option>
                        </el-select>
                        <el-button style="margin-left: 10px;" type="danger" :icon="Minus" size="small" circle @click="deleteColumn(item, index)" />
                    </div>
                </div>
                <div class="row-content">
                    <div class="row-content-edit">
                        <div style="flex: 1;padding-top: 20px;" v-for="(item, index) in rowNum" :key="item.id">
                            <el-input style="width: 50px" v-if="['fr', 'px', '%', 'minmax()'].includes(item.sizing)"
                                v-model="item.val"></el-input>
                            <span v-else style="display: inline-block;width: 50px;">{{ item.val }}</span>
                            <el-select style="width: 100px" v-model="item.sizing" value-key="" placeholder="" clearable
                                filterable @change="">
                                <el-option v-for="(item, sizeIndex) in sizing" :key="sizeIndex" :label="item" :value="item">
                                </el-option>
                            </el-select>
                            <el-button style="margin-left: 10px;" type="danger" :icon="Minus" size="small" circle @click="deleteRow(item, index)" />
                        </div>
                    </div>
                    <div class="grid-content">
                        <div class="grid-item" v-for="(item, index) in gridItemList" :key="item" @click="gridItemClick">
                            <!-- name: <el-input style="display: inline-block;width: 100px;" v-model="item.name" placeholder=""
                                size="normal" clearable></el-input> -->
                                {{ item }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-item content-right"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import {
    Minus
} from '@element-plus/icons-vue'
const sizing = ref(['fr', 'px', '%', 'auto', 'min-content', 'max-content', 'minmax()'])
const rowSizeActive = sizing.value[0]
const rowSizeVal = ref(1)
const columnSizeActive = sizing.value[0]
const columnSizeVal = ref(1)
const sizeActive = sizing.value[0]
const rowNum = ref([
    { id: 1, sizing: rowSizeActive, val: '1' },
    { id: 2, sizing: rowSizeActive, val: '1' },
    { id: 3, sizing: rowSizeActive, val: '1' },
    { id: 4, sizing: rowSizeActive, val: '1' },
    { id: 5, sizing: rowSizeActive, val: '1' },
]) // 行数量
const columnNum = ref([
    { id: 1, sizing: rowSizeActive, val: '1' },
    { id: 2, sizing: rowSizeActive, val: '1' },
    { id: 3, sizing: rowSizeActive, val: '1' },
    { id: 4, sizing: rowSizeActive, val: '1' },
    { id: 5, sizing: rowSizeActive, val: '1' },
]) // 列数量

const gridTemplateColumns = computed(()=>{
    return `repeat(${columnNum.value.length}, ${columnSizeVal.value}${columnSizeActive})`
})
const gridTemplateRow = computed(()=>{
    return `repeat(${rowNum.value.length}, ${rowSizeVal.value}${rowSizeActive})`
})
// const gridTemplateColumns = ref()
// const gridTemplateRow = ref(`repeat(${rowNum.value.length}, ${rowSizeVal}${rowSizeActive})`)
console.log('gridTemplateRow', gridTemplateRow.value);
const gridItemGap = ref('10px')

const gridItemList = new Array(columnNum.value.length * rowNum.value.length).fill('').map((item, index)=>{
    return `${index + 1}`
})

function deleteRow(val, index) {
    rowNum.value.splice(index, 1)
    const len = columnNum.value.length
    const startIndex = index * len
    gridItemList.splice(startIndex, len+1)
}

function deleteColumn(val, index) {
    rowNum.value.forEach((element, rowIndex) => {
        const len = columnNum.value.length
        const Index = (rowIndex * len) + index - rowIndex
        gridItemList.splice(Index, 1)
    });
    columnNum.value.splice(index, 1)
}

</script>

<style lang="less" scoped>
.grid-generator {
    width: 100vw;
    height: 100vh;

    .view-title {
        text-align: center;
        padding: 40px;
        font-size: 24px;
        font-weight: 600;
    }

    .generator-content {
        display: grid;
        grid-template-columns: 1fr 400px;
        grid-template-rows: calc(100vh - 160px);
        gap: 20px;
        padding: 20px;
        ::v-deep .el-input__suffix{
            display: none;
        }

        .content-item {
            padding: 20px;
            box-shadow: 0 0 10px 1px #ddd;
            border-radius: 10px;
        }

        .content-left {
            // background-color: #1d2633;

            .grid-column {
                display: flex;
                margin-left: 200px;
                div {
                    flex: 1;
                    text-align: center;
                }
            }

            .row-content {
                height: calc(100% - 40px);
                display: flex;

                .row-content-edit {
                    width: 200px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
            }

            .grid-content {
                width: calc(100% - 200px);
                margin-top: 12px;
                display: grid;
                grid-template-columns: v-bind(gridTemplateColumns);
                grid-template-rows: v-bind(gridTemplateRow);
                gap: v-bind(gridItemGap);

                .grid-item {
                    border: 1px dashed #aaa;
                    padding: 10px;
                }
            }

        }
    }
}
</style>