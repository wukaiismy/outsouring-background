<template>
  <div class="app-container">
    <div class="title">其他图片增添</div>
    <div class="imgBox" v-for="(item, index) in imgList" :key="index">
      <img class="imgs" :src="'/website/media/'+item" alt />
      <div class="changeBox">
        <el-upload
          action="/backstage/update_cm/"
          list-type="picture-card"
          :on-change="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :limit="1"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-button type="danger" class="btn" @click="changeImg(index+1)">修改上传</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getList, changeList } from "@/api/table";

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      file: "",
      imgList: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 先获取之前的轮播图
    fetchData() {
      this.listLoading = true;
      this.imgList = [];
      getList(2).then(res => {
        console.log(res);
        var imgLists = res.data.ret[0];
        this.imgList.push(imgLists.img1);
        this.imgList.push(imgLists.img2);
        this.imgList.push(imgLists.img3);
        this.imgList.push(imgLists.img4);
      });
    },
    //修改图片
    changeImg(ind) {
      var img = "image" + ind;
      var data = {
        img: this.file,
        id: 2
      };
      if (!this.file) {
        this.$message({
          message: "请选择图片后再上传",
          type: "warning"
        });
        return;
      }
      var param = new FormData();
      param.append(img, this.file);
      param.append("id", 2);
      var Url = "/website/backstage/update_cm2/";
      changeList(Url, param).then(res => {
        console.log(res);
        if (res.code == "200") {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.file = "";
          this.fetchData();
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.file = file.raw;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.title {
  font-size: 36px;
  color: palevioletred;
  margin: 20px auto;
}
.imgBox {
  width: 100%;
  height: 400px;
  padding: 50px 0 0 50px;
  background-color: #f9f9f9;
  margin-bottom: 50px;
  position: relative;
  text-align: left;
  .imgs {
    width: 60%;
    // height: 400px;
  }
  .content {
    display: inline-block;
    font-size: 28px;
    line-height: 100%;
    margin: 40px auto;
    position: relative;
    top: -200px;
    text-align: center;
  }
  .btn {
    position: relative;
    top: 10px;
    left: 0px;
  }
}
.changeBox {
  display: inline-block;
  position: absolute;
  top: 120px;
  left: 65%;
  // background-color: palegoldenrod;
}
.el-upload {
  margin-left: 400px;
}
</style>


