import Vue from 'vue'
import main from './main'

const ToastConstructor = Vue.extend(main)

function Toast(text, duration = 2000) {
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data() {
      return {
        text:text,
        showWrap:true,
        showContent:true
      }
    }
  })
  document.body.appendChild(toastDom.$el)
  // 提前执行动画
  setTimeout(() => {toastDom.showContent = false} ,duration - 1500)
  setTimeout(() => {
    toastDom.showWrap = false;
    document.body.removeChild(toastDom.$el);
  } ,duration)
}

export default Toast
