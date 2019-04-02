import Vue from 'vue'
// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {
  bind (el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.dialog-tit')
    dialogHeaderEl.style.cursor = 'move'
    dialogHeaderEl.onmousedown = (e) => {
      e = e || event
      const dragBg = el.querySelector('.dialog-move-bg')
      let dragDom = el.querySelector('.el-dialog')
      const sty = {
        left: dragDom.offsetLeft,
        top: dragDom.offsetTop
      }
      dragBg.style.display = 'block'
      dragBg.style.cursor = 'move'
      // 鼠标按下时，计算弹窗距离可视区的距离----鼠标的位置减去‘dialog-tit’这个dom元素的offset
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop
      let styL, styT
      styL = sty.left
      styT = sty.top
      document.onmousemove = function (e) {
        // 通过事件委托，计算鼠标移动的距离
        e = e || event
        const l = e.clientX - disX
        const t = e.clientY - disY
        // 移动当前元素
        if ((l + styL) < -(dragDom.offsetWidth / 2)) { // 左移不超过宽度的一半

        } else if ((el.offsetWidth - l - styL) < (dragDom.offsetWidth / 2)) { // 右移不超过宽度的一半

        } else {
          dragDom.style.left = `${l + styL}px`
        }
        if (t > 0) { // 下移
          if ((el.offsetHeight - t - styT) > 60) { // 距离最下方，露出60px
            dragDom.style.top = `${t + styT}px`
          }
        } else { // 上移
          if ((t + styT) >= 0) {
            dragDom.style.top = `${t + styT}px`
          } else {
            dragDom.style.top = '0px'
          }
        }
        // 使用js禁止用户选中网页上的内容，IE及Chrome下的方法一样。
        document.onselectstart = function () { return false }
        return false
      }

      document.onmouseup = function (e) {
        document.onmousemove = null
        dragBg.style.display = 'none'
        document.onselectstart = function () { return true }
        document.onmouseup = null
        return true
      }
    }
  }
})

// v-dialogDragWidth: 弹窗宽度拖大 拖小
Vue.directive('dialogDragWidth', {
  bind (el, binding, vnode, oldVnode) {
    el.onmousedown = (e) => {
      e = e || event
      const dragDom = binding.value.el.$el.querySelector('.el-dialog')
      const dragBg = binding.value.el.$el.querySelector('.dialog-move-bg')
      const dragHead = binding.value.el.$el.querySelector('.el-dialog__header')
      const dragBody = binding.value.el.$el.querySelector('.el-dialog__body')
      const dragCon = binding.value.el.$el.querySelector('.dialog-custom-con')
      const dragFoot = binding.value.el.$el.querySelector('.el-dialog__footer')

      dragBg.style.display = 'block'
      dragBg.style.cursor = 'se-resize'
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX
      const disY = e.clientY
      const oldWidth = dragDom.offsetWidth
      const oldHeight = dragDom.offsetHeight
      let headFootHeight = dragHead.offsetHeight + dragBody.offsetHeight - dragCon.offsetHeight
      if (dragFoot) {
        headFootHeight = headFootHeight + dragFoot.offsetHeight
      }
      document.onmousemove = function (e) {
        e = e || event
        e.preventDefault() // 移动时禁用默认事件
        // 通过事件委托，计算移动的距离
        let l = e.clientX - disX + oldWidth
        let h = e.clientY - disY + oldHeight
        if (l < 350) { // 最小宽度为350px
          l = 350
        }
        if (h < 190) { // 最小高度为190px
          h = 190
        }
        if (l >= binding.value.el.$el.offsetWidth) { // 最宽不超过屏幕的宽度
          l = binding.value.el.$el.offsetWidth
        }
        if (h >= binding.value.el.$el.offsetHeight) { // 最高不超过屏幕的高度
          h = binding.value.el.$el.offsetHeight
        }
        dragDom.style.width = `${l}px`
        dragDom.style.height = `${h}px`
        dragCon.style.height = (h - headFootHeight) + 'px'
        dragCon.style.maxHeight = (h - headFootHeight) + 'px'
        if (binding.value.classHeight.length > 0) {
          let lengt = binding.value.classHeight.length
          for (let i = 0; i < lengt; i++) {
            if (dragDom.querySelector(`.${binding.value.classHeight[i].name}`)) {
              dragDom.querySelector(`.${binding.value.classHeight[i].name}`).style.height = (h - headFootHeight - Number(binding.value.classHeight[i].head)) + 'px'
            }
          }
        }
        document.onselectstart = function () { return false }
        return false
      }

      document.onmouseup = function (e) {
        const dragBg = binding.value.el.$el.querySelector('.dialog-move-bg')
        dragBg.style.display = 'none'
        document.onmousemove = null
        document.onmouseup = null
        document.onselectstart = function () { return true }
        return true
      }
    }
  }
})
