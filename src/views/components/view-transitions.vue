<!--
 * @Date: 2023-11-22 14:02:15
 * @LastEditors: @yujie
 * @LastEditTime: 2023-11-23 14:31:17
 * @Description: 
-->
<template>
    点击删除
    <div>
        <div style="display: inline-block;">
            <div ref="listRef" class="list" id="list">
                <div class="item" v-for="item in list" :key="item" :style="`--i: a${item}`">{{ item }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const listRef = ref()
const list = ref([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
])
onMounted(() => {
    listRef.value.addEventListener('click', function (ev) {
        if (ev.target.className === 'item') {
            document.startViewTransition(() => { // 开始视图变换
                ev.target.remove()
            });
        }
    })
})

</script>

<style lang="less" scoped>
.list {
    display: grid;
    width: 450px;
    gap: 20px;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-flow: row dense;
    padding: 20px;
}

.item {
    width: 100px;
    aspect-ratio: 1/1;
    background: royalblue;
    color: #fff;
    font-size: 30px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    view-transition-name: var(--i);

}

::view-transition-old(root),
/* 旧视图*/
::view-transition-new(root) {
    /* 新视图*/
    animation-duration: 2s;
}

.button {
    width: 100px;
    height: 22px;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 0 8px 1px #ddd;
    cursor: pointer;

    &:hover {
        // transform: scale(1.2);
        animation: buttonActive 500ms ease-out;
    }
}

@keyframes buttonActive {
    0% {
        transform: scale(0.9);
    }

    75% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}</style>