<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked == 1"
              @change="updatecartischeck(item.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, item)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, item)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, item)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum * item.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(item.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllcheck"
          @change="isAllchecked($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// 导入lodash 使用lodash中的节流函数(throttle)
import _ from "lodash";

// 第二种 按需导入lodash中的节流阀(throttle) 好处就是打包项目的时候体积会小一点
//import throttle from "lodash/throttle";

export default {
  name: "ShopCart",
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      // 发送获取个人购物车请求
      this.$store.dispatch("GetShopcart");
    },
    // 商品数量发生变化[节流阀]
    handler: _.throttle(async function (type, skuNum, item) {
      // type 用户的操作 skuNum -1 或 1 或 用户输入的值   item当前商品信息
      // 修改购物车接口 参数 skuNum:负数或正数  skuId要修的商品的id
      switch (type) {
        // 更具type判断用户是点击了-号还是+号 或者是输入的数据
        case "minus":
          // 点击了-号 说明当前的商品数量的基础上减1 前提当前商品数量大于1
          skuNum = item.skuNum > 1 ? -1 : 0;
          break;
        case "add":
          // 点击了+号 说明当前的商品数量的基础上加1
          skuNum = 1;
          break;
        case "change":
          // 用户输入值
          // 问题1:用户输入的是正确的值
          if (isNaN(skuNum) || skuNum < 1) {
            // 异常情况
            skuNum = 0;
          } else {
            skuNum = parseInt(skuNum) - item.skuNum;
          }
          break;
      }
      // 发生修改购物车请求
      try {
        await this.$store.dispatch("addGoodCart", {
          skuId: item.skuId,
          skuNum: skuNum,
        });
        // 刷新数据
        this.getdata();
      } catch (error) {}
      // console.log(skuNum);
    }, 500),
    // 删除购物车商品·
    async deleteCart(id) {
      try {
        await this.$store.dispatch("deleteCartById", id);
        // 刷新数据
        this.$message.success("删除成功");
        this.getdata();
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    // 修改某个商品的勾选状态
    async updatecartischeck(skuId, event) {
      try {
        // 带给服务器的参数isChecked 不是布尔值 应该是0|1
        // event.target.checked拿到当前的勾选状态
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("updateChecked", {
          skuId: skuId,
          isChecked: isChecked,
        });
        // 刷新数据
        this.getdata();
      } catch {
        this.$message.error("修改商品勾选状态失败");
      }
    },
    //删除勾选状态的商品
    async deleteAllChecked() {
      try {
        await this.$store.dispatch("deleteAllCheckedCart");
        // 刷新数据
        this.getdata();
      } catch {
        this.$message.error("删除购物车勾选状态的商品失败");
      }
    },
    // 全选商品或者全不选商品
    async isAllchecked(event) {
      try {
        // 拿到全选多选框选中状态
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("updateAllcartChecked", isChecked);
        // 刷新数据
        this.getdata();
      } catch {
        this.$message.error("修改全部购物车商品状态失败");
      }
    },
  },
  computed: {
    //映射vuex getters
    ...mapGetters(["cartList"]),
    // 商品信息
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 总价格
    allPrice() {
      let all = 0;
      this.cartInfoList.forEach((element) => {
        //技术出勾选状态的商品总价钱
        if (element.isChecked) {
          all += element.skuNum * element.skuPrice;
        }
      });
      return all;
    },
    // 是否全选
    isAllcheck() {
      // every  全部为true 才会返回true 一个false就返回false
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 75rem;
  margin: 0 auto;

  h4 {
    margin: 0.5625rem 0;
    font-size: 0.875rem;
    line-height: 1.3125rem;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 0.0625rem solid #ddd;
      padding: 0.625rem;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 0.9375rem 0;
      border: 0.0625rem solid #ddd;

      .cart-list {
        padding: 0.625rem;
        border-bottom: 0.0625rem solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 5.125rem;
            height: 5.125rem;
            float: left;
          }

          .item-msg {
            float: left;
            width: 9.375rem;
            margin: 0 0.625rem;
            line-height: 1.125rem;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 0.0625rem solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 0.375rem;
            text-align: center;
            padding: 0.5rem;
          }

          input {
            border: 0.0625rem solid #ddd;
            width: 2.5rem;
            height: 2.0625rem;
            float: left;
            text-align: center;
            font-size: 0.875rem;
          }

          .plus {
            border: 0.0625rem solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 0.375rem;
            text-align: center;
            padding: 0.5rem;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 1rem;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 0.0625rem solid #ddd;

    .select-all {
      padding: 0.625rem;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 0.625rem;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 0.625rem;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 1.625rem;
        float: left;
        padding: 0 0.625rem;
      }

      .sumprice {
        width: 12.5rem;
        line-height: 1.375rem;
        float: left;
        padding: 0 0.625rem;

        .summoney {
          color: #c81623;
          font-size: 1rem;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 6rem;
          height: 3.25rem;
          line-height: 3.25rem;
          color: #fff;
          text-align: center;
          font-size: 1.125rem;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>