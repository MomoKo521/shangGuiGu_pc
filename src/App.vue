<template>
  <div>
    <Head></Head>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Head from "@/components/Head/head.vue";
import Footer from "@/components/Footer/footer.vue";

export default {
  components: {
    Head,
    Footer,
  },
  mounted(){
     // 向vuex中的actions发送有axios获取三级分类请求
    // 这个是获取TypeNav全局组件中三级分类的数据
    // 为什么要在app。vue中发送axios请求，而不是在TypeNav组件中发送？
    // 因为TypeNav组件被使用一次就会重新发送一次axios请求。a组件使用了TypeNav组件、b组件使用了TypeNav组件。a跳转到b  b会重新发送一次axios请求获取三级分类数据
    // 但三级分类的数据用户是不能改变的  所以只需要请求一次存储到vuex中即可 这时候app.vue根组件是一定且只会执行一次的组件 在这里发送三级分类请求最合适
    this.$store.dispatch('categoryList')
  }
};
</script>

<style>
</style>