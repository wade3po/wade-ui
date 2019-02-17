<template>
  <div class="" id="scroll"
       @touchstart="touchStart($event)"
       @touchmove="touchMove($event)"
       @touchend="touchEnd($event)">
    <div :style="{'height': loadShowHeight + 'px'}" style="overflow: hidden">
      <slot name="load"></slot>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script>

  export default {
    props: ['loadMaxHeight', 'loadMinHeight', 'refresh', 'refreshEnd', 'loadMore', 'bottomDistance'],
    data() {
      return {
        scrollTop: 0,
        startY: 0,
        loadShowHeight: 0,
        windowHeight: '',
        contentOffSetHeight: '',
        downT: ''
      }
    },
    components: {},
    mounted() {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if(history.scrollRestoration){
        history.scrollRestoration= 'manual';
      };
      this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      this.contentOffSetHeight = document.getElementById('scroll').offsetTop;
      window.addEventListener('scroll', this.onScroll);
    },
    methods: {
      touchStart(e){
        this.startY = e.targetTouches[0].pageY;
      },
      touchMove(e){
        if(this.scrollTop == 0){
          let moveDistance = e.targetTouches[0].pageY - this.startY;
          if(moveDistance > 0 && moveDistance <= (this.loadMaxHeight || 30)){
            this.loadShowHeight = moveDistance;
          };
        };
      },
      touchEnd(){
        if(this.loadShowHeight >= (this.loadMinHeight || 20)){
          this.$emit('refresh', false);
        }else{
          this.loadShowHeight = 0;
        };
      },
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
    watch:{
      refreshEnd(val){
        if(val){
          this.loadShowHeight = 0;
        };
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
