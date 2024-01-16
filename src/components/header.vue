<!--
 * @Date: 2023-11-16 10:31:23
 * @LastEditors: @yujie
 * @LastEditTime: 2023-11-21 09:57:59
 * @Description: 
-->
<template>
    <div class="menu-header" :class="{ 'hearer-show': visible }">
        <div class="exit">
            <el-icon size="30" color="#d6ecff" @click="goBack">
                <ArrowLeftBold />
            </el-icon>
        </div>
        <div class="exit">
            <el-icon size="40" color="#d6ecff">
                <Expand />
            </el-icon>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useMouse } from '@/components/mouse';
import { useRouter } from "vue-router";
const router = useRouter();

const { x, y } = useMouse()
const visible = ref(false)
watch(y, () => {
    visible.value = y.value < 60
})
function goBack() {
    router.go(-1)
}
</script>

<style lang="less" scoped>
.menu-header {
    width: 100%;
    height: 0px;
    border-radius: 2px;
    box-shadow: 0 0 5px 2px #d6ecff;
    background-color: rgba(214, 236, 255, 0.2);
    display: flex;
    justify-content: end;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    backdrop-filter: blur(1px);
    transition-property: height, background-color;
    transition-duration: 200ms;
    transition-timing-function: ease-in;
    // transition-delay: 500ms;
    overflow: hidden;

    .exit {
        padding: 10px;
        margin-right: 20px;
        cursor: pointer;
    }
}

.hearer-show {
    height: 60px;
}
</style>