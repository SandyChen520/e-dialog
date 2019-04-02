<template>
  <el-dialog :top="'0'" :visible.sync="visibler" :ref="refname" v-dialogDrag :class="[dialogFull ? 'dialog-custom diogFull':'dialog-custom']" :before-close="closeDiag" @open="clearStyle($refs[refname])" :close-on-click-modal="false">
    <div class="dialog-move-bg"></div>
    <div class="dialog-rb" v-dialogDragWidth="{el:$refs[refname], classHeight: classHeight}"></div>
    <div slot="title">
      <div class="dialog-tit">{{title}}</div>
      <div class="dialog-full" @click="handleDialogFull($refs[refname])">
        <img :src="imgSrc" alt="">
      </div>
    </div>
    <div :class="'dialog-custom-con'">
      <slot></slot>
    </div>
    <template slot="footer">
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: 'customDialog',
  data () {
    return {
      dialogFull: false,
      imgSrc: require('../../assets/full.svg')
    }
  },
  props: {
    visible: { // 显示隐藏
      type: Boolean,
      default: false
    },
    title: { // 弹窗标题
      default: '标题'
    },
    refname: { // 组件的ref
      type: String,
      default: 'dialog_con'
    },
    classHeight: { // 需要动态改变高度的内容的class数组
      type: Array,
      default: function () {
        return []
      }
    },
    diologConW: { // 弹窗内容区的宽
      type: Number,
      default: 530
    }
  },
  computed: {
    visibler: function () {
      // if (this.visible) {
      //   document.querySelector('.content-grid123').querySelector('.el-tabs__content').style.overflowY = 'hidden'
      // } else {
      //   if (document.querySelector('.content-grid123')) {
      //     document.querySelector('.content-grid123').querySelector('.el-tabs__content').style.overflowY = 'scroll'
      //   }
      // }
      return this.visible
    }
  },
  methods: {
    closeDiag: function (done) {
      this.$emit('close')
      // done();
    },
    handleDialogFull: function (diogDom) {
      var elDialog = diogDom.$el.querySelector('.el-dialog')
      let _this = this
      if (this.dialogFull) {
        // 全屏模式，清除样式
        var styleStr = 'left:' + 'calc(50% - ' + _this.diologConW / 2 + 'px);'
        elDialog.setAttribute('style', styleStr)
        elDialog.querySelector('.el-dialog__body').setAttribute('style', '')
        this.imgSrc = require('../../assets/full.svg')
        if (_this.classHeight.length > 0) {
          let lengt = _this.classHeight.length
          for (let i = 0; i < lengt; i++) {
            if (elDialog.querySelector(`.${_this.classHeight[i].name}`)) {
              elDialog.querySelector(`.${_this.classHeight[i].name}`).setAttribute('style', '')
            }
          }
        }
        _this.dialogFull = !_this.dialogFull
      } else {
        elDialog.setAttribute('style', '')
        diogDom.$el.querySelector('.dialog-custom-con').setAttribute('style', '')
        this.imgSrc = require('../../assets/small.svg')
        if (!diogDom.$el.querySelector('.el-dialog__footer')) {
          // 不使用dialog自带的底部时，内容区距离底部42px
          elDialog.querySelector('.el-dialog__body').setAttribute('style', 'height:calc(100% - 42px);max-height: calc(100% - 42px);')
        }
        _this.dialogFull = !_this.dialogFull
        if (_this.classHeight.length > 0) {
          _this.$nextTick(function () {
            let lengt = _this.classHeight.length
            for (let i = 0; i < lengt; i++) {
              if (elDialog.querySelector(`.${_this.classHeight[i].name}`)) {
                let conHeight = diogDom.$el.querySelector('.dialog-custom-con').offsetHeight - _this.classHeight[i].head
                console.log(diogDom.$el.querySelector('.dialog-custom-con').offsetHeight, _this.classHeight[i].head, 'kaishi')
                elDialog.querySelector(`.${_this.classHeight[i].name}`).style.height = conHeight + 'px'
              }
            }
          })
        }
      }
    },
    clearStyle (diogDom) { // 打开弹窗时，初始化样式
      let _this = this
      let Dom = diogDom.$el
      let elDialog = Dom.querySelector('.el-dialog')
      elDialog.setAttribute('style', '')
      if (Dom.querySelector('.dialog-custom-con')) {
        Dom.querySelector('.dialog-custom-con').setAttribute('style', '')
      }
      if (_this.classHeight.length > 0) {
        let lengt = _this.classHeight.length
        for (let i = 0; i < lengt; i++) {
          if (Dom.querySelector(`.${_this.classHeight[i].name}`)) {
            Dom.querySelector(`.${_this.classHeight[i].name}`).setAttribute('style', '')
          }
        }
      }
      this.dialogFull = false
    }
  }
}
</script>
<style lang="less">
.dialog-custom{
    overflow: hidden;
    .dialog-tit{
      width:80%;
      font-size: 14px;
    }
    .el-dialog__body{
      padding-bottom:0;
    }
    .dialog-full{
      position: absolute;
      right:45px;
      top:0px;
      height:42px;
      width:20px;
      cursor: pointer;
      text-align: center;
      img{
        display: block;
        margin-top:14px;
        width:14px;
        height:14px;
      }
    }
    .el-dialog{
      position: absolute;
      width:530px;
      left: calc( 50% - 265px);
      top: 15%;
      .dialog-custom-con{
        position: relative;
        overflow-y: auto;
        max-height:415px;
        z-index: 3;
      }
      .el-button, .el-checkbox,.el-tabs__item{
        font-weight: normal;
      }
      .dialog-custom-hidden{
        overflow: hidden;
      }
      .el-dialog__header{
        padding:0 20px;
        line-height: 42px;
        height:42px;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        color:#4a4a4a;
        background:rgba(249,249,249,1);
        box-shadow:0px 1px 0px 0px rgba(221,221,221,1);
        .el-dialog__headerbtn{
          top:0;
          line-height: 42px;
        }
      }
      .el-dialog__footer{
        text-align: center;
        padding:10px 20px;
        .el-button{
          width:90px;
          height:30px;
          font-size: 12px;
          padding:0 15px;
        }
        .el-button+.el-button{
          margin-left:30px;
        }
      }
      .el-form{
        margin:0 auto;
        .el-form-item__content,.el-form-item__label{
          line-height: 38px;
          font-size: 12px;
        }
        .el-form-item__label{
          color:#4a4a4a;
        }
        .el-form-item{
          margin:10px auto 0 auto !important;
        }
        .el-form-item input{
          height:38px;
          line-height: 38px;
        }
        .el-input{
          width:100%;
        }
        .el-form-item__error{
          width:100%;
          position: relative;
          padding-top:5px;
        }
      }
      .el-form{
        overflow: hidden;
      }
    }
  }
.dialog-rb{
  position:absolute;
  right:0;
  height:15px;
  width:15px;
  bottom:0;
  z-index:8;
  cursor:se-resize;
}
.dialog-move-bg{
  position: fixed;
  left:0;
  top:0;
  bottom:0;
  right:0;
  background: transparent;
  z-index:99999;
  display: none;
  cursor: move;
}
//弹窗全屏
.diogFull{
  width:100%;
  .el-dialog{
    width:100% !important;
    left:0 !important;
    top:0;
    bottom:0;
    margin:0;
    .dialog-custom-con{
      max-height:100% !important;
      height:100% !important;
    }
    .el-dialog__body{
      max-height: calc(100% - 102px) !important;
      height: calc(100% - 102px) !important;
    }
  }
}
</style>
