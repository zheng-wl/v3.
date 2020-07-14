<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      :limit="1"
      :file-list="fileList"
      :on-change="uploadImg"
      :class="{'upload-hide': fileList.length!=1?false:true}"
    >
      <i
        slot="default"
        class="el-icon-plus"
      />
      <div
        slot="file"
        slot-scope="{file}"
      >
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          alt=""
        >
        <span class="el-upload-list__item-actions">
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    fileList: {
      type: Array
    }
  },
  data() {
    return {
      disabled: false

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
