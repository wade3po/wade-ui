<template>
  <div class="wrap" v-if="showWrap" :class="showContent ?'fadein':'fadeout'">{{text}}</div>
</template>

<style scoped>
  .wrap{
    z-index: 100;
    position: fixed;
    left: 50%;
    top:50%;
    background: rgba(0,0,0,.6);
    padding: 6px;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    color:#fff;
  }
  .fadein {
    animation: in 0.5s;
  }
  .fadeout {
    animation: out 0.5s;
    opacity: 0;
  }
  @keyframes in {
    0% {
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes out {
    0% {
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
</style>
