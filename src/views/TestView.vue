<!--
 * @Date: 2023-09-19 13:50:14
 * @LastEditors: @yujie
 * @LastEditTime: 2024-04-28 10:17:40
 * @Description: 
-->
<template>
    <div class="box">
        <div class="test" :class="isDark ? 'dark' : 'light'">
            <div style="position: fixed;top: 20px;right: 20px;">
                <el-button @click="darkChange">切换</el-button>
            </div>
            XXXXX: {{ x }} YYYYYY: {{ y }}

            <el-container>
                <el-aside width="200px" style="padding-right: 20px;">
                    <div class="menu-item" v-for="(item, index) in menuList" @click="menuSelect(item)"
                        :style="`--delay: ${(index * 100) + 200}ms`">{{ item.label }}</div>
                </el-aside>
                <el-container class="right-content">
                    <div class="progress"></div>
                    <!-- <div class="caret-top" @click="caretTop">
                        <el-button type="primary">
                            <el-icon>
                                <CaretTop />
                            </el-icon>
                        </el-button>
                        <div>回到顶部</div>
                    </div> -->
                    <div class="component-box" id="1-a1">
                        <image-box></image-box>
                    </div>
                    <div class="component-box" id="1-1">
                        <div class="box-content">
                            <example-table></example-table>
                        </div>
                    </div>
                    <div class="component-box" id="1-2">
                        <el-button @click="visible = true">打开弹窗</el-button>
                    </div>
                    <div class="component-box" id="1-3">
                        {{ radio }}
                        <div class="box-content">
                            <more-radio-group v-model="radio" :data="radioList" @change="radioChange"></more-radio-group>
                        </div>
                    </div>
                    <div class="component-box" id="1-4">
                        <div>小数位数</div>
                        <div class="box-content">
                            <example-decimals></example-decimals>
                        </div>
                    </div>
                    <div class="component-box" id="1-5">
                        千分位
                        <div class="box-content">
                            <div class="item-box">
                                <el-input v-thousands v-model="form.num"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="component-box" id="1-6">
                        防抖
                        <div class="box-content">
                            <div class="item-box">
                                <el-input v-debounce:1000="debounceFunc" v-model="form.num"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="component-box" id="1-7">
                        导航栏
                        <div class="box-content">
                            <app-bar></app-bar>
                        </div>
                    </div>
                    <div class="component-box" id="1-8">
                        多列布局columns
                        <div class="box-content">
                            <example-columns></example-columns>
                        </div>
                    </div>
                    <div class="component-box" id="1-9">
                        平滑圆角
                        <div class="box-content">
                            <div class="smooth">6</div>
                        </div>
                    </div>
                    <div class="component-box" id="1-10">
                        mask示例
                        <div class="box-content">
                            <mask-composite></mask-composite>
                        </div>
                    </div>
                    <div class="component-box" id="1-11">
                        高亮边框
                        <div class="box-content">
                            <example-highlight></example-highlight>
                        </div>
                    </div>
                    <div class="component-box" id="1-12">
                        原生的视图转换动画 View Transitions
                        <div class="box-content">
                            <view-transitions></view-transitions>
                        </div>
                    </div>
                    <div class="component-box" id="1-13">
                        SKU：基于无向图的实现
                        <div class="box-content">
                            <example-sku></example-sku>
                        </div>
                    </div>
                    <div class="component-box" id="1-14">
                        模拟input
                        <div class="box-content">
                            <simulate-input :value="inputVModel">
                                <el-input v-model="inputVModel" placeholder=""></el-input>
                            </simulate-input>
                            <!-- <simulate-input :value="inputVModel2">
                                <el-input v-model="inputVModel2" placeholder=""></el-input>
                            </simulate-input> -->
                        </div>
                    </div>
                    <div class="component-box" id="1-14">
                        支持@的输入框
                        <div class="box-content">
                            <mention-input v-model="mentionValue"></mention-input>
                        </div>
                    </div>

                </el-container>
            </el-container>
            <more-dialog title="title" v-model="visible" :form="form" :no-reset="true" @init="dialogInit">
                <el-input v-model="form.name"></el-input>
            </more-dialog>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { useRouter } from "vue-router";

import MoreDialog from '@/components/MoreDialog.vue';
import MoreRadioGroup from '@/components/MoreRadioGroup.vue';
import MaskComposite from '@/views/components/mask-composite.vue';
import AppBar from '@/views/components/app-bar.vue';
import ExampleTable from '@/views/components/example-table.vue';
import ExampleDecimals from '@/views/components/example-decimals.vue';
import ExampleColumns from '@/views/components/example-columns.vue';
import ExampleHighlight from '@/views/components/example-highlight.vue';
import ExampleScrollIntoView from '@/views/components/example-scrollIntoview.vue';
import ExampleAnimationTimeline from '@/views/components/example-animation-time-line.vue';
import ExampleSku from '@/views/components/example-sku.vue';
import ViewTransitions from '@/views/components/view-transitions.vue';
import ImageBox from '@/views/components/image-box.vue';
import SimulateInput from '@/views/components/simulate-input.vue';
import EnumInstance from '@/enums/index.js';
import MentionInput from '@/components/MentionInput.vue';

import regExp from '@/utils/regExpSet.ts';

const inputVModel = ref('123123')
const inputVModel2 = ref('1sssssssssssss')
const mentionValue = ref('')


let visible = ref(false)
const form = reactive({
    name: '',
    num: 123123,
    minusInteger: '',
    integer: '',
    decimal2: '',
    integer3: '',
    integer3Decimal3: '',
})
const radioList = ref([
    {
        label: 'Option 1',
        value: 'Option 1',
    },
    {
        label: 'Option 2',
        value: 'Option 2',
    },
])

const menuList = ref([
    { id: '1-a1', label: '相册' },
    { id: '1-1', label: '筛选列表' },
    { id: '1-2', label: 'dialog弹窗' },
    { id: '1-3', label: '单选框组' },
    { id: '1-4', label: '小数位数' },
    { id: '1-5', label: '千分位' },
    { id: '1-6', label: '防抖' },
    { id: '1-7', label: '移动端导航栏' },
    { id: '1-8', label: '多列布局columns' },
    { id: '1-9', label: '平滑圆角' },
    { id: '1-10', label: 'mask示例' },
    { id: '1-11', label: '高亮边框' },
    { id: '1-12', label: '原生的视图转换动画 View Transitions' },
    { id: '1-13', label: 'SKU：基于无向图的实现' },
    { id: '1-14', label: 'grid布局编辑器', routerName: 'grid' },
    { id: '1-15', label: '低代码', routerName: 'lowCode' },
])
const radio = ref(1)

function dialogInit() {
    console.log('执行了init');
    form.name = 'name'
}
function radioChange(val, valueInfo) {
    console.log(val, valueInfo);
}
const activeIndex = ref(0)
const router = useRouter()
function menuSelect(val) {
    activeIndex.value = val.id
    if ('routerName' in val) {
        router.push({name: val.routerName})
    } else {
        document.getElementById(val.id).scrollIntoView()
    }
}
function debounceFunc() {
    // console.log('执行了防抖');
}
const isDark = ref(false)
function darkChange() {
    isDark.value = !isDark.value
}
function caretTop() {
    document.querySelector('.right-content').scrollTop = 0;
}

import { useMouse } from '@/components/mouse';
const { x, y } = useMouse()
const backgroundColor = computed(() => {
    return !isDark.value ? '#111' : '#fff'
})
const gender = EnumInstance.get()
console.log('gender', gender);

const integer = regExp.validation('integer', '123123')
console.log('activeIndex', activeIndex);

</script>

<style lang="less" scoped>
.box {
    width: 100vw;
    height: 100vh;
    background-color: v-bind(backgroundColor);
}




.test {
    width: 100vw;
    height: 100vh;
    color: #454d64;

    // padding: 20px;
    .right-content {
        height: calc(100vh - 60px);
        // border: 1px solid;
        // height: 90vh;
        overflow: scroll;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 10px 0;
        scroll-behavior: smooth;
        // 创建一个带有名称的时间线
        scroll-timeline-name: --my-scroller;
        will-change: transform;

        @keyframes scale {
            from {
                transform: scale(1) // transform: translate(0px);
            }

            to {
                transform: scale(var(--scale)) // transform: translate(100px);

            }
        }
    }

    .component-box {
        margin: 0 20px;
        padding: 20px;
        box-shadow: 0 0 10px 1px #ddd;
        border-radius: 10px;
        animation: appear 1s linear both;
        animation-timeline: view(40% 0); // 当滚动到视区上面40%的时候就完成了动画（默认是滚动到0%，也就是完全离开的时候）
        // animation-timeline: view();

        .box-content {
            margin: 20px 0;
        }
    }

    .header {
        height: 100px;
        background-color: #ccc;
    }

    .content {
        display: flex;
    }

    .left {
        width: 200px;
        height: calc(100vh - 200px);
        background-color: aqua;
    }

    .right {
        width: 100%;
        height: calc(100vh - 200px);
        flex: 1;
        overflow: auto;

        .right-content {
            width: 100vw;
            height: 100vh;
        }
    }

    .bottom {
        width: 100vw;
        height: 100px;
        background-color: #2178d5;
    }

    .item-box {
        display: flex;
        margin: 10px 0;

        .item-box-title {
            display: inline-block;
            width: 120px;
        }
    }

    .smooth {
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 32px;
        cursor: pointer;
        box-shadow: 0 0 1px 1px #ddd;
        background: linear-gradient(135deg, deeppink, orangered);
        mask-image: url(../assets/mask.svg); // 使用svg遮罩
    }


}

.progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(135deg, deeppink, orangered);
    transform-origin: 0 50%;
    animation: grow-progress 1s linear;
    // 动画时间线
    animation-timeline: --my-scroller;
}

.caret-top {
    position: fixed;
    bottom: 80px;
    right: 30px;
    z-index: 1;
    text-align: center;
    animation: an-caret-top 1s ease-out;
    animation-timeline: --my-scroller;
    animation-range: 0 500px; // 动画范围，表示只在[0, 固定距离]这个区间范围内触发动画
}

@keyframes an-caret-top {
    0% {
        transform: translateY(135px);
    }

    100% {
        transform: translateY(0px);
    }
}

@keyframes appear {
    0% {
        // opacity: 0.5;
        transform: scaleX(0.95);
    }

    50% {
        transform: scaleX(1);
        // opacity: 1;
    }

    100% {
        transform: scaleX(1);
    }
}

@keyframes grow-progress {
    from {
        transform: scaleX(0);
    }

    to {
        transform: scaleX(1);
    }
}

@keyframes clip {
    from {
        clip-path: circle(0% at 0 0);
    }

    to {
        clip-path: circle(100% at 0 0);
    }
}

.dark {
    background-color: #111;
    color-scheme: dark;
    // animation: clipDark 1s ease-out;
    transition: all 1s ease-in;
}

.light {
    background-color: #fff;
    color-scheme: light;
    // animation: clipLight 1s ease-out;
    transition: all 1s ease-in;

}

// ::view-transition-new(root) {
//     /* mix-blend-mode: normal; */
//     animation: clip .5s ease-in;
//     /* animation-duration: 2s; */
// }

// ::view-transition-old(root) {
//     animation: none;
// }

// ::view-transition-new(root) {
//     mix-blend-mode: normal;
//     animation: clip .5s ease-in;
// }

.menu-item {
    padding: 10px 20px;
    margin: 6px;
    margin-left: 20px;
    box-shadow: 0 0 3px 1px rgba(214, 236, 255, 0.8);
    border-radius: 4px;
    animation: listHidden var(--delay) ease-out;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        transform: translate(16px);
        background-color: rgba(214, 236, 255, 0.5);
        &+div{
            transform: translate(8px);
        }
    }
    &:has(+div:hover) {
        transform: translate(8px);
    }
}

.menu-active {
    background-color: rgba(214, 236, 255, 0.5);
}

@keyframes listHidden {
    0% {
        opacity: 0;
        transform: translate(-300px);
    }

    100% {
        opacity: 1;
        transform: translate(0px);
    }
}




@keyframes stickyScale {
    0% {
        transform: scale(1);
        // background-color: red;
    }

    100% {
        transform: scale(0.5);
        // background-color: blue;
    }
}
</style>