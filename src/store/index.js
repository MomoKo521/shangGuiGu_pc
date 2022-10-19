import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import home from './home/index.js' //导入home小仓库
import search from './search/index.js' //导入search雄安仓库
import detail from './detail/index.js' //导入detail小仓库
import shopcart from "./shocart/index.js"; //导入shopcart小仓库
import user from "./user/index.js"; //导入登陆于注册小仓库
import trade from './trade/index.js' //导入结算小仓库
export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})