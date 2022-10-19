import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 注册三级联动为全局组件
import TypeNav from '@/components/TypeNav/index.vue'
Vue.component(TypeNav.name, TypeNav)
    // 注册分页组件为全局组件
import Pagination from '@/components/Pagination/Pagination.vue'
Vue.component(Pagination.name, Pagination)

// 引入mock文件 模拟虚假数据
import '@/mock/mockServe.js'

//引入swipercss样式
import 'swiper/css/swiper.min.css'
// 引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

// 统一接口api文件里面全部请求函数
import * as API from '@/api/index.js'

// 图片懒加载依赖
import lazyLoad from 'vue-lazyload'
// 导入懒加载展示的图片（json和图片不需要导出直接导入）
import dog from '@/assets/dog.jpg'
Vue.use(lazyLoad, {
    loading: dog,
})

// 导入表单验证插件插件
import '@/plugins/valibata.js'

new Vue({
    router,
    store,
    render: h => h(App),
    //全局事件总线$bus配置
    beforeCreate() {
        Vue.prototype.$bus = this;
        // 利用全局事件总线 全局挂载axios封装函数文件
        Vue.prototype.$API = API
    }
}).$mount('#app')