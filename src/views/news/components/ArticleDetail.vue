<!--
 * @Description: This is a very nice day
 * @Author: wukai
 * @Github: https://github.com/wukaiismy
 * @since: 2018-12-06 15:11:32
 * @LastAuthor: wukai
 * @lastTime: 2019-10-24 20:37:38
 -->
<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="btnBox">
        <el-button
          v-loading="loading"
          style="margin-left: 10px;"
          type="success"
          @click="submitForm"
        >发布</el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>
      </div>
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>标题</MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="45px" label="类型:" class="postInfo-container-item">
                    <el-select
                      v-model="postForm.graphic_type_id"
                      filterable
                      remote
                      placeholder="搜索类型"
                    >
                      <el-option
                        v-for="(item,index) in userListOptions"
                        :key="item+index"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- <el-col :span="10">
                  <el-form-item label-width="80px" label="发布时间:" class="postInfo-container-item">
                    <el-date-picker
                      v-model="postForm.display_time"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期时间"
                    />
                  </el-form-item>
                </el-col>-->

                <!-- <el-col :span="6">
                  <el-form-item label-width="60px" label="来源:" class="postInfo-container-item">
                    <el-input
                      :rows="1"
                      v-model="postForm.urls"
                      type="text"
                      class="article-textarea"
                      autosize
                      placeholder="请输入新闻来源"
                    />
                  </el-form-item>
                </el-col>-->
              </el-row>
            </div>
          </el-col>
        </el-row>
        <!-- 
        <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
          <el-input
            :rows="1"
            v-model="postForm.description"
            type="textarea"
            class="article-textarea"
            autosize
            placeholder="请输入内容"
          />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
        </el-form-item>-->
        <div style="margin-bottom: 20px;">
          <el-form-item label-width="45px" label="图片:" class="postInfo-container-item">
            <el-upload
              action="/backstage/update_cm/"
              list-type="picture-card"
              :on-change="handlePictureCardPreview"
              :on-remove="handleRemove"
              :auto-upload="false"
              :limit="1"
            >
              <img
                v-if="!imageUrl.length"
                style="width:146px;height:146px"
                :src="postForm.cover_img"
                referrer="no-referrer"
                alt
              />
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </div>
        <div class="editor-container">
          <Tinymce ref="editor" :height="400" v-model="postForm.content" />
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import MDinput from "@/components/MDinput";
import { updataImg } from "@/api/table";
import { addNews, getsNews } from "@/api/news";

const defaultForm = {
  status: "draft",
  title: "", // 文章题目
  content: "", // 文章内容
  graphic_type_id: "", //类型
  description: "", // 文章摘要
  source_uri: "", // 文章外链
  image_uri: "", // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ["a-platform"],
  comment_disabled: false,
  urls: "",
  cover_img: ""
};

export default {
  name: "ArticleDetail",
  components: {
    Tinymce,
    MDinput
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        this.$message({
          message: rule.field + "为必传项",
          type: "error"
        });
        callback(new Error(rule.field + "为必传项"));
      } else {
        callback();
      }
    };

    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      files: "",
      imageUrl: "",
      isEdit1: false,
      userListOptions: [
        { key: 1, value: "行业动态" },
        { key: 2, value: "专业指导" },
        { key: 3, value: "考试攻略" },
        { key: 4, value: "报考指南" }
      ],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
      tempRoute: {}
    };
  },
  computed: {
    // contentShortLength() {
    //   return this.postForm.description.length;
    // },
    lang() {
      return this.$store.getters.language;
    }
  },
  created() {
    const id = this.$route.query && this.$route.query.id;
    console.log(id);
    if (id) {
      this.getDetail(id);
      this.isEdit1 = true;
    }
    // if (this.isEdit) {
    //   const id = this.$route.query && this.$route.query.id;
    //   this.fetchData(id);
    // } else {
    //   this.postForm = Object.assign({}, defaultForm);
    // }

    this.tempRoute = Object.assign({}, this.$route);
  },
  methods: {
    getDetail(id) {
      var Url = "/yanghua_edu/api/graphic_module/graphic/";
      getsNews(Url, { id: id }).then(res => {
        console.log(res);
        if (res.code == "1") {
          this.postForm = res.data;
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
    fetchData(id) {
      fetchArticle(id)
        .then(response => {
          this.postForm = response.data;
          // Just for test
          this.postForm.title += `   Article Id:${this.postForm.id}`;
          this.postForm.content_short += `   Article Id:${this.postForm.id}`;

          // Set tagsview title
          this.setTagsViewTitle();
        })
        .catch(err => {
          console.log(err);
        });
    },
    setTagsViewTitle() {
      const title = this.lang === "zh" ? "编辑文章" : "Edit Article";
      const route = Object.assign({}, this.tempRoute, {
        title: `${title}-${this.postForm.id}`
      });
      this.$store.dispatch("updateVisitedView", route);
    },
    submitForm() {
      if (this.imageUrl.length) {
        this.postForm.cover_img = this.imageUrl;
      }

      console.log(this.postForm);

      var dataList = {
        title: this.postForm.title,
        graphic_type_id: this.postForm.graphic_type_id,
        cover_img: this.postForm.cover_img,
        content: this.postForm.content,
        description: this.postForm.description || "-"
      };
      // if (this.postForm.author == "行业新闻") {
      //   type = 1;
      // } else if (this.postForm.author == "政策法规") {
      //   type = 0;
      // } else if (this.postForm.author == "平台新闻") {
      //   type = 2;
      // }
      // var param = new FormData();
      // param.append("urls", this.postForm.urls);
      // param.append("topic", this.postForm.title);
      // param.append("content", this.postForm.content);
      // param.append("author", "super_admin");
      // param.append("type_of", type);
      // param.append("cover", this.files);
      // param.append("create_at", this.postForm.display_time);
      // param.append("summary", this.postForm.content_short);
      var Url = "/yanghua_edu/api/graphic_module/graphic/";
      var med = "post";
      if (this.isEdit1) {
        med = "put";
        dataList.id = this.postForm.id;
      }
      addNews(Url, med, dataList).then(res => {
        console.log(res);
        if (res.code == "1") {
          this.$message({
            message: res.msg,
            type: "success"
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    draftForm() {
      console.log(this.postForm.content);
      return;
      if (
        this.postForm.content.length === 0 ||
        this.postForm.title.length === 0
      ) {
        this.$message({
          message: "请填写必要的标题和内容",
          type: "warning"
        });
        return;
      }
      this.$message({
        message: "保存成功",
        type: "success",
        showClose: true,
        duration: 1000
      });
      this.postForm.status = "draft";
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
.btnBox {
  background-color: #d0d0d0;
  margin: 20px auto;
  text-align: right;
  padding-right: 50px;
  height: 60px;
  line-height: 60px;
}
</style>
