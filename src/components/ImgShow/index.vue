<template>
  <div
    class="img-box"
  >
    <img
      :src="imgUrl"
      alt=""
      class="img-default"
    >
    <i
      class="el-icon-zoom-in zoom-in-icon icon-display"
      @click="handlePictureCardPreview(imgUrl)"
    />
    <i
      class="el-icon-delete delete-icon icon-display"
      @click="handleEdit"
    />

    <el-dialog
      :visible.sync="dialogVisible"
      :modal="false"
    >
      <img
        width="100%"
        :src="dialogImageUrl"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: ''

    }
  },
  methods: {
    handleEdit() {
      this.$emit('handle')
    },
    handlePictureCardPreview(url) {
      this.dialogVisible = true
      this.dialogImageUrl = url
    }
  }
}
</script>

<style lang='scss'>
  .img-default{
       height: 100%;
       width: 100%;
        border-radius:5px ;
   }
   .icon-display{
     display: none;
   }
   .zoom-in-icon{
      position:absolute;
      z-index: 1;
      top:65px;
      left: 45px;
      color: #000000;
      font-size: 20px;
   }
   .delete-icon{
      position:absolute;
      z-index: 1;
      top:65px;
      left: 85px;
      color: #000000;
      font-size: 20px;
   }
  .img-box{
    position: relative;
    width: 148px;
    height:148px;
    border: 1px solid none;
     &:hover{
        cursor: pointer;
       .img-default{
        opacity:0.4;
        filter: alpha(opacity=60);
        background-color: rgba(0,0,0,0);

        }
       .icon-display{
         display: block;
       }

     }
  }
</style>
