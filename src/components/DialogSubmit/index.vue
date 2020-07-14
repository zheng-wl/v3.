<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="isSubmitDialog"
      width="30%"
      :before-close="() => this.$emit('handleCancel', false)"
       v-loading="loading"
      element-loading-text="拼命提交中"
    >

        <span>{{ text }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handle()">取 消</el-button>
          <el-button
            type="primary"
            @click="handle(true)"
          >确 定</el-button>
        </span>

    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isSubmitDialog: {
      type: Boolean
    },
    loading: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: '你确定要提交'
    }
  },

  methods: {
    handle(val) {
      val ? this.$emit('handleSure', false) : this.$emit('handleCancel', false)
    }

  }
}
</script>

<style>
</style>
