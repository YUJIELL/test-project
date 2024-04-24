<!--
 * @Date: 2023-11-22 10:00:22
 * @LastEditors: @yujie
 * @LastEditTime: 2024-02-29 09:51:24
 * @Description: 
-->
<template>
    <div>
        <div class="appBar">
            <div class="tool tool-left">
                <div class="left-icon">
                    <el-icon>
                        <ArrowLeftBold />
                    </el-icon>
                </div>
            </div>
            <h2 class="title">我是标题我是标题我是标题我是标题我是标题</h2>
            <div class="tool tool-right">
                <el-button link type="primary">更多</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.appBar {
    display: flex;
    align-items: center;
    margin: 10px;
    padding: 0 8px;
    gap: 4px;
    width: 360px;
    height: 40px;
    white-space: nowrap;
    background-color: #fff;
    color: #191919;
    box-shadow: 0 0 0px 2px #d6ecff;
    border-radius: 4px;

    .title {
        font-weight: normal;
        font-size: 18px;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .tool {
        display: flex;
        flex: 1;
        font-size: 14px;
        align-items: center;
    }

    .tool-left {
        cursor: pointer;

        .left-icon {
            width: 20px;
        }
    }

    .tool-right {
        justify-content: end;
    }
}
</style>