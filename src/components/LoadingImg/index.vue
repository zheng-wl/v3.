<template>
  <el-image
    :src="imgUrl"
    fit="cove"
    lazy
    :preview-src-list="srcList"
    @click="handleSeeImg(imgUrl)"
  >
    <div
      slot="placeholder"
      class="image-slot"
    >
      <div
        v-loading="loading2"
        style="width:80px;height:100px"
      />
    </div>
    <div
      slot="error"
      class="image-slot"
    >
      <i class="el-icon-picture-outline" />
      暂无图片
    </div>
  </el-image>
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
export default {
  props: {
    imgUrl: String
  },
  setup() {
    const state = reactive({
      srcList: [],
      loading2: true
    })
    const handleSeeImg = (val) => {
      state.srcList = []
      state.srcList.push(val)
    }
    return {
      ...toRefs(state),
      handleSeeImg
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
