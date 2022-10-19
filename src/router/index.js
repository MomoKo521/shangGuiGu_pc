import Vue from 'vue'
import VueRouter from 'vue-router'
const HOME = () =>
    import ('@/views/Home/home.vue') //首页
const LOGIN = () =>
    import ('@/views/Login/index.vue') //登陆组件

const REGISTER = () =>
    import ('@/views/Register/index.vue') //注册组件

const SEARCH = () =>
    import ('@/views/search/index.vue') //搜索组件

const DETAIL = () =>
    import ('@/views/Detail/index.vue') //商品详情组件
const ADDCART = () =>
    import ('@/views/AddCartSuccess/index.vue') //提示添加商品进购物车成功组件
const SHOPCART = () =>
    import ('@/views/ShopCart/index.vue') //购物车
const TRADE = () =>
    import ('@/views/Trade/index.vue') //结算商品页面
const PAY = () =>
    import ('@/views/Pay/index.vue') //结算页面
const PAYSCCESS = () =>
    import ('@/views/PaySuccess/index.vue') //支付订单成功组件
const CNETER = () =>
    import ('@/views/Center/index.vue') //个人中心页面
const MYORDER = () =>
    import ('@/views/Center/myorder/index.vue') //个人中心/我的订单页面
const GROUPORDER = () =>
    import ('@/views/Center/groupOrder/index.vue') //个人中心/团购订单页面

Vue.use(VueRouter)
const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HOME, meta: { show: true }, name: 'home' },
    { path: '/login', component: LOGIN, meta: { show: false }, name: 'login' },
    { path: '/register', component: REGISTER, meta: { show: false }, name: 'register' },
    { path: '/search/:keyword?', component: SEARCH, meta: { show: true }, name: 'search' },
    { path: '/detail/:sukid?', component: DETAIL, meta: { show: true }, name: 'detail' },
    { path: '/addcartsuccess', component: ADDCART, meta: { show: true }, name: 'addcartsuccess' },
    { path: '/shopcart', component: SHOPCART, meta: { show: true }, name: 'shopcart' },
    {
        path: '/trade',
        component: TRADE,
        meta: { show: true },
        name: 'trade',
        // 路由独享守卫
        // 作用：指定用户从指定路由访问本身路由  排除例如手动输入路由地址访问路由
        beforeEnter: (to, from, next) => {
            // 必须是购物车路由/shopcart 访问 当前结算路由才能访问
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }

        }
    },
    {
        path: '/pay',
        component: PAY,
        meta: { show: true },
        name: 'pay',
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: PAYSCCESS,
        meta: { show: true },
        name: 'paysuccess',
        beforeEnter: (to, from, next) => {
            if (from.path == '/pay') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/center',
        component: CNETER,
        meta: { show: true },
        name: 'center',
        redirect: 'myorder',
        children: [
            { path: 'myorder', component: MYORDER },
            { path: 'grouporder', component: GROUPORDER },
        ]
    },

]

const router = new VueRouter({
    routes,
    // vue 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 设置为滚动y轴为0px
        return { y: 0 }
    }
})
import store from '@/store/index.js'
import { toPath } from 'lodash'
// 全局守卫 前置守卫
router.beforeEach(async(to, from, next) => {
    // to 要去的路由地址
    // from 要离开的路由地址
    // next 放行


    let name = store.state.user.userInfo.name
    if (localStorage.getItem('token')) {
        // 已登录
        if (to.path == '/login' || to.path == '/register') {
            //已登陆就不在能访问登陆页面
            next('/home')
        } else {
            //如果仓库存在用户信息
            if (name) {
                next()
            } else {
                // 如果仓库不存在用户信息 就发送获取用户信息请求
                try {
                    // 获取用户信息 
                    await store.dispatch("getUserInfo");
                    next()
                } catch {
                    // 用户去用户信息失败 可能token过期了  执行退出请求
                    await store.dispatch("LoginOut");
                    next("/login")
                }
            }

        }

    } else {
        // 未登录
        // 未登录情况下不能访问【 支付 / 支付成功组件】 && 个人中心组件
        if (to.path == '/trade' || to.path == '/pay' || to.path == '/myorder') {
            // 如果用户未登录点击了不能去的路由  那么像去的路由就会以qeury参数保存在路由中 登陆后直接访问想要去的路由
            next('/login?redirect=' + to.path)
        } else {
            next()
        }

    }

})

export default router