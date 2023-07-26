<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools
          :treeNode="company"
          :isRoot="true"
          style="margin-bottom: 10px"
          @addDept="addDept"
        ></tree-tools>
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <tree-tools
            slot-scope="{ data }"
            :treeNode="data"
            @delDepart="getDepartmentList"
            @editDept="editDept"
            @addDept="addDept"
          ></tree-tools>
        </el-tree>
      </el-card>
      <add-dept
        ref="addForm"
        :showDialog.sync="showDialog"
        :treeNode="node"
        @addDept="getDepartmentList"
      ></add-dept>
    </div>
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools.vue";
import addDept from "./components/add-dept.vue";
import { getDepartmentList } from "@/api/departments";
import { createTreeList } from "@/utils";
import AddDept from "./components/add-dept.vue";
export default {
  data() {
    return {
      //头数据
      company: {},
      //部门结构数据
      departs: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      //控制弹窗是否显示
      showDialog: false,
      //点击的部门信息
      node: null,
    };
  },
  created() {
    this.getDepartmentList();
  },
  methods: {
    async getDepartmentList() {
      const result = await getDepartmentList();
      this.departs = createTreeList(result.depts, "");
      this.company = { name: result.companyName, manager: "负责人", id: "" };
    },
    //添加部门
    addDept(value) {
      this.showDialog = true;
      this.node = value;
    },
    //显示编辑部门
    editDept(node) {
      this.showDialog = true;
      this.node = node; // 赋值操作的节点
      this.$refs.addForm.getDepartmentDetail(node.id);
    },
  },
  components: {
    TreeTools,
    AddDept,
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>