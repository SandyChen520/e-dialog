# dialog

> element-ui dialog可拖拽弹窗

###### 示例

```
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
```
---

###### Attributes

参数 | 说明 | 类型 | 默认值
---|---|---|---
visible | 显示弹窗 | |-
title | 弹窗标题 | | 标题
refname | 组件的ref | String | dialog_con
###### events
> close 关闭弹窗事件，将visible中的值设为false

---


