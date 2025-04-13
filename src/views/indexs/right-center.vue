<!--
 * @Author: daidai
 * @Date: 2022-03-01 15:51:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-29 15:12:46
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\right-bottom.vue
-->
<template>
  <div class="right_bottom">
    <dv-capsule-chart :config="config" style="width:100%;height:260px" />
  </div>
</template>

<script>
import { currentGET } from 'api/modules'
export default {
  data() {
    return {
      page: 1,
      total: 0,
      perPage: 8, // 每页显示数量
      config: {
        showValue: true,
        unit: "次",
        data: []
      },
    };
  },
  created() {
    this.getData()
  },
  computed: {
    // 计算总页数
    totalPages() {
      return Math.ceil(this.total / this.perPage)
    }
  },
  mounted() { },
  beforeDestroy() {
    this.clearData()
  },
  methods: {
    clearData() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    //轮询
    switper() {
      if (this.timer) {
        return
      }
      let looper = (a) => {
        this.getData()
      };
      this.timer = setInterval(looper, this.$store.state.setting.echartsAutoTime);
    },
    getData() {
      this.pageflag = true
      currentGET('big7', { 
        page: this.page, 
        per_page: this.perPage 
      }).then(res => {
        if (!this.timer) {
          console.log('舆情地区统计', res);
        }
        if (res.code === 200) {
          this.config = {
            ...this.config,
            data: res.data
          }
          this.total = res.total;
          
          // 判断是否需要翻页
          if (this.page >= this.totalPages) {
            this.page = 1 // 回到第一页
          } else {
            this.page++ // 下一页
          }
          
          this.switper()
        } else {
          this.pageflag = false
          this.srcList = []
          this.$Message({
            text: res.msg,
            type: 'warning'
          })
        }
      })
    },
  },
};
</script>
<style lang='scss' scoped>
.list_Wrap {
  height: 100%;
  overflow: hidden;
  :deep(.kong)   {
    width: auto;
  }
}

.sbtxSwiperclass {
  .img_wrap {
    overflow-x: auto;
  }

}

.right_bottom {
  box-sizing: border-box;
  padding: 0 16px;

  .searchform {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    .searchform_item {
      display: flex;
      justify-content: center;
      align-items: center;

      label {
        margin-right: 10px;
        color: rgba(255, 255, 255, 0.8);
      }

      button {
        margin-left: 30px;
      }

      input {}
    }
  }

  .img_wrap {
    display: flex;
    // justify-content: space-around;
    box-sizing: border-box;
    padding: 0 0 20px;
    // overflow-x: auto;

    li {
      width: 105px;
      height: 137px;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      // background: #84ccc9;
      // border: 1px solid #ffffff;
      overflow: hidden;
      flex-shrink: 0;
      margin: 0 10px;

      img {
        flex-shrink: 0;
      }
    }




  }

  .noData {
    width: 100%;
    line-height: 100px;
    text-align: center;
    color: rgb(129, 128, 128);

  }
}
</style>