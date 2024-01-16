<template>
    <div>
        <div v-for="(category, categoryIndex) in nodeList" :key="category.title" class="checked-box">
            <span>{{ category.title }}</span>
            <div class="checked-item" v-for="(spec, specIndex) in category.list" :key="specIndex"
                :class="{ 'default': !spec.disabled && !spec.checked, 'disabled': spec.disabled, 'active': spec.checked }"
                @click="checkedChange(spec, categoryIndex, specIndex)">{{ spec.name }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, watch, onMounted } from 'vue';
import Adjoin from '@/utils/adjoin.js';
import { cloneDeep } from 'lodash';

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: Array,
    data: Array,
    disabledList: Array,
    combination: Array
})
const { modelValue, data, disabledList, combination } = toRefs(props)

const nodeList = ref([])
const checkedList = ref([])

watch(modelValue, (newVal) => {
    checkedList.value = newVal
}, {
    immediate: true
})
watch(disabledList, (newVal) => {

}, {
    immediate: true
})
nodeList.value = cloneDeep(data.value).map(element => {
    const { title, list } = element
    const newList = list.map(item => {
        return {
            name: item,
            disabled: false,
            checked: false
        }
    })
    return {
        title,
        list: newList
    }
});
// 创建矩阵
const adjoin = new Adjoin(data.value)
watch(combination, (newVal) => {
    // 根据库存设置关联
    adjoin.setAllVertexRelevance(newVal)
    // 获取所有可用库存节点
    const availableAll = adjoin.getAvailableAll()
    setDisable(availableAll)
}, {
    immediate: true
})

function setChecked(categoryIndex, specIndex, checked) {
    nodeList.value[categoryIndex].list[specIndex].checked = checked
}

function setDisable(availableList) {
    nodeList.value.forEach(element => {
        element.list.forEach(spec => {
            spec.disabled = !availableList.includes(spec.name)
        });
    });
}


function checkedChange(val, categoryIndex, specIndex) {
    const {name, disabled} = val
    if (!disabled) {
        // 同级节点：同级可选
        const categoryList = nodeList.value[categoryIndex].list.map(item => item.name)
        let checked = false;
        if (checkedList.value.includes(name)) {
            const index = checkedList.value.findIndex(item => item === val)
            checkedList.value.splice(index, 1)
            checked = false
        } else {
            checkedList.value.push(name)
            checked = true
            nodeList.value[categoryIndex].list.forEach(element => {
                if (element.name !== name) {
                    element.checked = false
                }
            });
            categoryList.forEach(element => {
                if (element !== name && checkedList.value.includes(element)) {
                    const index = checkedList.value.findIndex(item => item === element)
                    checkedList.value.splice(index, 1)
                }
            });
        }
        setChecked(categoryIndex, specIndex, checked)
        // 获取可选节点
        const availableList = adjoin.getAvailableAllByVertex(checkedList.value)
        setDisable(availableList)
    }

    emits('update:modelValue',checkedList.value)
}
</script>

<style scoped>
.checked-box {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 20px;
    color: #454d64;

    .checked-item {
        width: 100px;
        height: 36px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .default {
        color: #454d64;
        border: 1px solid #ddd;
        background-color: #ddd;
    }

    .active {
        border: 1px solid #4169e1;
        background-color: #4169e1;
        color: #fff;
    }

    .disabled {
        color: #bbb;
        background-color: #ddd;
        border: 1px solid #ddd;
        
    }
}
</style>