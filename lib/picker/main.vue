<template>
  <div class="w-picker-wrapper">
    <div class="w-content-wrapper">
      <p class="w-title-btn">
        <span class="w-cancel" @click="enterCancel(false)">取消</span>
        <span class="w-title">{{title}}</span>
        <span class="w-enter" @click="enterCancel(true)">确定</span>
      </p>

      <div class="w-pick-list">
        <p class="line-top"></p>
        <p class="line-bottom"></p>
        <div class="w-item-wrapper" v-for="(val, index) in dataList"
             :class="'w-item-wrapper' + dataList.length">
          <ul :id="'list' + index" @touchend="touchEnd($event, index)" @touchstart="touchStart($event)">
            <li>&nbsp;</li>
            <li>&nbsp;</li>
            <li v-for="(listItem, iIndex) in val" :class="listItem.class">{{listItem.value}}</li>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['title', 'dataList', 'confirm', 'cancel'],
    data() {
      return {
        dataIndex: [],
        touchFlag: false
      }
    },
    components: {},
    mounted() {
      this.initData();
      this.addListener();
    },
    methods: {
      //初始化数据
      initData(){
        for(let i = 0;i < this.dataList.length;i++){
          this.dataIndex[i] = 0;
        };
        this.changeCurrentIndex();
      },
      //改变当前选中index
      changeCurrentIndex(){
        for(let i = 0;i < this.dataList.length;i++){
          for(let j = 0;j < this.dataList[i].length;j++){
            this.dataList[i][j].class = '';
          };
          this.dataList[i][this.dataIndex[i]].class = 'active';
        };
        this.$forceUpdate(this.dataList);
      },
      //添加监听滚动
      addListener(){
        for(let i = 0;i < this.dataList.length;i++){
          let timer;
          let elId = document.getElementById('list' + i);
          elId.addEventListener('scroll', () => {
            if(this.touchFlag){
              return
            };
            if(timer){
                clearTimeout(timer)
            };
            timer = setTimeout(() => {
              this.changScroll(elId);
            },10);
          });
        };
      },
      //手指没放开不触发滚动定时器
      touchStart(){
        this.touchFlag = true;
      },
      //手指放开没滚动手动触发
      touchEnd(ev, id){
        this.touchFlag = false;
        this.changScroll(document.getElementById('list' + id));
      },
      //改变当前选中位置
      changScroll(elId){
        let index = Math.round(elId.scrollTop / 40);
        elId.scrollTop = index * 40;
        let dataIndex = elId.id.charAt(elId.id.length - 1);
        if(this.dataIndex[dataIndex] != index){
          this.dataIndex[dataIndex] = index;
          this.changeCurrentIndex();
        };
      },
      //确定/取消
      enterCancel(status){
        if(status){
          this.$emit('confirm', this.dataIndex);
        }else{
          this.$emit('cancel');
        };
      }
    }
  }
</script>

<style scoped>
  ul, li{
    list-style: none;
  }
  .w-picker-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0,.2);
  }
  .w-content-wrapper{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 260px;
  }
  .w-title-btn{
    width: 100%;
    height: 44px;
    border-bottom: solid #eee 1px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    box-sizing: border-box;
    color: #333;
    background: #fff;
  }
  .w-title-btn .w-cancel{
    float: left;
    padding: 0 15px;
    color: #147ffa;
  }
  .w-title-btn .w-title{
    font-size: 16px;
    font-weight: 500;
  }
  .w-title-btn .w-enter{
    float: right;
    padding: 0 15px;
    color: #147ffa;
  }
  .w-pick-list{
    position: relative;
    clear: both;
    width: 100%;
    height: 200px;
    padding: 10px 0;
    font-size: 16px;
    color: #aaa;
    background: #fff;
  }
  .w-pick-list .line-top{
    position: absolute;
    top: 90px;
    height: 1px;
    width: 100%;
    background: #eee;
  }
  .w-pick-list .line-bottom{
    position: absolute;
    top: 130px;
    height: 1px;
    width: 100%;
    background: #eee;
  }
  .w-pick-list .w-item-wrapper{
    overflow: hidden;
    float: left;
    height: 100%;
  }
  .w-pick-list .w-item-wrapper1{width: 100%;}
  .w-pick-list .w-item-wrapper2{width: 50%;}
  .w-pick-list .w-item-wrapper3{width: 33.33333%;}
  .w-pick-list .w-item-wrapper4{width: 25%;}
  .w-pick-list .w-item-wrapper5{width: 20%;}
  .w-pick-list ul{
    overflow-y: scroll;
    height: 100%;
    width: 110%;
    padding-right: 10%;
    box-sizing: border-box;
  }
  .w-pick-list li{
    line-height: 40px;
    box-sizing: border-box;
  }
  .w-pick-list li.active{
    color: #147ffa;
  }
</style>
