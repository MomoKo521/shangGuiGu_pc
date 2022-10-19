<template>
  <div class="pagination">
    <!-- 上半 -->
    <button v-if="starrtNumAdnEndNum.start > 1" @click="$emit('getPageNo', 1)">
      1
    </button>
    <button
      :disabled="starrtNumAdnEndNum.start == 1"
      @click="$emit('getPageNo', pageNO - 1)"
    >
      上一页
    </button>
    <button v-if="starrtNumAdnEndNum.start > 2">···</button>
    <!-- 中间 -->
    <button
      :class="{ active: pageNO == page }"
      v-for="(page, index) in starrtNumAdnEndNum.end"
      :key="index"
      v-if="page >= starrtNumAdnEndNum.start"
      @click="$emit('getPageNo', page)"
    >
      {{ page }}
    </button>
    <!-- 下半 -->
    <button v-if="starrtNumAdnEndNum.end < totalpage - 1">···</button>
    <button
      v-if="starrtNumAdnEndNum.end < totalpage"
      @click="$emit('getPageNo', totalpage)"
    >
      {{ totalpage }}
    </button>
    <button
      :disabled="starrtNumAdnEndNum.end == totalpage"
      @click="$emit('getPageNo', pageNO + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["continues", "pageNO", "pagesize", "total"],
  computed: {
    // 计算出总共多少页 向上取整（ 数据总数/展示多多少条数据）
    totalpage() {
      //防止异步数据不能立马拿到  献给一个默认值
      let total = this.total;
      if (total === undefined) {
        total = 0;
      }
      return Math.ceil(total / this.pagesize);
    },
    //计算出练习的页码的起始数字与结束数字
    starrtNumAdnEndNum() {
      // 先定义两个初始变量 表示起始页码和结束页码
      const { continues, pageNO, totalpage } = this;
      let start = 0;
      let end = 0;
      // 有两种情况
      //正常情况  总页码数大于要展示的页码数 例如 总页数10  按钮5
      // 异常情况 总页码数小于要展示的页码数
      if (totalpage > continues) {
        // 正常情况
        // 正常起始数字
        start = pageNO - parseInt(continues / 2);
        end = pageNO + parseInt(continues / 2);
        //把不正常现象纠正
        // 如果当前页面数为1  那么起始数字会变成负数 我们得纠正
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 如果当前页面数为总页码数  那么结束数字会溢出 我们得纠正
        if (end > totalpage) {
          end = totalpage;
          start = totalpage - continues + 1;
        }
      } else {
        // 异常情况
        start = 1;
        end = totalpage;
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
  .active {
    background-color: blue;
  }
}
</style>