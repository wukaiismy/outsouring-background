<template>
  <div id="dalos">
    <Search @channelSearch="channelSearch"/>
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
        <el-table-column property="create_at" label="创建时间" align="center"></el-table-column>
        <el-table-column property="company_name" label="公司名称" align="center"></el-table-column>
        <el-table-column property="industry" label="所属行业" align="center"></el-table-column>
        <el-table-column label="申请类型" align="center" width="100%">
          <template slot-scope="scope">
            <span type="text" size="small" class="shangjia" v-if="scope.row.types_of==1">商户加盟</span>
            <span type="text" size="small" class="shanchu" v-if="scope.row.types_of==2">渠道商加盟</span>
            <!-- <span type="text" size="small" class="shanchu" v-if="scope.row.types_of==2">大客户</span> -->
          </template>
        </el-table-column>
        <el-table-column property="adr" label="公司地址" align="center"></el-table-column>
        <el-table-column property="contact_user" label="联系人" align="center"></el-table-column>
        <el-table-column property="mobile" label="联系电话" align="center"></el-table-column>
        <el-table-column property="remarks" label="处理情况" align="center"></el-table-column>
        <el-table-column label="状态" align="center" width="100%">
          <template slot-scope="scope">
            <span type="text" size="small" class="shangjia" v-if="scope.row.is_contact==0">未联系</span>
            <span type="text" size="small" class="shanchu" v-if="scope.row.is_contact==1">已联系</span>
            <!-- <span type="text" size="small" class="shanchu" v-if="scope.row.types_of==2">大客户</span> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!-- <el-button  type="text" size="small" class="xiaz" @click="addSumbit(scope.row)">添加</el-button> -->
            <el-button type="text" size="small" class="xiaz" @click="edits(scope.row)">编辑</el-button>
            <el-button type="text" size="small" class="xiaz" @click="handover(scope.row)">标记</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 下面的选择按钮 -->
      <div class="allChose">
        <el-button class="adds" icon="el-icon-plus" @click="addSumbit">备用按钮</el-button>
        <!-- <el-button v-waves class="searchs" type="primary"  icon="el-icon-download"  @click="daochuJump">导出</el-button> -->
      </div>
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
    <el-dialog :visible.sync="dialogTableVisible2" custom-class="sssss" top="20vh" width="500px">
      <div class="diaTilte">
        <div class="titleMotai">处理情况</div>
        <div class="items">
          <div class="abs abs1">创建时间：</div>
          <span>
            <el-input
              :disabled="true"
              size="small"
              style="width:46.17%; height:40px;"
              v-model="msg1.create_at"
            ></el-input>
          </span>
        </div>
        <!-- <div class="items"><div class="abs abs1">员工编号：</div><span><el-input  :disabled="true" size="small"  style="width:46.17%; height:40px;" v-model="msg1.id" ></el-input></span></div>  -->
        <div class="items">
          <div class="abs abs1">公司名称：</div>
          <span>
            <el-input
              :disabled="true"
              size="small"
              style="width:46.17%; height:40px;"
              v-model="msg1.company_name"
            ></el-input>
          </span>
        </div>
        <div class="items">
          <div class="abs abs1">联系电话：</div>
          <span>
            <el-input
              :disabled="true"
              size="small"
              style="width:46.17%; height:40px;"
              v-model="msg1.mobile"
            ></el-input>
          </span>
        </div>
        <div class="items">
          <div class="abs abs1">联系人：</div>
          <span>
            <el-input
              :disabled="true"
              size="small"
              style="width:46.17%; height:40px;"
              v-model="msg1.contact_user"
            ></el-input>
          </span>
        </div>
        <div class="items">
          <div class="abs abs1">处理情况：</div>
          <span>
            <el-input size="small" style="width:46.17%; height:40px;" v-model="msg1.remarks"></el-input>
          </span>
        </div>

        <!-- 下面是按钮 -->
        <div class="btnBoxs">
          <el-button class="submmitBtn" @click="submitChange">确定</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 编辑模态框结束 -->
  </div>
</template>

<script>
import Search from "./components/Search.vue";

import { showCm, markCm, editCm } from "@/api/news";
export default {
  name: "UserAuthorization",

  data() {
    return {
      pages: {
        page: 1,
        size: 10
      },
      textarea3: "",
      multipleSelection: [],
      value1: "",
      tableKey: 0,
      list: null,
      total: 1,
      listLoading: true,
      dialogTableVisible: false,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      msg: {
        name: "",
        mobile: "",
        password: ""
      },
      msg1: {},
      password: "",
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
        "/website/backstage/show_cm/?page=" +
        this.pages.page +
        "&size=" +
        this.pages.size;
      showCm(basicURL).then(res => {
        console.log(res);
        var dataList = res.data.ret;
        console.log(dataList);
        for (var i = 0; i < dataList.length; i++) {
          dataList[i].create_at = dataList[i].create_at.split("T").join(" ");
        }
        this.total = res.data.count;
        this.gridData = dataList;
      });
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
    },
    // 提示框函数
    message(msg, status) {
      var types = "";
      if (status == "200") {
        types = "success";
      } else {
        types = "error";
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
      var detailURL = "";
      if (val.types_of == "1") {
        detailURL = "/website/backstage/mark_cm/";
      } else if (val.types_of == "2") {
        detailURL = "/website/backstage/mark_cm/";
      } else if (val.types_of == "0") {
        detailURL = "/website/backstage/mark_cm/";
      }
      markCm(detailURL, val.id).then(res => {
        console.log(res);
        this.message(res.msg, res.code);
        this.getList();
      });
    },

    // 新增员工
    addSumbit(val) {
      console.log(val);
      this.dialogTableVisible1 = true;
    },
    // 下面是新增员工权限提交按钮
    submitAdd() {
      var detailURL = "/backend/api/v1/admin/createadmin/";
      userAdd(detailURL, this.msg).then(res => {
        console.log(res);
        this.dialogTableVisible1 = false;
        this.message(res.data.msg, res.data.code);
      });
    },
    // 修改
    submitChange() {
      var data = {
        remarks: this.msg1.remarks,
        id: this.msg1.id
      };
      console.log(data);
      editCm(data).then(res => {
        console.log(res);
        if (res.code == "200") {
          this.message(res.msg, res.code);
          this.dialogTableVisible2 = false;
          this.getList();
        } else {
          this.message("操作失败！", res.code);
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
      console.log("选择分页");
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
