<template>
  <div id="scroll">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['loadMore', 'bottomDistance'],
    data() {
      return {
        windowHeight: '',
        contentOffSetHeight: '',
        downT: ''
      }
    },
    components: {},
    mounted() {
      if(history.scrollRestoration){
        history.scrollRestoration= 'manual';
      };
      this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight;//可视窗口高度
      this.contentOffSetHeight = document.getElementById('scroll').offsetTop;//容器距离顶部高度
      window.addEventListener('scroll', this.onScroll);
    },
    methods: {
      onScroll() {
        if(this.downTime){
          clearTimeout(this.downTime);
        };
        this.downTime = setTimeout(() => {
          let contentHeight = document.getElementById('scroll').clientHeight;//容器高度
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//窗口滚动条高度
          if (contentHeight + this.contentOffSetHeight - this.windowHeight - scrollTop <= (this.bottomDistance || 0)) {
            //加载更多操作
            this.$emit('loadMore')
          }
        }, 200);
      }
    },
    beforeDestroy(){
      window.scrollTo(0, 0);
      window.removeEventListener('scroll', this.onScroll)
    }
  }
</script>

<style scoped>

</style>
