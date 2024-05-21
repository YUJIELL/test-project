<!--
 * @Date: 2024-04-16 16:32:01
 * @LastEditors: @yujie
 * @LastEditTime: 2024-05-11 15:37:45
 * @Description: 
-->
<template>
  <VueDraggable class="html-render" v-model="htmlList" :animation="150" :group="{name: 'g1', put: draggablePut}" @add="cloneSuccess"
    @update="onUpdate">
    <template v-for="value in modelValue" :key="value.id">
      <template v-if="value.name === 'form'">
        <div class="view-show component-shadow" @click.stop="componentsClick(value)">
          "form"
          <el-form v-bind="value.attributes">
            <htmlRender class="chosen-class form" v-model="value.children" @component-click="renderComponentClick"
              @success="cloneSuccess"></htmlRender>
          </el-form>
        </div>
      </template>
      <template v-else-if="value.name === 'formItem'">
        <div class="view-show" @click.stop="componentsClick(value)">
          "formItem"
          <div style="display: flex; align-items: center; gap: 10px">
            <el-tooltip class="box-item" effect="dark" :content="value.attributes.label" placement="top">
              <div class="form-item-label" style="width: 100px;overflow: hidden;text-wrap: nowrap;">
                {{ value.attributes.label }}
              </div>
            </el-tooltip>

            <htmlRender class="chosen-class formItem" v-model="value.children" @component-click="renderComponentClick"
              @success="cloneSuccess"></htmlRender>
          </div>
        </div>
      </template>
      <template v-else-if="value.name === 'ythSearchPanel'">
        <div class="view-show" @click.stop="componentsClick(value)">
          "{{ value.name }}"
          <div class="chosen-class" style="display: flex">
            <htmlRender style="width: 100%; display: flex; gap: 10px; flex-wrap: wrap" v-model="value.children"
              :parentName="value.name" @component-click="renderComponentClick" @success="cloneSuccess">
              <div style="width: 24%; flex: 1; text-align: right; margin-top: 10px">
                <el-button type="primary">查询</el-button>
                <el-button type="primary" plain>重置</el-button>
              </div>
            </htmlRender>
          </div>
        </div>
      </template>
      <template v-else-if="value.name === 'filterTable'">
        <div class="view-show" @click.stop="componentsClick(value)">
          "filterTable-searchForm"
          <div class="chosen-class" style="display: flex">
            <htmlRender style="width: 100%; display: flex; gap: 10px; flex-wrap: wrap" v-model="value.children"
              :parentName="value.name" @component-click="renderComponentClick" @success="cloneSuccess">
              <div style="width: 24%; flex: 1; text-align: right; margin-top: 10px">
                <el-button type="primary">查询</el-button>
                <el-button type="primary" plain>重置</el-button>
              </div>
            </htmlRender>
          </div>
        </div>
        <div class="view-show component-shadow" @click.stop="componentsClick(value)">
          "filterTable-table"
          <div style="height: 100px"
            :style="{ height: value.attributes.height, 'max-height': value.attributes.maxHeight }">
            <htmlRender class="chosen-class" style="display: flex; justify-content: flex-start"
              v-model="value.otherChildren" @component-click="renderComponentClick" @success="cloneSuccess">
            </htmlRender>
          </div>
        </div>
      </template>
      <template v-else-if="value.name === 'contentPage' || value.name === 'contentBlock'">
        <div class="view-show" @click.stop="componentsClick(value)">
          "{{ value.name }}"
          <div v-if="value.name === 'contentBlock'" class="content-block">
            <span style="margin-left: 12px">{{ value.attributes.title }}</span>
          </div>
          <htmlRender class="chosen-class" v-model="value.children" @component-click="renderComponentClick"
            @success="cloneSuccess"></htmlRender>
        </div>
      </template>
      <template v-else-if="value.name === 'radioGroup' || value.name === 'checkboxGroup'">
        <div class="view-show" @click.stop="componentsClick(value)">
          "{{ value.name }}"
          <htmlRender class="chosen-class" style="display: flex; justify-content: flex-start; gap: 10px"
            :style="{ 'flex-direction': value.attributes.inline ? 'row' : 'column' }" v-model="value.children"
            @component-click="renderComponentClick" @success="cloneSuccess"></htmlRender>
        </div>
      </template>
      <template v-else-if="value.name === 'radio' || value.name === 'checkbox'">
        <div class="shade radio" @click.stop="componentsClick(value)"></div>
        <el-radio style="margin-left: 12px" v-bind="value.attributes"></el-radio>
      </template>
      <template v-else-if="value.name === 'row'">
        <div class="view-show component-shadow" @click.stop="componentsClick(value)">
          "row"
          <el-row class="chosen-class">
            <htmlRender style="width: 100%; display: flex; flex-wrap: wrap" v-model="value.children"
              @component-click="renderComponentClick" @success="cloneSuccess"></htmlRender>
          </el-row>
        </div>
      </template>
      <template v-else-if="value.name === 'col'">
        <el-col :span="toNumber(value.attributes.span)" :offset="value.attributes.offset"
          @click.stop="componentsClick(value)">
          "col"
          <div class="chosen-class" style="width: 100%">
            <htmlRender v-model="value.children" @component-click="renderComponentClick" @success="cloneSuccess">
            </htmlRender>
          </div>
        </el-col>
      </template>
      <template v-else-if="value.name === 'table'">
        <div class="view-show component-shadow" @click.stop="componentsClick(value)">
          "table"
          <div style="height: 100px"
            :style="{ height: value.attributes.height, 'max-height': value.attributes.maxHeight }">
            <htmlRender class="chosen-class table" style="display: flex; justify-content: flex-start" v-model="value.children"
              @component-click="renderComponentClick" @success="cloneSuccess"></htmlRender>
          </div>
        </div>
      </template>
      <template v-else-if="value.name === 'tableColumn'">
        <div class="view-show" @click.stop="componentsClick(value)">
          <div style="color: #909399; padding: 12px 0; border-bottom: 1px solid #dcdfe6"
            :style="{ 'text-align': value.attributes.headerAlign }">
            {{ value.attributes.label }}
          </div>
          <div class="chosen-class table-column" style="min-width: 50px;min-height: 40px;" :style="{ 'text-align': value.attributes.align }">
            <htmlRender v-model="value.children" @component-click="renderComponentClick" @success="cloneSuccess">
            </htmlRender>
          </div>
        </div>
      </template>
      <div v-else @click.stop="componentsClick(value)">
        <template v-if="value.name === 'input'">
          <div class="search-form-item">
            <div class="shade"></div>
            <span v-if="parentName === 'ythSearchPanel' || parentName === 'filterTable'">{{ value.attributes.formLabel
              }}：</span>
            <el-input v-bind="value.attributes"></el-input>
          </div>
        </template>
        <template v-if="value.name === 'select'">
          <div class="search-form-item">
            <div v-if="parentName === 'ythSearchPanel' || parentName === 'filterTable'" class="shade"></div>
            <span>{{ value.attributes.formLabel }}：</span>
            <el-select v-bind="value.attributes"></el-select>
          </div>
        </template>
        <div v-if="value.name === 'datePicker'">
          <div class="search-form-item">
            <div class="shade"></div>
            <span v-if="parentName === 'ythSearchPanel' || parentName === 'filterTable'">{{ value.attributes.formLabel
              }}：</span>
            <el-date-picker v-bind="value.attributes"></el-date-picker>
          </div>
        </div>
        <div v-else-if="value.name === 'button'">
          <el-button v-bind="value.attributes"></el-button>
        </div>
        <div v-else-if="value.name === 'switch'">
          <el-switch v-bind="value.attributes"></el-switch>
        </div>
        <div v-else-if="value.name === 'link'">
          <el-link v-bind="value.attributes"></el-link>
        </div>
        <div v-else-if="value.name === 'pagination'" class="pagination">
          <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
            :page-sizes="value.attributes.pageSizes" :small="value.attributes.small"
            :disabled="value.attributes.disabled" :background="value.attributes.background"
            :layout="value.attributes.layout" :total="value.attributes.total" @size-change="value.attributes.sizeChange"
            @current-change="value.attributes.currentChange" />
        </div>
      </div>
    </template>
    <slot></slot>

    <!-- </div> -->
  </VueDraggable>
</template>

<script setup>
import { VueDraggable, vDraggable } from 'vue-draggable-plus'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: Array,
  parentName: String
})
const currentPage = ref(1)
const pageSize = ref(10)
const htmlList = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})
const emits = defineEmits(['component-click', 'success', 'order-update'])

function componentsClick(params) {
  emits('component-click', params)
}
function renderComponentClick(params) {
  emits('component-click', params)
}
function toNumber(params) {
  return Number(params)
}
function cloneSuccess(data) {
  emits('success', data)
}
function cloneStart(params) {
  console.log(333, params);
}
function onUpdate() {
  emits('order-update')
}

function draggablePut(to, from, dragEl, event) {
  if (dragEl.innerText === 'tableColumn') {
    return to.el.className.includes('table')
  }
  return true
}

</script>

<style lang="less" scoped>
.view-show {
  // border: 1px dashed #42b883;
  border-radius: 4px;
  min-height: 40px;
  padding: 6px;
}

.component-shadow {
  // padding: 12px 8px;
  // box-shadow: 0 0 2px 1px #ddd;
}

.form-item-label {
  background-color: rgb(66 184 131);
  color: #fff;
  text-align: center;
  padding: 10px 0;
}

.shade {
  position: absolute;
  width: 100%;
  height: 32px;
  z-index: 1;
}

.radio {
  min-width: 100px;
  box-shadow: 0 0 2px 1px #ddd;
  border-radius: 3px;
}

.draggable-box {}

.chosen-class {
  width: 96%;
  min-height: 36px;
  border-radius: 4px;
  border: 1px dashed #42b883;
  padding: 4px;
  box-sizing: border-box;
}
.table-column{
  position: relative;
  &::before{
    content: '内容';
    color: #aaa;
    position: absolute;
    top: 4px;
    left: 4px;
  }
}

.content-block {
  border-left: 4px solid #2178d5;
  height: 20px;
  margin: 6px 6px 6px 0;
}

.search-form-item {
  position: relative;
  display: flex;
  align-items: center;
}
</style>
