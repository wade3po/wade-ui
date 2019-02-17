## 简介
纯属个人开发的小的vue组件，比不上各种大UI库，当做一种学习。

## 使用
npm install wade-tools --S

##### Toast组件
`import {Toast} from 'wade-ui'`


`Toast("想要弹窗的内容", 3000(时间，默认2000毫秒));`

##### wScrollUp上拉加载更多

`import {wScrollUp} from 'wade-ui'`

```
<w-scroll-up @loadMore="loadMore" :bottom-distance="10">
    //内容
</w-scroll-up>
```

| Attribute | Type | Default | Description | 
| ------ | ------ |------ |------ |
| loadMore | function | -- | 上拉到底部触发的方法 |
| bottom-distance | number | -- | 距离底部多少就触发 |

此组件，没有提供加载时动画，所以可以根据自身设计在loadMore对应方法去控制加载时动画。

##### wScrollDown下拉刷新
`import {wScrollDown} from 'wade-ui'`

```
<w-scroll-down loadMaxHeight="80" loadMinHeight="40" @refresh="refresh" :refreshEnd="freshFlag">
      <div slot="load">
        //加载动画内容
      </div>
      
      <div slot="content">
        //列表内容
      </div>
</w-scroll-down>
```

| Attribute | Type | Default | Description | 
| ------ | ------ |------ |------ |
| refresh | function | -- | 刷新方法 |
| refreshEnd | boolean | -- | 刷新结束，设置为true隐藏加载动画 |
| loadMaxHeight | number | -- | 加载动画可以下拉最大高度 |
| loadMinHeight | number | -- | 加载动画最小下拉放手可刷新高度 |

##### wScroll上拉加载、下拉刷新
`import {wScroll} from 'wade-ui'`

```
<w-scroll
      @refresh="refresh"
      @loadMore="loadMore"
      :refreshEnd="freshFlag"
      bottomDistance="20"
      loadMaxHeight="60"
      loadMinHeight="20">
      <div slot="load">
        //加载动画内容
      </div>

      <div slot="content">
        //列表内容
      </div>
    </w-scroll>
```

| Attribute | Type | Default | Description | 
| ------ | ------ |------ |------ |
| loadMore | function | -- | 上拉到底部触发的方法 |
| refresh | function | -- | 刷新触发方法 |
| bottom-distance | number | -- | 距离底部多少触发loadMore |
| loadMaxHeight | number | -- | 加载动画可以下拉最大高度 |
| loadMinHeight | number | -- | 加载动画最小下拉放手可刷新高度 |
| refreshEnd | boolean | -- | 刷新结束，设置为true隐藏加载动画 |

##### 遮罩下禁止滚动
`import {disableScroll} from 'wade-ui'`

disableScroll(boolean)

使用了定位fixed，遮罩下的会回到顶部，为了隐藏遮罩的时候回到原来位置，使用了cookie，但是隐藏遮罩的时候清除了。

| Attribute | Type | Default | Description | 
| ------ | ------ |------ |------ |
| boolean | boolean | false | true就是禁止滚动，false开启滚动 |

##### 移动端左滑右滑
`import {wMoveJudge} from 'wade-ui'`

```
    <move-judge @moveJudge="moveJudge" 
    @moveDistance="moveDistance"
    margin="50">
      //内容
    </move-judge>
```

| Attribute | Type | Default | Description | 
| ------ | ------ |------ |------ |
| moveJudge | function | -- | 返回left、right判断左右 |
| moveDistance | function | -- | 返回移动过程X移动的距离 |
| margin | number | 100 | 滑动最小距离触发moveJudge |

##### 移动端picker组件
`import {wPicker} from 'wade-ui'`

```
    <w-pick :dataList="list" @confirm="confirm" 
    @cancel="cancel" title="标题"></w-pick>
```

| Attribute | Type | Default | Description | 
| ------ | ------ |------ |------ |
| dataList | Array | -- | 展示的数据数组 |
| cancel | function | -- | 取消回调 |
| confirm | function | -- | 返回选中index数组 |
| title | String | -- | 标题 |