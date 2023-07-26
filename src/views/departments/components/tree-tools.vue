<template>
  <el-row style="width: 100%" type="flex" justify="space-between">
    <el-col :span="20"
      ><span>{{ treeNode.name }}</span></el-col
    >
    <el-col :span="2"
      ><span>{{ treeNode.manager }}</span></el-col
    >
    <el-col :span="2">
      <el-dropdown @command="operations"
        ><span>操作 <i class="el-icon-arrow-down"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="add">添加子部门</el-dropdown-item>
          <el-dropdown-item v-if="!isRoot" command="edit"
            >编辑部门</el-dropdown-item
          >
          <el-dropdown-item v-if="!isRoot" command="delete"
            >删除部门</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown></el-col
    >
  </el-row>
</template>

<script>
import { delteDepartment } from "@/api/departments";
export default {
  props: {
    //定义传入的属性
    treeNode: {
      required: true,
      type: Object,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    operations(type) {
      if (type === "add") {
        this.$emit("addDept", this.treeNode);
      } else if (type === "edit") {
        this.$emit("editDept", this.treeNode);
      } else if (type === "delete") {
        this.$confirm("确认删除此部门吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(() => {
            return delteDepartment(this.treeNode.id);
          })
          .then(() => {
            this.$emit("delDepart");
            this.$message({
              type: "success",
              message: "删除成功",
            });
          });
      }
    },
  },

  
};
</script>

<style>
</style>