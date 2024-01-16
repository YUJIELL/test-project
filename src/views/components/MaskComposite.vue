<template>
    <div class="mask-box">
        <div v-for="(item, index) in list" :key="index" style="position: relative;">
            <div style="text-align: center;margin-bottom: 10px;">{{ item }}</div>
            <div class="content" :class="item">
                <div class="c">
                    <div class="c1">source</div>
                    <div class="c2">destination</div>
                </div>
            </div>
            <div class="content-copy">
                <div class="c">
                    <div class="c1">source</div>
                    <div class="c2">destination</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
const list = ref([
    'unset',
    'clear',
    'copy',
    'source-over',
    'source-in',
    'source-out',
    'source-atop',
    'destination-over',
    'destination-in',
    'destination-out',
    'destination-atop',
    'xor',
])
</script>

<style lang="less" scoped>
.mask-box {
    display: flex;
    flex-wrap: wrap;
    gap: 50px 30px;
    padding: 35px 0;
}

.content {
    width: 300px;
    height: 150px;
    margin: auto;
    -webkit-mask: linear-gradient(red, red) 75px 0/100px 100px, linear-gradient(red, red) 125px 100%/100px 100px;
    -webkit-mask-repeat: no-repeat;
    background-color: cornflowerblue;

}

.content-copy {
    position: absolute;
    top: 1px;
    box-shadow: 0 0 5px 1px #ddd;
    padding: 30px 0;
    border-radius: 5px;
}

.c {
    position: relative;
    margin: auto;
    width: 300px;
    height: 150px;
    pointer-events: none;
}

.c1,
.c2 {
    position: absolute;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    border: 1px dashed pink;
    display: flex;
    align-items: center;
    color: cornflowerblue;
    justify-content: center;

    &::after {
        content: '';
        position: absolute;
        box-sizing: border-box;
        width: 100px;
        height: 100px;
        border: 1px dashed red;
    }
}

.c1 {
    left: 75px;
    text-indent: -120px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
    // background-color: red;
}

.c2 {
    right: 75px;
    bottom: 0;
    text-indent: 200px;
    // background-color: blue;
}

.unset {
    -webkit-mask-composite: unset;
}

.clear {
    -webkit-mask-composite: clear;
}

.copy {
    -webkit-mask-composite: copy;
}

.source-over {
    -webkit-mask-composite: source-over;
}

.source-in {
    -webkit-mask-composite: source-in;
}

.source-out {
    -webkit-mask-composite: source-out;
}

.source-atop {
    -webkit-mask-composite: source-atop;
}

.destination-over {
    -webkit-mask-composite: destination-over;
}

.destination-in {
    -webkit-mask-composite: destination-in;
}

.destination-out {
    -webkit-mask-composite: destination-out;
}

.destination-atop {
    -webkit-mask-composite: destination-atop;
}

.xor {
    -webkit-mask-composite: xor;
}</style>