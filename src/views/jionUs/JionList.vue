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
        <el-table-column property="name" label="名字" align="center"></el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            <span type="text" size="small">{{scope.row.sex==1?'男':"女"}}</span>
          </template>
        </el-table-column>
        <el-table-column property="id_card_number" label="身份证号" align="center"></el-table-column>
        <el-table-column property="mobile" label="联系电话" align="center"></el-table-column>
        <el-table-column property="school_or_unit" label="所在单位或学校" align="center"></el-table-column>
        <el-table-column property="current_position" label="当前职位" align="center"></el-table-column>
        <el-table-column label="现从事工作" align="center" width="100%">
          <template slot-scope="scope">
            <span type="text" size="small">{{scope.row.jobs||'-'}}</span>
          </template>
        </el-table-column>
        <el-table-column property="joining_area" label="需加盟区域" align="center"></el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            <span type="text" size="small">{{scope.row.remarks||'-'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="100%">
          <template slot-scope="scope">
            <span type="text" size="small" class="shangjia" v-if="scope.row.is_contact">已联系</span>
            <span type="text" size="small" class="shanchu" v-else>未联系</span>
            <!-- <span type="text" size="small" class="shanchu" v-if="scope.row.types_of==2">大客户</span> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!-- <el-button  type="text" size="small" class="xiaz" @click="addSumbit(scope.row)">添加</el-button> -->
            <!-- <el-button type="text" size="small" v-if="scope.row.is_contact">已联系</el-button> -->
            <el-button
              type="text"
              size="small"
              v-if="!scope.row.is_contact"
              class="xiaz"
              @click="handover(scope.row)"
            >标记</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script>
import Search from './components/Search.vue';

import { showCm, markCm, editCm } from '@/api/news';
export default {
  name: 'UserAuthorization',

  data() {
    return {
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
      gridData: []
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
    // 获取角色权限基本列表信息
    getList(data) {
      this.listLoading = true;

      var basicURL =
        '/yanghua_edu/api/other_module/join_hand/?pg=' +
        this.pages.page +
        '&size=' +
        this.pages.size;
      showCm(basicURL).then(res => {
        console.log(res);
        var dataList = res.data.ret;
        console.log(dataList);

        this.total = res.data.count;
        this.gridData = dataList;
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
    // 编辑按钮
    edits(val) {
      console.log(val);
      this.dialogTableVisible2 = true;
      this.msg1 = val;
    },
    // 启用切换
    handover(val) {
      var obj = { id: val.id };
      var detailURL = '/yanghua_edu/api/other_module/join_hand/';

      markCm(detailURL, obj).then(res => {
        console.log(res);
        this.message(res.msg, res.code);
        this.getList();
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
  width: 498px;
  margin-bottom: 10px;

  left: -4%;
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
.btnBoxs {
  position: relative;
  top: 30px;
  margin-bottom: -40px;
}
</style>
