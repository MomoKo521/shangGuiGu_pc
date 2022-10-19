<template>
  <div>
    <!-- 因为三级联动为全局联动所以不需要引入直接使用 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="itme in floorLists" :key="itme.id" :list="itme"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
// 导入其他组件因为没有注册为全局组件，
import ListContainer from "@/views/Home/ListContainer/ListContainer.vue"; //轮播图
import Recommend from "@/views/Home/TodayRecommend/TodayRecommend.vue"; //今日推荐
import Rank from "@/views/Home/Rank/Rank.vue"; // 商品排行
import Like from "@/views/Home/Like/Like.vue"; //猜你喜欢
import Floor from "@/views/Home/Floor/Floor.vue"; //楼层
import Brand from "@/views/Home/Brand/Brand.vue"; // 商标
import { mapState } from "vuex";
export default {
  name: "home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    //获取floor组件的数据
    this.$store.dispatch("getFloorList");
    // setTimeout(() => {
    //   console.log(this.floorLists);
    // }, 1000);
  },
  computed: {
    ...mapState({
      floorLists: (state) => {
        return state.home.floorList;
      },
    }),
  },
};
</script>

<style>
</style>