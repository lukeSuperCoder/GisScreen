<!--
 * @Author: daidai
 * @Date: 2022-03-04 09:23:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-07 11:05:02
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\index.vue
-->
<template>
  <div class="contents">
   
    <!-- <div class="contetn_center">
      <CenterMap class="contetn_center_top" />
      <ItemWrap class="contetn_center-bottom" title="安装计划">
        <CenterBottom />
      </ItemWrap>
    </div> -->
    <div class="contetn_right">
      <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        title="舆情时间统计"
      >
        <RightTop />
      </ItemWrap>
      <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        title="舆情地区统计"
        style="padding: 0 10px 16px 10px"
      >
        <RightCenter />
      </ItemWrap>
      <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        title="舆情信息看板"
      >
        <RightBottom />
      </ItemWrap>
    </div>
    <div class="contetn_left-card">
      <!-- <div class="pagetab">
        <div class="item">实时监测</div>
      </div>
      <ItemWrap class="contetn_left-top contetn_lr-item" title="设备总览">
        <LeftTop/>
      </ItemWrap>
       -->
       <ItemWrap
       @close="closeDialog"
        v-show="isShow"
        isClose
        class="contetn_left-center contetn_lr-item" title="舆情信息详情">
        <LeftCenter />
      </ItemWrap>
      <ItemWrap
        v-show="isShow"
        class="contetn_left-top contetn_lr-item"
        title="舆情空间关联"
        style="padding: 0 10px 16px 10px"
      >
        <LeftBottom />
      </ItemWrap>
    </div>
    <div class="contetn_screen">
      <ScreenMap />
    </div>
  </div>
</template>

<script>
import LeftTop from './left-top.vue'
import LeftCenter from "./left-center.vue";
import LeftBottom from "./left-bottom.vue";
import CenterMap from "./center-map.vue";
import CenterBottom from "./center-bottom.vue";
import RightTop from "./right-top.vue";
import RightCenter from "./right-center.vue";
import RightBottom from "./right-bottom.vue";
import ScreenMap from '@/components/screen-map/screen-map.vue'

export default {
  components: {
    LeftTop,
    LeftCenter,
    LeftBottom,
    CenterMap,
    RightTop,
    RightCenter,
    RightBottom,
    CenterBottom,
    ScreenMap
  },
  data() {
    return {
      isShow: false
    };
  },
  filters: {
    numsFilter(msg) {
      return msg || 0;
    },
  },
  created() {
  },
  computed: {
    getCurrentId() {
      return this.$store.state.setting.id;
    }
  },
  watch: {
    getCurrentId: {
      handler(val) {
        if(val){
          this.isShow = true;
        }
      },
    }
  },
  mounted() {

  },
  methods: {
    closeDialog(){
      this.isShow = false;
      olMap.geomLayer.clearGeoms();
    }
  },
};
</script>
<style lang="scss" scoped>
// 内容
.contents {
  .contetn_left,
  .contetn_right {
    width: 540px;
    box-sizing: border-box;
    // padding: 16px 0;
  }

  .contetn_center {
    width: 720px;
  }

  //左右两侧 三个块
  .contetn_lr-item {
    height: 310px;
  }

  .contetn_center_top {
    width: 100%;
  }

  // 中间
  .contetn_center {
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .contetn_center-bottom {
    height: 315px;
  }

  //左边 右边 结构一样
  .contetn_left,
  .contetn_right {
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
  }
  .contetn_left-card{
    height: 60%;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
    right: 5rem;
    gap: 20px;
  }

  .contetn_screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
  }
}


@keyframes rotating {
    0% {
        -webkit-transform: rotate(0) scale(1);
        transform: rotate(0) scale(1);
    }
    50% {
        -webkit-transform: rotate(180deg) scale(1.1);
        transform: rotate(180deg) scale(1.1);
    }
    100% {
        -webkit-transform: rotate(360deg) scale(1);
        transform: rotate(360deg) scale(1);
    }
}
</style>
