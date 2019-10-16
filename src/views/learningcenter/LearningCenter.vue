<template>
  <div id="dalos">
    <Search @channelSearch="channelSearch" />
    <!-- 我是表格组件 -->
    <div class="bigBoxs">
      <el-table
        class="tableBox"
        v-loading="listLoading"
        :key="tableKey"
        :data="gridData"
        border
        fit
        highlight-current-row
        style="width:100%;"
      >
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.create_time|timeType}}</span>
          </template>
        </el-table-column>
        <el-table-column property="title" label="标题" align="center"></el-table-column>
        <el-table-column property="introduction" label="介绍" align="center"></el-table-column>
        <el-table-column property="url" label="跳转地址" align="center"></el-table-column>
        <el-table-column property="serial_number" label="排序序号" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="edits(scope.row)">编辑</el-button>
            <el-button type="text" @click="delNews(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="addBtn" type="primary" @click="addNew">新增项目</el-button>
    </div>
    <!-- 分页功能 -->
    <div class="pagination-container">
      <el-pagination
        v-show="total>0"
        :current-page="pages.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="10"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 主体内容结束 -->
    <!-- 下面是编辑模态框 -->
    <el-dialog :visible.sync="dialogTableVisible2" custom-class="sssss" top="10vh" width="700px">
      <div class="diaTilte">
        <div class="titleMotai">{{title}}</div>
        <el-form label-width="130px">
          <el-form-item label="标题">
            <el-input style="width: 300px;" v-model="msg1.title"></el-input>
          </el-form-item>
          <el-form-item label="介绍">
            <el-input type="textarea" style="width: 300px;" :rows="5" v-model="msg1.introduction"></el-input>
          </el-form-item>
          <el-form-item label="跳转地址">
            <el-input style="width: 300px;" v-model="msg1.url"></el-input>
          </el-form-item>
          <el-form-item label="排序序号">
            <el-input style="width: 300px;" type="number" v-model="msg1.serial_number"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <el-upload
              class="avatar-uploader"
              action="/api/banner_img/file_or_img/"
              :show-file-list="false"
              :on-change="handlePictureCardPreview"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <img v-else :src="msg1.cover_img" class="avatar" alt="暂无图片" />
            </el-upload>
          </el-form-item>
          <el-button type="primary" @click="submitForm()">保存</el-button>
        </el-form>
      </div>
    </el-dialog>
    <!-- 编辑模态框结束 -->
  </div>
</template>

<script>
import Search from '../jionUs/components/Search';
import { updataImg } from '@/api/table';
import { showCm, markCm, editCm, delNews } from '@/api/news';
export default {
  name: 'LearningCenter',

  data() {
    return {
      title: '编辑',
      pages: {
        page: 1,
        size: 10
      },
      textarea3: '',
      multipleSelection: [],
      value1: '',
      tableKey: 0,
      list: null,
      total: 1,
      listLoading: true,
      dialogTableVisible: false,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      msg: {
        name: '',
        mobile: '',
        password: ''
      },
      msg1: {},
      password: '',
      gridData: [],
      imageUrl: '',
      type: ''
    };
  },
  components: {
    Search
  },
  created() {
    this.getList();
  },
  watch: {
    dialogTableVisible2(val) {
      console.log('+++++');
      console.log(val);
      if (!val) {
        this.imageUrl = '';
      }
    }
  },
  methods: {
    // 搜索按钮传值回来
    channelSearch(data) {
      console.log(data);
      this.pages.page = 1;
      this.pages.size = 10;
      var datas = {
        name: data.emName,
        id: data.emAccount,
        is_delete: data.status
      };
      console.log(datas);
      this.getList(datas);
    },
    // 获取列表信息
    getList(data) {
      this.listLoading = true;

      var basicURL =
        '/yanghua_edu/api/learning_platform/learn_plat/?pg=' +
        this.pages.page +
        '&size=' +
        this.pages.size;
      showCm(basicURL).then(res => {
        console.log('学习平台');
        console.log(res);
        if (res.code == 1) {
          var dataList = res.data.ret;
          console.log(dataList);

          this.total = res.data.count;
          this.gridData = dataList;
        } else {
          this.message(res.msg, res.code);
        }
      });
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
    },
    // 提示框函数
    message(msg, status) {
      var types = '';
      if (status == '1') {
        types = 'success';
      } else {
        types = 'error';
      }
      this.$message({
        message: msg,
        type: types
      });
    },
    delNews(val) {
      var data = {
        id: val
      };
      var url = '/yanghua_edu/api/learning_platform/learn_plat/';
      delNews(url, data).then(res => {
        console.log(res);
        this.message(res.msg, res.code);
        this.getList();
      });
    },
    // 编辑按钮
    edits(val) {
      console.log(val);
      this.dialogTableVisible2 = true;
      this.msg1 = val;
      this.title = '编辑';
      this.type = 'edit';
    },

    // 新增员工
    addNew() {
      this.msg1 = {};
      this.title = '新增';
      this.type = 'add';
      this.dialogTableVisible2 = true;
    },

    // 修改
    submitForm() {
      var methodsType = 'put';
      if (this.type == 'add') {
        methodsType = 'post';
        // this.msg1.images = this.imageUrl;
      }
      console.log(this.msg1);
      if (this.imageUrl) {
        this.msg1.cover_img = this.imageUrl;
      }
      this.msg1.serial_number = Number(this.msg1.serial_number);
      var url = '/yanghua_edu/api/learning_platform/learn_plat/';
      editCm(methodsType, url, this.msg1).then(res => {
        console.log(res);
        if (res.code == '1') {
          this.message(res.msg, res.code);
          this.dialogTableVisible2 = false;
          this.getList();
        } else {
          this.message('操作失败！', res.code);
        }
      });
    },
    handlePictureCardPreview(file) {
      console.log(file);

      var img = 'image';
      var param = new FormData();
      param.append(img, file.raw);
      // param.append("id", ind);
      updataImg(param).then(res => {
        console.log(res);
        if (res.code == '1') {
          console.log(res.image_path);
          this.imageUrl = res.image_path;
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //分页功能选择
    handleSizeChange(val) {
      this.pages.page = 1;
      this.pages.size = val;
      this.getList();
    },
    //分页功能选择
    handleCurrentChange(val) {
      console.log('选择分页');
      this.pages.page = val;
      this.getList();
    }
  }
};
</script>

<style scoped>
.userSearch {
  font-size: 14px;
  color: #666666;
  margin-left: 4.4%;
}
.searchHandle {
  margin-left: 30px;
  margin-top: 5px;
}

.xiaz {
  font-size: 14px;
  color: #1c3672;
}
.shanchu {
  font-size: 14px;
  color: #f66d23;
}
.bigBoxs {
  width: 96.47%;
  margin-left: 1%;
  background-color: #fff;
  padding-bottom: 20px;
  display: inline-block;
}
.tableBox {
  margin-bottom: 10px;
}
.pagination-container {
  margin: 22px 0 60px 30%;
}
.allChose {
  width: 100%;
  min-height: 34px;
  text-align: right;
}
.searchs {
  width: 110px;
  font-size: 14px;
  text-align: center;
  margin-right: 1%;
  padding-left: 0;
  padding-right: 0;
}
.item .ppss,
.ppss {
  color: #4990e2;
  font-size: 14px;
}
.noppss {
  color: #999999;
  font-size: 14px;
}
.stopServer {
  font-size: 14px;
  color: #d0011b;
}

.moneyStyles {
  font-size: 14px;
  color: #1c3672;
}
/* 下面是模态框的样式*/
#dalos .el-dialog__wrapper .el-dialog {
  margin: 0 auto 20px !important;
  padding: 0 20px 0 20px;
}

.diaTilte {
  position: relative;
  text-align: center;
  line-height: 36px;
  font-size: 16px;
  color: #1c3672;
  width: 700px;
  margin-bottom: 10px;
  left: -20px;
  top: -60px;
}
.d1 {
  width: 678px;
  left: -2.94%;
}
.titleMotai {
  background: #f0f0f0;
  margin-bottom: 10px;
}
.item {
  position: relative;
  padding: 1px 0 20px 0;
  /* background-color: aqua; */
  height: 20px;
  text-align: left;
  margin-top: 10px;
}
.item1 {
  position: relative;
  padding: 1px 20px 0px 20px;
  /* background-color: aqua; */
  min-height: 20px;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: #666666;
  line-height: 20px;
}

.item span {
  font-size: 14px;
  color: #333333;
  margin-left: 44.2%;
}
.item .addSpan {
  margin-left: 36.176%;
}
.abs {
  position: absolute;
  right: 55.8%;
  font-size: 14px;
  color: #999999;
}
.abs1 {
  right: 63.82%;
  color: #666666;
}

.shangjia {
  color: #4990e2;
}
.chulz {
  color: #f6a623;
  font-size: 14px;
  margin-left: 30px;
  margin-right: 20px;
}
.submmitBtn {
  background-image: linear-gradient(-180deg, #d1ddf6 0%, #ebf1fc 100%);
  border-radius: 4px;
  font-size: 14px;
  color: #1c3672;
  width: 180px;
  height: 36px;
  /* margin-top: 30px; */
}
.stopBtn {
  border: 1px solid #d0011b;
  border-radius: 4px;
  font-size: 14px;
  color: #d0011b;
  width: 180px;
  height: 36px;
  margin-left: 30px;
}
.adds {
  border: 1px solid #1c3672;
  border-radius: 6px;
  font-size: 12px;
  color: #1c3672;
  width: 160px;
  height: 34px;
}
.items {
  position: relative;
  padding: 1px 0 1px 0;
  min-height: 20px;
  text-align: left;
  /* margin-top: 20px; */
}
.items span {
  font-size: 14px;
  color: #333333;
  margin-left: 37%;
}
.items .checked {
  display: inline-block;

  width: 60%;
}
.el-radio,
.el-radio + .el-radio {
  margin-left: 0px;
  margin-right: 30px;
}
.dd {
  margin-left: 5px;
  font-style: normal;
}
.addBtn {
  float: right;
}
.avatar {
  width: 256px;
  height: 256px;
}
</style>
<style lang="scss">
.el-form-item__content {
  text-align: left;
}
</style>
