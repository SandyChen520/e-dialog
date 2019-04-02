<template>
  <div>
    <el-button @click="open">弹窗</el-button>
    <custom-dialog :title="formTitle" :visible="dialogVisible" class="base-form" ref="formAdd" :refname="'formAdd'" @close="dialogMemberCancel">
      <el-form ref="formAdd" :validate-on-rule-change="false" :model="formAdd" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formAdd.name"> </el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="formAdd.name"> </el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="formAdd.name"> </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogMemberSave">添加</el-button>
        <el-button @click="dialogMemberCancel">取消</el-button>
      </div>
    </custom-dialog>
  </div>
</template>

<script>
export default {
  name: 'cdialog',
  data () {
    return {
      dialogVisible: false,
      formTitle: '添加角标',
      formAdd: {
        name: ''
      }
    }
  },
  methods: {
    dialogMemberCancel: function () {
      this.dialogVisible = false
    },
    dialogMemberSave: function () {
      // to do
      this.dialogMemberCancel()
    },
    open: function () {
      this.dialogVisible = true
    }
  }
}
</script>
<style>
</style>
