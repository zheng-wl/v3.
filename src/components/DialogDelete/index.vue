<template>
  <div>
    <el-dialog
      title="删除"
      :visible.sync="isDeleteDialog"
      width="30%"
      :before-close="() => this.$emit('handleCancel', false)"
    >
      <span>{{ text }}</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
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
    isDeleteDialog: {
      type: Boolean
    },
    text: {
      type: String,
      default: '你确定要删除'
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
