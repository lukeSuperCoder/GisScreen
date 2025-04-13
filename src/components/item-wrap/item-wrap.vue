<!--
 * @Author: daidai
 * @Date: 2022-03-01 09:16:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-29 15:12:34
 * @FilePath: \web-pc\src\pages\big-screen\components\item-wrap\item-wrap.vue
-->
<template>
  <dv-border-box-13 class="lr_titles">
    <div class="item_title" v-if="title !== ''">
      <div class="zuo"></div>
      <span class="title-inner"> &nbsp;&nbsp;{{ title }}&nbsp;&nbsp; </span>
      <div class="you"></div>
      <!-- 添加关闭按钮图标 -->
      <div v-if="isClose" class="close-icon" @click="closeTitle">
        <svg t="1744522198123" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2619" width="16" height="16"><path d="M872.838095 872.838095c-199.92381 199.92381-524.190476 199.92381-724.114285 0C-48.761905 672.914286-48.761905 351.085714 148.72381 151.161905 348.647619-48.761905 672.914286-48.761905 872.838095 151.161905s199.92381 521.752381 0 721.67619zM811.885714 209.67619c-165.790476-165.790476-436.419048-165.790476-602.209524 0s-165.790476 436.419048 0 602.209524 436.419048 165.790476 602.209524 0 168.228571-433.980952 0-602.209524z m-85.333333 509.561905l-7.314286 7.314286c-7.314286 7.314286-17.066667 9.752381-26.819047 9.752381-9.752381 0-19.504762-4.87619-26.819048-9.752381L512 572.952381l-151.161905 151.161905c-17.066667 17.066667-43.885714 17.066667-60.952381 0s-17.066667-43.885714 0-60.952381l151.161905-151.161905-153.6-153.6c-7.314286-7.314286-9.752381-17.066667-9.752381-26.819048s4.87619-19.504762 9.752381-26.819047l7.314286-7.314286c7.314286-7.314286 17.066667-9.752381 26.819047-9.752381 9.752381 0 19.504762 4.87619 26.819048 9.752381l153.6 153.6 151.161905-151.161905c17.066667-17.066667 43.885714-17.066667 60.952381 0s17.066667 43.885714 0 60.952381L572.952381 512l153.6 153.6c7.314286 7.314286 9.752381 17.066667 9.752381 26.819048s-2.438095 19.504762-9.752381 26.819047z" fill="#00eaff" p-id="2620"></path></svg>
      </div>
    </div>
    <div
      :class="title !== '' ? 'item_title_content' : 'item_title_content_def'"
    >
      <slot></slot>
    </div>
  </dv-border-box-13>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: () => "",
    },
    isClose: {
      type: Boolean,
      default: false,
    },
  },
  created() {},

  mounted() {},
  methods: {
    closeTitle() {
      this.$emit('close');
    },
  },
};
</script>
<style lang='scss' scoped>
$item-title-height: 38px;
$item_title_content-height: calc(100% - 38px);

.close-icon {
  position: absolute;
  right: 0;
  top: -5px;
  width: 16px;
  height: 16px;
  font-size: 16px;
  cursor: pointer;
}
.lr_titles {
  box-sizing: border-box;

:deep(.border-box-content)  {
    box-sizing: border-box;
    padding: 6px 16px 0px;
  }

  .item_title {
    height: $item-title-height;
    line-height: $item-title-height;
    width: 100%;
    color: #31abe3;
    text-align: center;
    // background: linear-gradient(to right, transparent, #0f0756, transparent);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .zuo,
    .you {
      width: 58px;
      height: 14px;
      background-image: url("../../assets/img/titles/zuo.png");
    }

    .you {
      transform: rotate(180deg);
    }
    .title-inner {
      font-weight: 900;
      letter-spacing: 2px;
      background: linear-gradient(
        92deg,
        #0072ff 0%,
        #00eaff 48.8525390625%,
        #01aaff 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .item_title_content {
    height: $item_title_content-height;
  }

  .item_title_content_def {
    width: 100%;
    height: 100%;
  }
}
</style>