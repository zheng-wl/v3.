<template>
  <el-form
    ref="ruleForm"
    :model="state.ruleForm"
    :rules="rules"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item
      v-for="(item, i) in formItem"
      :key="i"
      :label="item.label"
      :prop="item.prop"
    >
      <el-col
        v-if="item.type==='select'"
      >
        <el-select
          v-model="state.ruleForm[item.prop]"
          :placeholder="item.placeholder?item.placeholder:'请选择'"
          @change="item.change==='1'?handleChange(state.ruleForm):null"
          clearable
        >
          <el-option
            v-for="items in item.options"
            :key="items.value"
            :label="items.label"
            :value="items.value"
          />
        </el-select>
      </el-col>
      <el-col
        v-else-if="item.type==='radio'"
      >
        <el-radio
          v-for="radioItem in item.options"
          :key="radioItem.value"
          v-model="state.ruleForm[item.prop]"
          :label="radioItem.value"
        >
          {{ radioItem.label }}
        </el-radio>
      </el-col>
      <el-col v-else-if="item.type==='uploadImg'">
        <ImgShow
          v-if="state.ruleForm[item.prop]"
          :img-url="state.ruleForm[item.prop]"
          @handle="handleAgainUpload(item.prop)"
        />
        <UploadImgs
          v-else
          @handleUploadImg="(val) => handleUploadImg(val,item.prop)"
        />
        <span v-if="item.message">{{ item.message }}</span>
      </el-col>
      <el-col v-else-if="item.type==='tinymce'">
        <Tinymce v-model="state.ruleForm[item.prop]" />
      </el-col>
      <el-col v-else-if="item.type==='switch'">
        <el-switch
          v-model="state.ruleForm[item.prop]"
          :active-value="0"
          :inactive-value="1"
        />
      </el-col>
      <el-col
        v-else
      >
        <el-input
          v-model="state.ruleForm[item.prop]"
          :placeholder="item.placeholder?item.placeholder:'请填写'"
          :style="item.style"
        />
      </el-col>
    </el-form-item>
  </el-form>
</template>
<script>
import { reactive, watch } from '@vue/composition-api'
import Tinymce from '@/components/Tinymce/index.vue'
import UploadImgs from '@/components/Upload/uploadImgs.vue'
import ImgShow from '@/components/ImgShow/index.vue'
import { settings, isEmpty } from '@/utils/fun.ts'
export default {
  components: { Tinymce, UploadImgs, ImgShow },
  props: {
    editData: {
      default: () => { return {} },
      type: Object
    },
    rules: {
      default: () => { return {} },
      type: Object
    },
    formItem: {
      default: () => [],
      type: Array
    }
  },
  setup(props, context) {
    const state = reactive({
      ruleForm: {},
      imgBaseUrl: settings.imgBaseUrl
    })
    const handleSubmit = async(resolve) => {
      try {
        await context.refs.ruleForm.validate()
        const data = { data: state.ruleForm }
        return data
      } catch (err) {
        context.root.$message({ message: '请填写正确填写表单', type: 'error' })
        return false
      }
    }
    const handleAgainUpload = (key) => {
      state.ruleForm[key] = ''
    }
    const handleUploadImg = (val, key) => {
      state.ruleForm[key] = state.imgBaseUrl + val.data.id
    }
    state.ruleForm = Object.assign({}, props.editData)
    const handleChange = (val) => {
      context.emit('handleSelect', val)
    }
    watch(
      () => props.editData,
      (newVal) => {
        if (!isEmpty(newVal)) {
          state.ruleForm = Object.assign({}, props.editData)
        } else {
          if (context.refs.ruleForm) {
            context.refs.ruleForm.resetFields()
          }
          state.ruleForm = {}
        }
      },
      {
        lazy: true
      }
    )
    return {
      state,
      handleSubmit,
      handleAgainUpload,
      handleUploadImg,
      handleChange
    }
  }

}
</script>
<style >

</style>
