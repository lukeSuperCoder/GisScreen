<!--
 * @Author: daidai
 * @Date: 2022-03-01 15:27:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-07 11:24:14
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\right-center.vue
-->
<template>
  <div v-if="pageflag" class="right_center_wrap beautify-scroll-def">
    <ul class="right_center">
      <li class="right_center_item" v-for="(item, i) in list" :key="i">
        <span class="orderNum">{{ i + 1 }}</span>
        <div class="inner_right">
          <div class="dibu"></div>
          <div class="flex">
            <div class="info">
              <span class="labels ">点赞数：</span>
              <span class="contents zhuyao"> {{ item.attitudes_count || 0 }}</span>
            </div>
            <div class="info">
              <span class="labels">转发数：</span>
              <span class="contents "> {{ item.comments_count || 0 }}</span>
            </div>
            <div class="info">
              <span class="labels">评论数：</span>
              <span class="contents warning"> {{ item.reposts_count || 0}}</span>
            </div>
          </div>

          <div class="flex">
            <div class="info">
              <span class="labels"> 舆情地点：</span>
              <span class="contents ciyao" style="font-size:12px"> {{ item.ip || '未知' }}</span>
            </div>
            <div class="info time">
              <span class="labels">发布时间：</span>
              <span class="contents" style="font-size:12px"> {{ new Date(item.created_at).toLocaleString() }}</span>
            </div>
          </div>
          <div class="flex">
            <div class="info overflow-ellipsis">
              <span class="labels">舆情内容：</span>
              <span class="contents ciyao" :title="item.text" :class="{ warning: item.text }" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"> {{ item.text || '' }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <!-- <Reacquire v-else @onclick="getData" style="line-height:200px" /> -->
</template>

<script>
import { currentGETById } from 'api/modules'
import Kong from '../../components/kong.vue'

export default {
  components: { Kong },
  data() {
    return {
      list: [],
      pageflag: true,
      page: 1,
      perPage: 50,
      total: 0,
      loading: false
    };
  },
  props: {
  },
  computed: {
    getCurrentId() {
      return this.$store.state.setting.id;
    }
  },
  created() {
    this.getData();
    // 添加滚动事件监听
    window.addEventListener('scroll', this.handleScroll);
  },
  watch: {
    getCurrentId: {
      handler() {
        this.getData();
      },
    }
  },
  beforeDestroy() {
    // 移除滚动事件监听
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    getData() {
      if (this.loading) return;
      this.loading = true;
      this.pageflag = true;
      currentGETById('getListByGeom', this.getCurrentId).then(res => {
        console.log('范围内舆情信息列表', res);
        if (res.code === 200) {
          this.list = res.data;
        } else {
          this.pageflag = false;
          // this.$Message.warning(res.msg);
        }
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    handleScroll() {
      const scrollElement = document.querySelector('.right_center_wrap');
      if (!scrollElement) return;
      
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      // 当滚动到底部时加载更多
      if (scrollHeight - scrollTop - clientHeight < 50 && !this.loading && this.list.length < this.total) {
        this.page++;
        this.getData();
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.right_center {
  width: 100%;
  height: 100%;

  .overflow-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .right_center_item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    padding: 10px;
    font-size: 14px;
    color: #fff;

    .orderNum {
      margin: 0 20px 0 -10px;
    }

    .inner_right {
      position: relative;
      height: 100%;
      width: 400px;
      flex-shrink: 0;
      line-height: 1.5;

      .dibu {
        position: absolute;
        height: 2px;
        width: 104%;
        background-image: url("../../assets/img/zuo_xuxian.png");
        bottom: -12px;
        left: -2%;
        background-size: cover;
      }
    }

    .info {
      margin-right: 10px;
      display: flex;
      align-items: center;

      .labels {
        flex-shrink: 0;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }

      .zhuyao {
        color: $primary-color;
        font-size: 15px;
      }

      .ciyao {
        color: rgba(255, 255, 255, 0.8);
      }

      .warning {
        color: #E6A23C;
        font-size: 15px;
      }
    }
  }
}

.right_center_wrap {
  overflow-y: auto;
  width: 100%;
  height: 250px;
  padding-right: 10px;

  /* 美化滚动条 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>