<!--
 * @Autor: zwl
 * @Date: 2020-07-14 15:13:05
 * @LastEditors: zwl
 * @LastEditTime: 2020-07-14 17:22:28
--> 
<template>
    <div>
    <!-- search start -->
        <SearchColumn
        :search-arr="state.searchArr"
        @handle="handleSearch"
        />
    <!-- search end -->
    <el-divider></el-divider>
    <!-- operation start -->
    <el-row>
      <el-button
        type="primary"
        @click="handleEdit()"
      >
        新增
      </el-button>
      <el-button
        type="danger"
        @click="handleDelete()"
      >
        批量删除
      </el-button>
      <!-- <el-button
        type="info"
        @click="handleExport"
      >
        导出
      </el-button> -->
    </el-row>
    <!-- operation end -->
    <!-- tablePage start -->
    <TablePage
      ref='table'
      :columns="state.columns"
      :table-data="state.tableData"
      :page-data="state.pageData"
      :loading="state.loading"
      @handlePage="handlePage"
      @handleLimit="handleLimit"
      @handleSelect="handleSelect"
    >
      <template v-slot:default="defaultProps">
        <el-switch :active-value='1' :inactive-value='0' v-model="defaultProps.default.status" ></el-switch>
      </template>
      <template v-slot:other="otherProps">
        <el-button
          type="primary"
          size="mini"
          @click="handleEdit(otherProps)"
        >
          编辑
        </el-button>
        <el-button
          type="danger"
          size="mini"
          @click="handleDelete(otherProps)"
        >
          删除
        </el-button>
      </template>
    </TablePage>
    <!-- tablePage end -->
     <!-- dialog delete start -->
    <DialogDelete
      :is-delete-dialog="state.isDeleteDialog"
      @handleSure="handleDeleteSure"
      @handleCancel="handleDeleteCancel"
    />
    <!-- dialog delete end -->
    </div>
</template>

<script lang='ts'>
import { reactive, defineComponent } from '@vue/composition-api'
import SearchColumn from '@/components/SearchColumn/index.vue'
import TablePage from '@/components/TablePage/index.vue'
import DialogDelete from '@/components/DialogDelete/index.vue'
const searchArr: any = [
  { type: 'text', name: 'teacherName', placeholder: '请填写教师姓名', auto: '1' },
  { type: 'text', name: 'loginName', placeholder: '请输入手机号' },
  { type: 'select', name: 'orgId', options: [{value:'机构一',label:'机构一'}], placeholder: '请选择机构名称' },
  { type: 'date', name: 'date', name1: 'sdate', name2: 'edate' }
]
export interface IStateType {
  searchArr: any
  columns: any
  tableData: any
  loading: boolean
  pageData: any
  searchData: any
  tableSelect: any
  isDeleteDialog: boolean
}
const columns: any = [
  { label: '教师姓名', prop: 'teacherName' },
  { label: '教师头像', prop: 'portraitUrl', type: 'img' },
  { label: '手机号', prop: 'loginName' },
  { label: '学校机构', prop: 'orgName' },
  { label: '排序号', prop: 'serialNumber' },
  { label: '更新时间', prop: 'updateDate' },
  { label: '状态', prop: 'updateDate', type:'custom'},
  { label: '创建人', prop: 'createName' }
]
export default defineComponent({
    setup(props,context){
        const state: IStateType = reactive({
            searchArr,
            searchData: {},
            columns,
            tableData: [],
            loading: false,
            pageData: { total: 100, limit: 10, page: 1 },
            tableSelect: [],
            isDeleteDialog: false
        })
        const handleListApi = (val: any) =>{
            state.tableData =[{id:1 ,teacherName:'小1', status: 1 }]
        }
        const handleSearch = (val: any) =>{
            state.searchData = Object.assign(state.searchData, val)
            console.log(state.searchData)
        }
        const handleEdit =(val: any) =>{
            console.log('执行了')
            context.root.$router.push({ name: 'edit', query: { id: (val ? val.other.id : null) } })
        }
        const handleDelete =(val: any)=>{
            if (val) {
                state.tableSelect = [val.other]
            }
            if (!state.tableSelect.length) {
                context.root.$message({ message: '请选择要删除的教师', type: 'error' })
                return
            }
            state.isDeleteDialog = true
        }
        const handleDeleteSure =()=>{
            console.log(state.tableSelect,'删除的数组---->')
            state.isDeleteDialog = false
        }
        const handleDeleteCancel =()=>{
             state.isDeleteDialog = false
             context.refs.table.handleClearSelect()
        }
        const handlePage = (val: number) => {
            state.searchData.page = val
            handleListApi(state.searchData)
            console.log(val,'page------------->')
        }
        const handleLimit =(val: number)=> {
            state.searchData.pageSize = val
            console.log(val,'limit ------------>')
        }
        const handleSelect=(val: any) =>{
            state.tableSelect = val
        }
        return {
            state,
            handleSearch,
            handlePage,
            handleDelete,
            handleEdit,
            handleLimit,
            handleSelect,
            handleDeleteSure,
            handleDeleteCancel
        }       
    },
    components:{SearchColumn, TablePage, DialogDelete}
})
</script>

<style lang="scss">

</style>