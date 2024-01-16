<!--
 * @Date: 2023-09-19 14:11:29
 * @LastEditors: @yujie
 * @LastEditTime: 2023-09-19 14:32:34
 * @Description: 
-->
<template>
    <div style="padding: 20px;">
        <span>文本编辑器</span>
        <div style="display: flex;
        flex-direction: column;gap: 20px;">
            出现次数最多的字符是{{ keyMax }}
            <el-input style="width: 500px;" v-model="search" placeholder="请输入搜索"></el-input>
            <el-input style="width: 500px;" v-model="text" @change="computedNum" type="textarea"
                :autosize="{ minRows: 10, maxRows: 10 }" placeholder="Please input" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const text = ref('')
const search = ref('')
const keyMax = ref('')
const computedNum = function (str) {
    const obj = {};

    // 先遍历出所有字符出现次数
    for (let i = 0, len = str.length; i < len; i++) {
        const char = str.charAt(i);

        if (obj[char]) {
            obj[char]++;
        } else {
            obj[char] = 1;
        }
    }

    // 字符串出现次数集
    console.log(obj);
    // 出现次数最多的
    let maxCount = 0;
    let maxKey = ''
    for (const key in obj) {
        if (maxCount < obj[key]) {
            maxKey = key;
            maxCount = obj[key];
            console.log('object', maxKey,maxCount);
            keyMax.value = maxKey
        }
    }
}
const searchKey = function (params) {
    
}


</script>

<style lang="less" scoped></style>