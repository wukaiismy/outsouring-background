<template>
  <div class="filter-container">
    <div class="els">
      <div class="grid-content">公司名称：
        <el-input v-model="searchList.emAccount" style="width: 120px;" clearable></el-input>
      </div>
      <div class="grid-content">电话号码：
        <el-input v-model="searchList.emName" style="width: 120px;" clearable></el-input>
      </div>
      <!-- <div class="grid-content">用户权限：<el-input v-model="searchList.roleAuthor" style="width: 130px;" clearable></el-input></div> -->
      <div class="grid-content">
        状态：
        <select v-model="searchList.status" class="selectBox" @click="ss()">
          <option
            v-for="(a,index) in options"
            :key="index"
            :value="a.value"
            :disabled="a.disabled"
          >{{ a.label }}</option>
        </select>
      </div>
      <!-- <span class="userSearch"> 交易日期：</span> 
      <el-date-picker v-model="searchList.date" type="daterange" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>-->
      <el-button class="searchs" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
  </div>
</template>

<script>
// 水波纹指令
export default {
  name: "Search",

  data() {
    return {
      options: [
        {
          value: "dis",
          label: "选择状态",
          disabled: ""
        },
        {
          value: "0",
          label: "未联系"
        },
        {
          value: "1",
          label: "已联系"
        },
        {
          value: "2",
          label: "大客户"
        },
        {
          value: "9",
          label: "全部信息"
        }
      ],
      searchList: {
        emAccount: "",
        emName: "",
        status: "dis"
        // date: ""
      },

      listLoading: false
    };
  },
  methods: {
    //搜索功能
    handleFilter() {
      if (this.searchList.status == "9") {
        this.searchList.status = "";
      }
      this.$emit("channelSearch", this.searchList);
    },
    ss() {
      this.options[0].disabled = "disabled";
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.filter-container {
  margin: 0 auto;
}
.els {
  text-align: center;
  .grid-content {
    display: inline-block;
    font-size: 14px;
    margin: 20px 0 10px 10px;
    color: #666666;
    .el-input {
      display: inline-block;
    }
  }
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 255px;
}
.searchs {
  position: relative;
  margin-left: 20px;
}
.userSearch {
  font-size: 14px;
  color: #666666;
  margin-left: 10px;
}
.selectBox {
  width: 120px;
  height: 36px;
  border: 1px solid #dcdfe6;
}
</style>