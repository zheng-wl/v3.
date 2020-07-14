<!--
 * @Autor: zwl
 * @Date: 2020-07-14 17:05:13
 * @LastEditors: zwl
 * @LastEditTime: 2020-07-14 17:24:05
--> 
<template>
  <el-card>
    <FormSummary
      ref="formSummary"
      :form-item="state.formItem"
      :rules="state.rules"
      :edit-data="state.editData"
    />
    <div class="edit-footer">
      <el-button
        type="primary"
        @click="handleSubmit"
      >
        提交
      </el-button>
    </div>
  </el-card>
</template>
<script>
import FormSummary from '@/components/FormSummary/index.vue'
import { reactive } from '@vue/composition-api'
import { _SelectArr, _SpecialBox } from '@/utils/fun.ts'
import { baseRulesObj } from '@/utils/validatecom'
export default {
  setup(props, context) {
    const role = [{ value: '1', label: '校长' }, { value: '2', label: '客服顾问' }, { value: '3', label: '教师' }]
    const workType = [{ value: 1, label: '全职' }, { value: 2, label: '兼职' }]
    const inputWidth = 'width:217px'
    const state = reactive({
      formItem: [
        { label: '教师姓名', prop: 'teacherName', style: inputWidth },
        { label: '教师头像', prop: 'portraitUrl', type: 'uploadImg' },
        { label: '学校机构', prop: 'orgId', type: 'select', options: [] },
        { label: '手机号码', prop: 'loginName', style: inputWidth },
        { label: '角色', prop: 'role', type: 'select', options: role },
        { label: '教学舞种', prop: 'dances', style: inputWidth },
        { label: '教龄', prop: 'experience', style: inputWidth },
        { label: '工作性质', prop: 'workType', type: 'radio', options: workType },
        { label: '底薪', prop: 'basePay', style: inputWidth },
        { label: '责任课时', prop: 'minClassCount', style: inputWidth },
        { label: '课时时长/分钟', prop: 'lengthClass', style: inputWidth },
        { label: '超出责任课时单价/元', prop: 'univalent', style: inputWidth },
        { label: '排序号', prop: 'serialNumber', style: inputWidth },
        { label: '内容详情', prop: 'content', type: 'tinymce' }
      ],
      rules: baseRulesObj(['teacherName', 'role', 'loginName', 'orgId']),
      editData: {}
    })
    const getOrganization = ()=>{
        state.formItem[2].options=[{value:'机构一',label:'机构一'}]
    }
    getOrganization()
    const handleSubmit = async() => {
      const data = await context.refs.formSummary.handleSubmit()
      if (data) {
        data.data.content = data.data.content ? _SpecialBox(data.data.content) : ''
        console.log(data.data,'提交的数据')
        // await saveTeacherApi(data.data)
        // context.root.$router.push({ name: 'baseTeacherList' })
      }
    }
    const editId = context.root.$route.query.id
    if (editId) {
      const obj = { id: editId }
      //getTeacher(obj)
      state.editData={teacherName:'小北'}
    }
    return {
      state,
      handleSubmit
    }
  },
  components: { FormSummary }
}
</script>
<style  lang='scss' scoped>
.edit-footer{
  text-align: right;
}
</style>
