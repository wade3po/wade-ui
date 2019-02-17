<template>
  <div class="">
    <div class="touch-movue-left-right"
         @touchstart="touchStart($event)"
         @touchend="touchEnd($event)"
         @touchmove="touchMove($event)"
    :style="{'left': moveMar + 'px'}">
    <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['moveJudge', 'moveDistance', 'margin'],
    data() {
      return {
        startX: 0,
        moveMar: 0
      }
    },
    components: {},
    mounted() {

    },
    methods: {
      touchStart(e){
        this.startX = e.targetTouches[0].pageX;
      },
      touchMove(e){
        this.moveMar = e.targetTouches[0].pageX - this.startX;
        this.$emit('moveDistance', this.moveMar);
      },
      touchEnd(e){
        if(this.moveMar > (this.margin || 100)){
          this.$emit('moveJudge', 'right');
        }else if(this.moveMar < (-this.margin || -100)){
          this.$emit('moveJudge', 'left');
        }
        this.moveMar = 0;
      },
    }
  }
</script>

<style scoped>
.touch-movue-left-right{
  position: relative;
  width: 100%;
}
</style>
