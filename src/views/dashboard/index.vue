<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎你：{{ name }}</div>
    <div class="dashboardshow">扬华教育官网后台系统</div>
    <div class="dashboard-text">
      您的权限roles:
      <span v-for="role in roles" :key="role">{{ role }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "roles"])
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  text-align: center;
  background-color: #f9f9f9;
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboardshow {
  font-size: 30px;
  line-height: 46px;
}
</style>
