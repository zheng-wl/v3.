<!--
 * @Autor: zwl
 * @Date: 2020-07-14 16:12:38
 * @LastEditors: zwl
 * @LastEditTime: 2020-07-14 17:14:52
--> 
<template>
  <div>
    <el-upload
      action="xxxx"
      list-type="picture-card"
      :on-success="uploadImg"
      :on-remove="handleRemove"
      :headers="headersData"
    >
      <i class="el-icon-plus" />
    </el-upload>
  </div>
</template>

<script>
// import { UserModule } from '@/store/modules/user'
import { getToken } from '@/utils/cookies'
export default {
  props: {
    fileList: {
      type: Array
    }
  },
  data() {
    return {
      disabled: false,
      headersData: {
        Authorization: getToken()
      }

    }
  },

  methods: {
    uploadImg(val) {
      this.$emit('handleUploadImg', val)
    },
    handleRemove(file) {
      this.$emit('handleRemoveImg', file)
    }
  }

}
</script>

<style>
</style>
