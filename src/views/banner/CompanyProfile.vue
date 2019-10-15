<template>
  <div>
    <div class="title">公司简介</div>
    <div class="gaird"></div>
    <el-form label-width="80px">
      <el-form-item label="主标题">
        <el-input style="width: 500px;" v-model="parmsData.main_title"></el-input>
      </el-form-item>
      <el-form-item label="副标题">
        <el-input style="width: 500px;" v-model="parmsData.subtitle"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" style="width: 500px;" :rows="7" v-model="parmsData.content"></el-input>
      </el-form-item>

      <el-button type="primary" @click="submitForm()">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import { getMsg, updataImg } from "@/api/table";
export default {
  name: "CompanyProfile",
  data() {
    return {
      parmsData: {},
      imageUrl: "",
      listLoading: true
    };
  },
  created() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      this.listLoading = true;

      var basicURL = "/yanghua_edu/api/other_module/company_profile/";
      getMsg("get", basicURL).then(res => {
        console.log(res);
        this.listLoading = false;
        if (res.code == 1) {
          this.parmsData = res.data;
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    },
    submitForm() {
      console.log(this.parmsData);
      this.listLoading = true;
      var basicURL = "/yanghua_edu/api/other_module/company_profile/";
      getMsg("POST", basicURL, this.parmsData).then(res => {
        console.log(res);
        this.listLoading = false;
        if (res.code == 1) {
          this.getMsg();
          this.$message({
            message: res.msg,
            type: "success"
          });
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    },
    handlePictureCardPreview(file) {
      console.log(file);

      var img = "image";
      var param = new FormData();
      param.append(img, file.raw);
      // param.append("id", ind);
      updataImg(param).then(res => {
        console.log(res);
        if (res.code == "1") {
          console.log(res.image_path);
          this.imageUrl = res.image_path;
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 60px;
  // background-color: palegoldenrod;
  font-size: 20px;
  padding: 15px;
  font-weight: bold;
}
.gaird {
  width: 100%;
  height: 1px;
  background-color: #f0f0f0;
}
.el-form {
  margin: 30px auto;
  padding-left: 30px;
}
.el-button {
  margin-left: 300px;
}
.avatar {
  width: 256px;
  height: 256px;
}
</style>