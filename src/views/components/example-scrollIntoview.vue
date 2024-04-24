<template>
    <div>
        <div class="list">
            <div class="item" v-for="item in list" :key="item" :class="{ 'active': activeIndex === item }">{{ item }}</div>
        </div>
        <el-button @click="toLast">上一个</el-button>
        <el-button @click="toNext">下一个</el-button>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const list = ref([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
])
const activeIndex = ref(1)
function toNext(event) {
    if (activeIndex.value < list.value.length) {
        activeIndex.value++
        nextTick(() => {
            var cur = document.querySelector('.active')
            // scrollIntoViewIfNeeded参数：true，则元素将在其所在滚动区的可视区域中居中对齐。false，边缘对齐
            cur.scrollIntoViewIfNeeded(false)
        })


        //   var pre = cur.previousElementSibling;
        //   if (pre) {
        //     cur.classList.remove('active')
        //     pre.classList.add('active')
        //     pre.scrollIntoViewIfNeeded()
        //   }
    }
}
function toLast(event) {
    if (activeIndex.value > 1) {
        activeIndex.value--
        nextTick(() => {
            var cur = document.querySelector('.active')
            cur.scrollIntoViewIfNeeded(false)
        })
    }
}
</script>

<style lang="less" scoped>
.list {
    width: 350px;
    overflow: auto;
    display: flex;
    gap: 10px;

    .item {
        flex: 0 0 auto;
        width: 100px;
        aspect-ratio: 1/1;
        background: royalblue;
        color: #fff;
        font-size: 30px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .active {
        background-color: #F44336;
    }
}
</style>