<template>
  <div>
    <div class="title">底部展示内容</div>
    <div class="gaird"></div>
    <el-form label-width="80px">
      <el-form-item label="公司地址">
        <el-input style="width: 300px;" v-model="parmsData.company_address"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input style="width: 300px;" v-model="parmsData.mailbox"></el-input>
      </el-form-item>
      <el-form-item label="服务热线">
        <el-input style="width: 300px;" v-model="parmsData.service_hotline"></el-input>
      </el-form-item>
      <el-form-item label="商务合作">
        <el-input style="width: 300px;" v-model="parmsData.business_cooperation"></el-input>
      </el-form-item>
      <el-form-item label="二维码">
        <el-upload
          class="avatar-uploader"
          action="/api/banner_img/file_or_img/"
          :show-file-list="false"
          :on-change="handlePictureCardPreview"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <img v-else :src="parmsData.official_wechat" class="avatar" alt />
        </el-upload>
      </el-form-item>
      <el-button type="primary" @click="submitForm()">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import { getMsg, updataImg } from "@/api/table";
export default {
  name: "HomeButtom",
  data() {
    return {
      parmsData: {},
      imageUrl: ""
    };
  },
  created() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      this.listLoading = true;

      var basicURL = "/yanghua_edu/api/other_module/bottom_content/";
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
      this.parmsData.official_wechat = this.imageUrl;
      console.log(this.parmsData);
      var basicURL = "/yanghua_edu/api/other_module/bottom_content/";
      getMsg("POST", basicURL, this.parmsData).then(res => {
        console.log(res);
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