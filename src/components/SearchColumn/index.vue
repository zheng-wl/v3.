<!--
 * @Autor: zwl
 * @Date: 2020-07-08 17:01:22
 * @LastEditors: zwl
 * @LastEditTime: 2020-07-10 09:53:45
-->
<template>
  <el-row class="search-column-box">
    <span
      v-for="(item,i) in searchArr"
      :key="i"
      style="margin-right:10px;"
    >
      <el-input
        v-if="item.type==='text'"
        v-model="searchData[item.name]"
        style="width:200px"
        :placeholder="item.placeholder?item.placeholder:'请填写'"
        @input="item.auto==='1'?handleSearchName():null"
      />
      <el-select
        v-else-if="item.type==='select'"
        v-model="searchData[item.name]"
        :placeholder="item.placeholder?item.placeholder:'请选择'"
        clearable
      >
        <el-option
          v-for="items in item.options"
          :key="items.value"
          :label="items.label"
          :value="items.value"
        />
      </el-select>
      <el-date-picker
        v-else
        v-model="searchData[item.name]"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        @change="(e) => handleDate(e,item)"
      />
    </span>
    <el-button
      type="primary"
      @click="handleSearch"
    >
      查询
    </el-button>
  </el-row>
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import { _Debounce } from '@/utils/fun.ts'
export default {
  props: {
    searchArr: {
      default: () => [],
      type: Array
    }
  },

  setup(props, context) {
    const state = reactive({
      // searchArr: [
      //   { type: 'text', name: 'names', placeholder: '请填写', import: '1' },
      //   { type: 'select', name: 'type', options: [{ value: '1', label: '1' }, { value: '2', label: '2' }] },
      //   { type: 'select', name: 'type1', options: [{ value: '4', label: '4' }, { value: '5', label: '5' }], placeholder: '请填写' },
      //   { type: 'date', name: 'date', name1: 'sdates', name2: 'edate' }
      // ],
      searchData: {}
    })
    const handleDate = (val, item) => {
      if (val) {
        state.searchData[item.name1] = val[0]
        state.searchData[item.name2] = val[1]
      } else {
        state.searchData[item.name1] = ''
        state.searchData[item.name2] = ''
      }
    }
    const handleSearch = () => {
      context.emit('handle', state.searchData)
    }
    const handleSearchName = _Debounce(handleSearch, '500')
    return {
      ...toRefs(state),
      handleSearchName,
      handleSearch,
      handleDate
    }
  }
}
</script>
<style lang='scss' scoped>
.search-column-box{
  display: flex;
}
</style>
