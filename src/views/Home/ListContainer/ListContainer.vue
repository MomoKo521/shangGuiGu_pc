<template>
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <div class="swiper-container" ref="mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in BannerLists" :key=item.id>
              <img :src="item.imgUrl" />
            </div>
          
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品汇快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li>
              <span class="bold">[特惠]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[公告]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[特惠]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[公告]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[特惠]</span>备战开学季 全民半价购数码
            </li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
// 引入swiper
 import Swiper from "swiper"
import { watch } from 'vue'
  export default {
    name: 'ListContainer',
    mounted(){
      // 发送axios请求获取轮播图数据（注意这里的数据是mock生成的虚假数据）
      this.$store.dispatch('getBannerList')
      // setTimeout(() => {
      //       //为什么要延时打印？因为BannerLists数据是通过axios获取的而axios是异步操作
      //     console.log(this.BannerLists);   
      // }, 1000);
    },
    computed:{
        ...mapState({
          BannerLists:(state)=>{
              return state.home.BannerList
          }
        })
    },
    //问题：什么时候new swiper实列 因为BannerLists数据是axios获取的（异步操作）
    // 所以必须要等axios请求返回数据并v-for循环完dom元素后在new swiper实列才能生效
    //watch+nectTick解决轮播图
    // 数据监听
    watch:{
      // 监听BannerLists数据的变化
      BannerLists:{
        handler(newValue,oldValue){
        // 现在咱们通过watch监听BannerLists所熟悉的属性值变化
        //如果执行handler方法，代表axios执行完成并返回了数据
        //问题：如果当前函数执行，之恶能保证BannerLists数据已经有了，但是没办法保证v-for已经执行结束渲染完成了dom结构
        //v-for执行完毕，才有dom结构【你现在在watch当中无法保证】
        // 解决办法netxTick
        //将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
        //也就是说他在 获取数据并返回数据且页面中的dom结构更新后才执行
        this.$nextTick(()=>{
      // 轮播图
      var mySwiper = new Swiper (
       this.$refs.mySwiper,{
    // direction: 'vertical', // 垂直切换选项
     loop: true, // 循环模式选项
      autoplay:true,//自动轮播
      autoplay: {
      disableOnInteraction: false,
     },
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable :true,//点击分页切换轮播图
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
  
        })     
        })
        }
       
      }
    }
  }
</script>

<style lang="less" scoped>
  .list-container {
    width: 1200px;
    margin: 0 auto;

    .sortList {
      height: 464px;
      padding-left: 210px;

      .center {
        box-sizing: border-box;
        width: 740px;
        height: 100%;
        padding: 5px;
        float: left;
      }

      .right {
        float: left;
        width: 250px;

        .news {
          border: 1px solid #e4e4e4;
          margin-top: 5px;

          h4 {
            border-bottom: 1px solid #e4e4e4;
            padding: 5px 10px;
            margin: 5px 5px 0;
            line-height: 22px;
            overflow: hidden;
            font-size: 14px;

            .fl {
              float: left;
            }

            .fr {
              float: right;
              font-size: 12px;
              font-weight: 400;
            }
          }

          .news-list {
            padding: 5px 15px;
            line-height: 26px;

            .bold {
              font-weight: 700;
            }
          }
        }

        .lifeservices {
          border-right: 1px solid #e4e4e4;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;

          .life-item {
            border-left: 1px solid #e4e4e4;
            border-bottom: 1px solid #e4e4e4;
            margin-right: -1px;
            height: 64px;
            text-align: center;
            position: relative;
            cursor: pointer;
            width: 25%;

            .list-item {
              background-image: url(../images/icons.png);
              width: 61px;
              height: 40px;
              display: block;
            }

            .service-intro {
              line-height: 22px;
              width: 60px;
              display: block;
            }

            &:nth-child(1) {
              .list-item {
                background-position: 0px -5px;
              }
            }

            &:nth-child(2) {
              .list-item {
                background-position: -62px -5px;
              }
            }

            &:nth-child(3) {
              .list-item {
                background-position: -126px -5px;
              }
            }

            &:nth-child(4) {
              .list-item {
                background-position: -190px -5px;
              }
            }

            &:nth-child(5) {
              .list-item {
                background-position: 0px -76px;
              }
            }

            &:nth-child(6) {
              .list-item {
                background-position: -62px -76px;
              }
            }

            &:nth-child(7) {
              .list-item {
                background-position: -126px -76px;
              }
            }

            &:nth-child(8) {
              .list-item {
                background-position: -190px -76px;
              }
            }

            &:nth-child(9) {
              .list-item {
                background-position: 0px -146px;
              }
            }

            &:nth-child(10) {
              .list-item {
                background-position: -62px -146px;
              }
            }

            &:nth-child(11) {
              .list-item {
                background-position: -126px -146px;
              }
            }

            &:nth-child(12) {
              .list-item {
                background-position: -190px -146px;
              }
            }
          }
        }

        .ads {
          margin-top: 5px;

          img {
            opacity: 0.8;
            transition: all 400ms;

            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }
  }
</style>