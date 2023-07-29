<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <PageTools :showBefore="true">
        <template v-slot:before>
          <span>计划撒发送大家撒垃圾袋撒娇</span>
        </template>
        <template v-slot:after>
          <el-button type="primary">提交</el-button>
        </template>
      </PageTools>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
