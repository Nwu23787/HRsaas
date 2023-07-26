<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="showDialog" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form label-width="120px" :model="formData" :rules="rules" ref="form">
      <el-form-item label="部门名称" prop="name">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          v-model="formData.name"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          v-model="formData.code"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width: 80%"
          placeholder="请选择"
          v-model="formData.manager"
          @focus="getSimpleEmployees"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :value="item.username"
            :lable="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
          v-model="formData.introduce"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {
  getDepartmentList,
  addDepartment,
  getDepartmentDetail,
} from "@/api/departments";
import { getSimpleEmployees } from "@/api/employees";
export default {
  data() {
    //检查新增的部门名称是否重复
    const checkNameRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartmentList();
      const isRepeat = depts
        .filter((item) => item.pid === this.treeNode.id)
        .some((item) => item.name === value);
      console.log(isRepeat);
      isRepeat
        ? callback(new Error(`同级部门下已有名为${value}的部门`))
        : callback();
    };

    // 检查新增部门的编码是否重复
    const checkCodeRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartmentList();
      const isRepeat = depts.some((item) => item.code === value);
      isRepeat ? callback(new Error(`已有编号为${value}的部门`)) : callback();
    };
    return {
      // 定义表单数据
      formData: {
        name: "", // 部门名称
        code: "", // 部门编码
        manager: "", // 部门管理者
        introduce: "", // 部门介绍
      },
      // 定义校验规则
      rules: {
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门名称要求1-50个字符",
            trigger: "blur",
          },
          {
            trigger: "blur",
            validator: checkNameRepeat, // 自定义函数的形式校验
          },
        ],
        code: [
          { required: true, message: "部门编码不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门编码要求1-50个字符",
            trigger: "blur",
          },
          {
            trigger: "blur",
            validator: checkCodeRepeat,
          },
        ],
        manager: [
          { required: true, message: "部门负责人不能为空", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "部门介绍不能为空", trigger: "blur" },
          {
            trigger: "blur",
            min: 1,
            max: 300,
            message: "部门介绍要求1-50个字符",
          },
        ],
      },
      //选择器选项
      options: [],
    };
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    // 当前操作的节点
    treeNode: {
      type: Object,
      default: null,
    },
  },

  methods: {
    async getSimpleEmployees() {
      const result = await getSimpleEmployees();
      this.options = result;
    },
    //表单提交
    btnOk() {
      this.$refs.form.validate(async (isOk) => {
        if (isOk) {
          await addDepartment({ ...this.formData, pid: this.treeNode.id });
          this.$emit("addDept");
          //关闭弹层
          this.$emit("update:showDialog", false);
        }
      });
    },
    //取消按钮
    btnCancel() {
      this.$emit("update:showDialog", false);
      this.$refs.form.resetFields();
    },
    //获取部门详情
    async getDepartmentDetail(id) {
      const result = await getDepartmentDetail(id);
      console.log(result);
      this.formData = result;
    },
  },
};
</script>