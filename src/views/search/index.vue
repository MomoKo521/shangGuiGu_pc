<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 商品分类面包屑 -->
            <li class="with-x" v-show="params.categoryName">
              {{ params.categoryName }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-show="params.keyword">
              {{ params.keyword }}<i @click="removekeyword">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-show="params.trademark">
              {{ params.trademark.split(":")[1]
              }}<i @click="removetrademark">×</i>
            </li>
            <!-- 商品属性面包屑 -->
            <li
              class="with-x"
              v-for="(item, index) in params.props"
              :key="index"
            >
              {{ item.split(":")[1] }}<i @click="remoAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <!-- 导航栏 排序-->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- isOne为true 综合添加active类名-->
                <li :class="{ active: isOne }" @click="orderChange('1')">
                  <a
                    >综合
                    <i
                      v-show="isOne"
                      :class="{
                        'el-icon-caret-top': isasc,
                        'el-icon-caret-bottom': isdesc,
                      }"
                    ></i
                  ></a>
                </li>
                <!-- isTwo为true 价格添加active类名-->
                <li :class="{ active: isTwo }" @click="orderChange('2')">
                  <a
                    >价格
                    <i
                      v-show="isTwo"
                      :class="{
                        'el-icon-caret-top': isasc,
                        'el-icon-caret-bottom': isdesc,
                      }"
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(item, index) in goodsList"
                :key="index"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${item.id}`"
                      ><img v-lazy="item.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="item.title">{{
                      item.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <Pagination
            :continues="5"
            :pageNO="params.pageNo"
            :pagesize="params.pageSize"
            :total="total"
            @getPageNo="getPageNo"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      // search请求参数
      params: {
        // 一级分类id
        category1Id: "",
        //  二级分类id
        category2Id: "",
        //  三级分类id
        category3Id: "",
        //  分类名字
        categoryName: "",
        //  关键字
        keyword: "",
        //  排序
        // 1:asc 代表 综合升序
        // 1:desc 代表 综合降序
        // 2:asc 代表 价格升序
        // 2:desc 代表 价格降序
        // 默认 综合降序
        order: "1:desc",
        //  第一页
        pageNo: 1,
        //  每页显示数据条数
        pageSize: 10,
        //  平台售卖属性操作带的参数
        props: [],
        //  品牌
        trademark: "",
      },
    };
  },
  methods: {
    // 发送获取search组件数据请求
    getdata() {
      this.$store.dispatch("getSearchList", this.params);
    },
    //  点击按钮删除分类面包屑
    // 且重新发送请求
    removeCategoryName() {
      (this.params.categoryName = ""),
        //  但是params参数要保留
        // 这里解释一下为什么不用重新获取数据 因为watch 监听了serach路由  如果serach路由发送变化（params，query发生变化）就会重新发起数据请求
        this.$router.push(
          { name: "search", params: this.$route.params },
          () => {},
          () => {}
        );
    },
    //  点击按钮删除关键字面包屑
    removekeyword() {
      this.params.keyword = "";
      // 重新跳转路由
      this.$router.push({ name: "search", query: this.$route.query });
      //全局事件总线 通知兄弟组件Header清除关键字
      this.$bus.$emit("clear");
    },
    // 自定义事件 点击子组件品牌发起axios请求
    trademarkInfo(vlaue) {
      //传过来品牌信息vlaue是对象
      // 整理字段数据格式：要求："ID：品牌名称"
      this.params.trademark = `${vlaue.tmId}:${vlaue.tmName}`;
      // 重新发起axios请求
      this.getdata();
    },
    // 点击删除品牌面包屑
    removetrademark() {
      this.params.trademark = "";
      // 重新发起axios请求
      this.getdata();
    },
    // 自定义事件 点击子组件商品属性发起axios请求
    attrInfo(item, value) {
      //商品属性参数格式:['属性id：属性值：属性名']
      let props = `${item.attrId}:${value}:${item.attrName}`;
      // 数组去重
      // indexOf获取要查找值的下标 没有就返回-1
      if (this.params.props.indexOf(props) == -1) {
        this.params.props.push(props);
      }
      // 重新发起axios请求
      this.getdata();
    },
    // 点击删除商品属性面包屑
    remoAttr(idnex) {
      this.params.props.splice(idnex, 1);
      // 重新发送axios请求
      this.getdata();
    },
    // 点击切换商品排序
    orderChange(falg) {
      // falg 如果为1就说明用户点击的综合  falg为2说明用户点击的是价格
      // 根据计算属性isasc 判断当前是降序还是升序 如果是降序那么就取反 升序也是如此
      let order = `${falg}:${this.isasc ? "desc" : "asc"}`;
      this.params.order = order;
      // 重新获取数据
      this.getdata();
    },
    //自定义事件 获取用户点击的页码数
    getPageNo(page) {
      this.params.pageNo = page;
      //重新获取数据
      this.getdata();
    },
  },
  created() {
    //  object.assign ：ES6新增语法，合并对象 Object.assign
    Object.assign(this.params, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getdata();
  },
  watch: {
    // 监听路由的信息是否发送变化 发送变化就更新最新this.params参数 并发起请求
    $route(newValue, oldValue) {
      //每一次请求完毕想要把一二三级分类id清空, 因为一二三级分类只需要一个有值，如果用户点击一级分类，在点击二级分类 那么params请求参数一二级参数都会有值
      this.params.category1Id = "";
      this.params.category2Id = "";
      this.params.category3Id = "";
      // 更新params参数
      Object.assign(this.params, this.$route.query, this.$route.params);

      // 再次发起数据请求
      this.getdata();
    },
  },
  computed: {
    // mapGetters里卖弄的写法：传递的数组，因为getters计算属性是没有划分仓库的【home，search】，所以可以直接拿到
    ...mapGetters(["goodsList"]),
    // 判断是否综合拥有active类名
    isOne() {
      // 如果order中存在1说明综合添加active类名
      return this.params.order.indexOf("1") != -1;
    },
    // 判断是否价格拥有active类名
    isTwo() {
      // 如果order中存在2说明价格添加active类名
      return this.params.order.indexOf("2") != -1;
    },
    // 判断综合是否升序或者降序
    isasc() {
      return this.params.order.indexOf("asc") != -1;
    },
    // 判断价格是否升序这降序
    isdesc() {
      return this.params.order.indexOf("desc") != -1;
    },
    // 获取当前数据总共条数
    ...mapState({
      total: (state) => {
        return state.search.searchList.total;
      },
    }),
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;

                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>