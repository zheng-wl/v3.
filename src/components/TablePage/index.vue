<!--
 * @Autor: zwl
 * @Date: 2020-07-14 15:13:05
 * @LastEditors: zwl
 * @LastEditTime: 2020-07-14 17:15:32
--> 
<template>
  <div class="table-page">
    <!-- table start -->
    <el-table
      ref="multipleTable"
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="tableData"
      :row-key="getRowKey"
      border
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="isSelect"
        type="selection"
        width="55"
        align="center"
        :reserve-selection="true"
      />
      <el-table-column
        v-for="(col, i) in columns"
        :key="i"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        align="center"
      >
        <template
          slot-scope="scope"
        >
          <div v-if="col.type==='img'">
            <LoadingImg
              :img-url="scope.row[col.prop]"
              style="max-height:100px"
            />
          </div>
          <div v-else-if="col.type==='custom'">
            <slot
              :default="scope.row"
              name="default"
            />
          </div>
          <div v-else>
            {{ scope.row[col.prop] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="300"
      >
        <template slot-scope="scope">
          <slot
            :other="scope.row"
            name="other"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <!-- page start -->
    <Pagination
      :total="pageData.total"
      :page="pageData.page"
      :limit="pageData.limit"
      @update:page="UpdatePage"
      @update:limit="UpdateLimit"
    />
    <!-- page end -->
  </div>
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import LoadingImg from '@/components/LoadingImg/index.vue'
import Pagination from '@/components/Pagination/index.vue'
export default {
  components: { Pagination, LoadingImg },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    pageData: {
      type: Object,
      default: () => { return { total: 100, limit: 10, page: 1 } }
    },
    loading: {
      type: Boolean,
      default: false
    },
    isSelect: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    // const columns = [{ label: 'id', prop: 'id' }, { label: '姓名', prop: 'name' }, { label: '图片', prop: 'img', type: 'img' }, { label: '自定义', prop: 'img', type: 'custom' }]
    const state = reactive({
      //   tableData: [{ id: 1, name: '小明', img: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg' }, { id: 2, name: '2' }],
    })
    const getRowKey = val => val.id
    const handleSelectionChange = val => {
      context.emit('handleSelect', val)
    }
    const UpdatePage = val => {
      context.emit('handlePage', val)
    }
    const UpdateLimit = val => {
      context.emit('handleLimit', val)
    }
    const handleClearSelect = () => {
      if (context.refs.multipleTable) {
        context.refs.multipleTable.clearSelection()
      }
    }
    return {
      ...toRefs(state),
      getRowKey,
      handleSelectionChange,
      UpdatePage,
      UpdateLimit,
      handleClearSelect
    }
  }
}
</script>
<style lang='scss' scoped>
.table-page{
  margin-top: 20px;
}
</style>
