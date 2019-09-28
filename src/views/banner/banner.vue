<template>
  <div class="app-container">
    <div class="title">首页轮播图</div>

    <div class="imgBox" v-for="(item, index) in imgList" :key="index">
      <img class="imgs" :src="item.image" alt />
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
        <el-button type="danger" class="btn" @click="changeImg(item.id)">修改上传</el-button>
        <el-button type="danger" class="btn" @click="deleted(item.id)">删除</el-button>
      </div>
    </div>

    <div class="changeBox add">
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
      <el-button type="danger" class="btn" @click="addImg">新增图片</el-button>
    </div>
  </div>
</template>

<script>
import {
  getList,
  updataImg,
  changeList,
  addList,
  deleteImg
} from "@/api/table";

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      file: "",
      imgList: [],
      imgURl: ""
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
      var url = {
        banner_position_name: "top"
      };
      getList(url).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.imgList = res.data.ret;
        }
      });
    },
    //修改图片
    changeImg(ind) {
      var data = { id: ind, image: this.imgURl };
      changeList(data).then(res => {
        console.log(res);
        if (res.code == "1") {
          this.$message({
            message: res.msg,
            type: "success"
          });

          this.fetchData();
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    deleted(ind) {
      var data = { id: ind };
      deleteImg(data).then(res => {
        console.log(res);
        if (res.code == "1") {
          this.$message({
            message: res.msg,
            type: "success"
          });

          this.fetchData();
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    //新增图片
    addImg() {
      var data = { position_id: 1, image: this.imgURl };

      addList(data).then(res => {
        console.log(res);
        if (res.code == "1") {
          this.$message({
            message: res.msg,
            type: "success"
          });

          this.fetchData();
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    updataImg() {
      var img = "image";
      var data = {
        img: this.file
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
      // param.append("id", ind);
      updataImg(param).then(res => {
        console.log(res);
        if (res.code == "1") {
          console.log(res.image_path);
          this.file = "";
          this.imgURl = res.image_path;
          // var data = { id: ind, image: res.image_path };
          // this.fetchData();
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
      this.updataImg();
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
  min-height: 400px;
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
  .el-upload--picture-card {
    position: relative;
    top: 200px;
  }
}
.changeBox {
  display: inline-block;
  position: absolute;
  top: 120px;
  left: 65%;
  // background-color: palegoldenrod;
}
.add {
  position: relative;
  width: 100%;
  min-height: 400px;
  display: block;
  // background-color: #dfc3c3;
  margin: 10px auto;
  top: 0;
  left: 200px;
  .btn {
    margin: 10px 20px;
  }
}
.el-upload {
  margin-left: 400px;
}
</style>


