<template>
  <div class="" id="refresh"
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
        props: ['loadMaxHeight', 'loadMinHeight', 'refresh', 'refreshEnd'],
        data() {
            return {
                scrollTop: 0,
                startY: 0,
                loadShowHeight: 0
            }
        },
        components: {},
        mounted() {
            this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
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
        },
        watch:{
            refreshEnd(val){
                if(val){
                    this.loadShowHeight = 0;
                };
            }
        }
    }
</script>

<style scoped>

</style>
