import { reqGetSearchList } from '@/api/index.js'
const state = {
        searchList: {}
    }
    //修改state
const mutations = {
        GETSEARCHLIST(state, searchList) {
            state.searchList = searchList
        }
    }
    //异步操作
const actions = {
        async getSearchList({ commit }, params = {}) {
            let result = await reqGetSearchList(params);
            if (result.code == 200) {
                commit("GETSEARCHLIST", result.data)
            }
        }
    }
    //计算属性
const getters = {
    //当前形参state，是当前仓库的state，并非大仓库中的那个state
    // 商品参数 
    goodsList(state) {
        //因为searchList是异步获取的  如果数据还没回来 那么就拿不到goodsList数据
        // 拿不到goodsList数据那么返回的是undefined 所以这个时候我们给一个默认空数组
        return state.searchList.goodsList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}