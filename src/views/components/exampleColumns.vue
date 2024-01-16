<!--
 * @Date: 2023-11-22 10:06:42
 * @LastEditors: @yujie
 * @LastEditTime: 2023-11-23 10:47:48
 * @Description: 
-->
<template>
    <div class="wrap">
        <div class="wrap-list">
            <div class="wrap-item">1</div>
            <div class="wrap-item">2</div>
            <div class="wrap-item">3</div>
            <div class="wrap-item">4</div>
            <div class="wrap-item">5</div>
            <div class="wrap-item">6</div>
            <div class="wrap-item">7</div>
            <div class="wrap-item">8</div>
            <div class="wrap-item">9</div>
            <div class="wrap-item">10</div>
            <div class="wrap-item">11</div>
            <div class="wrap-item">12</div>
            <div class="wrap-item">13</div>
            <div class="wrap-item">14</div>
        </div>
    </div>
    横向滚动试试
</template>

<script setup>

</script>

<style lang="less" scoped>
.wrap {
    display: flex;
    width: 400px;
    overflow: auto;
    outline: 1px dashed #9747FF;
    // 借助 scroll-snap 实现轮播效果
    scroll-snap-type: x mandatory; // 滚动容器的轴表示滚动方向，x值表示水平滚动，而y表示垂直滚动。mandatory：精确捕捉，proximity：
    scroll-padding: 10px; // 设置捕捉内边距
    // scroll-snap-stop: always; // 强制捕捉每个点，防止滚动太快，跳过某些项。

    &::-webkit-scrollbar {
        display: none;
    }

    .wrap-item {
        display: inline-flex;
        width: 80px;
        margin: 10px;
        aspect-ratio: 1/1; // 宽高比
        background: #FFE8A3;
        color: #333;
        font-size: 30px;
        border-radius: 10px;
        align-items: center;
        justify-content: center;

        &:nth-child(8n+1) {
            // 添加吸附对象
            scroll-snap-align: start; // 子项目将吸附到滚动容器的位置：start/center/end
            // scroll-margin: 10px; // 设置子项边距
        }
    }

    .wrap-list {
        height: 200px;
        column-width: 400px; // 设置分栏宽度为滚动容器宽度之后，就自动将整个列表分成多组
    }
}
</style>