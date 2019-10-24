<template>
  <div class="app-container">
    <div class="title">其他图片增添</div>
    <div class="imgBox" v-for="(item, index) in imgList" :key="index">
      <div class="tite">{{item.pos_id==2?'中部图片':item.pos_id==3?'中右部图片':'底部图片'}}</div>
      <img class="imgs" :src="item.img" alt />
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
      </div>
    </div>
  </div>
</template>

<script>
import { getList, changeList, updataImg } from "@/api/table";

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
      this.imgURl = "";
      var url1 = {
        banner_position_name: "center"
      };
      var url2 = {
        banner_position_name: "center-right"
      };
      var url3 = {
        banner_position_name: "right-bottom"
      };
      this.getImg(url1);
      this.getImg(url2);
      this.getImg(url3, 2);
    },
    getImg(url, ind) {
      getList(url).then(res => {
        console.log(res);
        if (res.code == 1) {
          var da = res.data.ret[0];
          var obj = {
            id: da.id,
            img: da.image,
            pos_id: da.position_id
          };
          this.imgList.push(obj);
          if (ind === 2) {
            var da2 = res.data.ret[1];
            var obj2 = {
              id: da2.id,
              img: da2.image,
              pos_id: da2.position_id
            };
            this.imgList.push(obj2);
          }
        }
      });
    },
    //修改图片
    changeImg(ind) {
      var data = { id: ind, image: this.imgURl };
      if (!this.imgURl) {
        this.$message({
          message: "请选择图片",
          type: "error"
        });
        return;
      }
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
  .tite {
    text-align: center;
    margin: 10px auto;
    font-size: 18px;
  }
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


