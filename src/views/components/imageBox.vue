<!--
 * @Date: 2023-11-23 14:34:17
 * @LastEditors: @yujie
 * @LastEditTime: 2024-01-02 08:55:00
 * @Description: 
-->
<template>
    <div style="display: flex;gap: 20px;">
        <div v-for="item in imageList" :key="item" class="image-box">
            <el-image class="image" :src="item"></el-image>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import image82964 from '@/assets/82964.png';
import image2839b from '@/assets/2839b.png';
import image0aba0 from '@/assets/0aba0.png';
import image57020 from '@/assets/57020.png';
import image3e5c0 from '@/assets/3e5c0.png';
import image35402 from '@/assets/35402.png';
import imagec6453 from '@/assets/c6453.png';
const imageList = ref([image82964, image2839b, image0aba0, image57020, image3e5c0, image35402, imagec6453])

</script>
<style lang="less" scoped>
.image-box {
    width: 200px;
    aspect-ratio: 1/1;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 0 8px 1px #ddd;
    overflow: hidden;
}

.image {
    transition: all 0.3s linear;

    &:hover {
        transform: scale(1.2);
        animation: imageScale 0.5s linear;
    }
}

@keyframes imageScale {
    0% {
        transform: scale(1);
    }

    70% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1.2);
    }
}</style>