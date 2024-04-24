<!--
 * @Date: 2023-11-22 10:27:27
 * @LastEditors: @yujie
 * @LastEditTime: 2023-11-23 13:45:01
 * @Description: 
-->
<template>
    <div class="container">
        <div class="card" style="--clr: #f00;"></div>
        <div class="card" style="--clr: #0f0;"></div>
        <div class="card" style="--clr: #0fe;"></div>
        <div class="card" style="--clr: #ff0;"></div>
    </div>
</template>

<script setup>
import { watchEffect, ref, onMounted, computed } from 'vue';
import { useMouse } from '@/components/mouse';
const { x, y } = useMouse()

watchEffect([x, y], [mouseChange, mouseChange])

function mouseChange() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const { offsetLeft, offsetTop } = card
        // 获取元素的大小及其相对于视口的位置：left, top, right, bottom, x, y, width, height
        const info = card.getBoundingClientRect()
        card.onmousemove = (event) => {
            const { pageX, pageY } = event;
            card.style.setProperty('--x', pageX - info.left + 'px');
            card.style.setProperty('--y', pageY - info.top + 'px');
        }
    })
}


</script>

<style lang="less" scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 50px;
    padding: 40px 0;
    background-color: #222;
    border-radius: 5px;

    .card {
        width: 200px;
        aspect-ratio: 1/1; // 宽高比

        background-color: rgba(45, 45, 45, 1);
        border-radius: 20px;
        overflow: hidden;

        position: relative;

        &::before {
            content: "";
            position: absolute;
            left: var(--x);
            top: var(--y);
            transform: translate(-50%, -50%);

            width: 600px;
            height: 600px;
            background: radial-gradient(var(--clr), transparent, transparent);
            opacity: 0;
            transition: opacity 0.5s;
        }
        // 覆盖一层缩小2px的透明黑色背景的蒙版，以此来显示边框效果
        &::after {
            content: "";
            position: absolute;
            inset: 4px;
            border-radius: 18px;
            background-color: rgba(45, 45, 45, 0.75);
        }

        &:hover::before {
            opacity: 1;
        }
    }
}

</style>