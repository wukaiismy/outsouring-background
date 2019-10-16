<template>
  <div id="dalos">
    <!-- <Search @channelSearch="channelSearch" /> -->
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
        <el-table-column property="create_time" label="创建时间" align="center" width="200%"></el-table-column>
        <el-table-column label="类型" align="center" width="120%">
          <template slot-scope="scope">
            <span type="text" v-if="scope.row.type_of==1">通知</span>
            <span type="text" v-else>公告</span>
          </template>
        </el-table-column>
        <el-table-column property="content" label="内容" align="center"></el-table-column>

        <el-table-column label="操作" align="center" width="120%">
          <template slot-scope="scope">
            <el-button type="text" @click="delNews(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="addBtn" type="primary" @click="addNew">新增</el-button>
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
        <el-form label-width="80px">
          <el-form-item label="类型">
            <el-select v-model="msg1.type_of" placeholder="请选择" style="width:220px;">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="内容">
            <el-input type="textarea" style="width: 300px;" :rows="7" v-model="msg1.content"></el-input>
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
  name: 'Notify',

  data() {
    return {
      title: '编辑',
      pages: {
        page: 1,
        size: 10
      },
      typeOptions: [{ value: 1, label: '通知' }, { value: 2, label: '公告' }],
      tableKey: 0,
      total: 1,
      listLoading: true,
      dialogTableVisible2: false,
      msg1: {},
      gridData: [],
      type: ''
    };
  },
  components: {
    Search
  },
  created() {
    this.getList();
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
        '/yanghua_edu/api/other_module/notic_manage/?pg=' +
        this.pages.page +
        '&size=' +
        this.pages.size;
      showCm(basicURL).then(res => {
        console.log('通知公告');
        console.log(res);
        this.listLoading = false;
        if (res.code == 1) {
          var dataList = res.data.ret;
          console.log(dataList);
          // 处理时间
          for (var i = 0; i < dataList.length; i++) {
            dataList[i].create_time = dataList[i].create_time
              .split('T')
              .join(' ')
              .substring(0, 19);
          }
          this.total = res.data.count;
          this.gridData = dataList;
        } else {
          this.message(res.msg, res.code);
        }
      });
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
      var url = '/yanghua_edu/api/other_module/notic_manage/';
      delNews(url, data).then(res => {
        console.log(res);
        this.message(res.msg, res.code);
        this.getList();
      });
    },

    // 新增
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
      }
      console.log(this.msg1);

      var url = '/yanghua_edu/api/other_module/notic_manage/';
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
.submmitBtn {
  background-image: linear-gradient(-180deg, #d1ddf6 0%, #ebf1fc 100%);
  border-radius: 4px;
  font-size: 14px;
  color: #1c3672;
  width: 180px;
  height: 36px;
  /* margin-top: 30px; */
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
</style>
<style lang="scss">
.el-form-item__content {
  text-align: left;
}
</style>
