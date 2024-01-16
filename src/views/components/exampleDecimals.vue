<!--
 * @Date: 2023-11-22 10:05:28
 * @LastEditors: @yujie
 * @LastEditTime: 2023-12-20 16:40:05
 * @Description: 
-->
<template>
    <div>
        <div class="item-box">
            <span class="item-box-title">整数允许负数</span>
            <el-input v-decimals.minus.integer v-model="form.minusInteger"></el-input>
        </div>
        <div class="item-box">
            <span class="item-box-title">正整数</span>
            <el-input v-decimals.integer v-model="form.integer"></el-input>
        </div>
        <div class="item-box">
            <span class="item-box-title">2位小数</span>
            <el-input v-decimals v-model="form.decimal2"></el-input>
        </div>
        <div class="item-box">
            <span class="item-box-title">3位正数2位小数</span>
            <el-input v-decimals="'Integer3'" v-model="form.integer3"></el-input>
        </div>
        <div class="item-box">
            <span class="item-box-title">3位正数3位小数</span>
            <el-input v-decimals="'Integer3Decimal3'" v-model="form.integer3Decimal3"></el-input>
        </div>
        <div class="item-box">
            <span class="item-box-title">枚举</span>
            <div>
                <span>
                    {{ `<span v-enumValue="'gender'">1</span>` }}
                </span>
                效果：<span v-enumValue="'gender'">1</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import {reactive} from 'vue';
const form = reactive({
    name: '',
    num: 123123,
    minusInteger: '',
    integer: '',
    decimal2: '',
    integer3: '',
    integer3Decimal3: '',
})
</script>

<style lang="less" scoped></style>