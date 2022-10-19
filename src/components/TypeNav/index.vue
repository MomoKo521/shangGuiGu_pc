<template>
  <!-- 三级联动 -->
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2 class="all" @mouseenter="changeindex(-1)"  @mouseleave="leaveindex">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
      <div class="sort" @mouseleave="leaveindex" v-show="ishowcur">
        <!-- 事件委派+push -->
        <div class="all-sort-list2" @click="goSearch">
          <div class="item "  v-for="(itme,index) in categoryLists" :key='itme.categoryId'  :class="{curren:currenIndex==index}">
            <h3 @mouseenter="changeindex(index)">
              <a :data-categoryName="itme.categoryName" :data-category1Id="itme.categoryId">{{itme.categoryName}}</a>
            </h3>
            <!-- 二三级分类 -->
            <div class="item-list clearfix" :style="{display:currenIndex==index?'block':'none'}">
              <div class="subitem"  v-for="item1 in itme.categoryChild" :key="item1.categoryId">
                <dl class="fore">
                  <dt>
                    <a  :data-categoryName="item1.categoryName" :data-category2Id="item1.categoryId">{{item1.categoryName}}</a>
                  </dt>
                  <dd>
                    <em v-for="item2 in item1.categoryChild" :key="item2.categoryId">
                      <a  :data-categoryName="item2.categoryName" :data-category3Id="item2.categoryId">{{item2.categoryName}}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
//导入vuex中home小仓库的state中的三级分类数据
import {mapState} from 'vuex'
export default {
  name: "TypeNav",
  data(){
    return{
      // 三级分类背景初始值
      currenIndex:-1,
      //是否显示三分类
      ishowcur:true
    }
  },
  methods:{
  //  动态添加三级分类class类名
  changeindex(index){
    this.currenIndex=index
    // 只有当前录用为/search时三级分类才会有触摸显示
     if(this.$route.path!='/home'){
    this.ishowcur=true
     }
  },
  // 清除三级分类class类名
  leaveindex(){
    this.currenIndex=-1
    // 只有当前录用为/search时三级分类才会有鼠标离开隐藏
     if(this.$route.path!='/home'){
    this.ishowcur=false
     }
  },
  //点击三级分类跳转search组件
  goSearch(e){
    // 最好的解决方案：编程式导航+事件委派
    // 存在一些问题：事件委派是把全部子节点的事件委派给父节点
    // 点击a标签时才会跳转【怎么知道点击了a标签】
    // 即使知道你点击了a标签 ，你怎么区分是一级，二级，三级分类标签
  
    //解决方案
    // 问题一：把子节点a标签，加上自定义属性data-categoryName其余的子节点是没有的
    let elemnet=e.target
    // console.log(elemnet);
    // 获取当前触发这个事件的节点,如果存在data-categoryName自定义属性那么一点是a标签
    // 节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
    let {categoryname,category1id,category2id,category3id} =elemnet.dataset
  //  console.log(categoryname)
   //  console.log(category1id);
     // 如果存在categoryname说明点击的是a标签
    if(categoryname){
      // 路由跳转的参数
      // 地址
      let location={name:'search'}
      // 参数
      let query={categoryName:categoryname}
      //一、二、三级分类的a标签
      if(category1id){
          query.category1Id=category1id
      }else if(category2id){
          query.category2Id=category2id
      }else if(category3id){
         query.category3Id=category3id
      }
      // 添加一个判断是否存在params参数，有就一起传过去
      if(this.$route.params){
        
        location.params=this.$route.params
      }
      // 整合路径
      location.query=query
      //编程式导航有个问题 如果跳转完成后一直重复跳转当前路由就会报错  ()=>{},()=>{} 一个是跳转成功回调函数 一个是错误回调函数
      this.$router.push(location,()=>{},()=>{})
    }
  }
  },
  mounted(){
   
    // 根据$router.currentRoute.path获取当前的组件路由名称
    // 如果是search路由就默认隐藏三级分类
    // console.log(this.$router.currentRoute.path)
    if(this.$route.path!='/home'){
      this.ishowcur=false
    }
    // 打印vuex映射过来的三级分类state数据
    // 因为数据来是发送axios获取的  是异步操作 所以要用计时器打印 
    // setTimeout(() => {
    //   console.log(this.categoryLists)
    // }, 1000);
  },
  computed:{
    // 把vuex home小仓库的三级分类属性映射为计算属性
    ...mapState({
      categoryLists:(state)=>{
         return state.home.categoryList
      }
    })
  }
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      // overflow-y: auto;
      transition: all s;
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        // .item:hover{
        //   background-color: #89CEE9;
        // }
        .curren{
           background-color: #89CEE9;
        }
      }
    }
    //过渡开始
    .sort-enter{
      height: 0;
    }
    // 过度完成
    .sort-enter-to{
    height: 461px;
    }
    // 离开过渡开始的状态
    .sort-leave{
      height: 461px;
    }
    // 定义离开过渡的结束状态
    .sort-leave-to{
      height: 0;
    }
  }
}
</style>
