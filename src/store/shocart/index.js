import { reqGetShopcart, reqDeleteCartById, reqUpdateChecked } from '@/api/index.js'
const state = {
    cartList: []
}
const mutations = {
    GETSHOPCART(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    //获取个人购物车商品信息
    async GetShopcart({ commit }) {
        let result = await reqGetShopcart()
        if (result.code == 200) {
            commit("GETSHOPCART", result.data)
        }
    },
    // 删除购物车某个商品
    async deleteCartById({ commit }, skuId) {
        let refult = await reqDeleteCartById(skuId)
        if (refult.code == 200) {
            return true
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车某个商品的勾选状态
    async updateChecked({ commit }, { skuId, isChecked }) {
        let refult = await reqUpdateChecked(skuId, isChecked)
        if (refult.code == 200) {
            return true
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除购物车勾选的商品
    // 因为没有删除勾选状态的接口
    // 所以我们只能循环发送删除单个购物车商品请求
    deleteAllCheckedCart({ dispatch, getters }) {
        // context：下仓库 commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
        // 用户存放每次派发删除单个商品的promise的结果
        let PromiseAll = []
            // 获取购物车中全部商品  getters.cartList.cartInfoList
        getters.cartList.cartInfoList.forEach(element => {
            // 获取当前购物车为勾选状态的商品 并以商品的skuId为参数去派发删除单个商品的请求
            // forEach 重复派发做到删除全部勾选状态的商品
            let promise = element.isChecked == 1 ? dispatch('deleteCartById', element.skuId) : ''
                // 将每次循环派发的异步请求promise添加的一个数组中 
            PromiseAll.push(promise)
        });
        // Promise.all([异步1,异步2,异步3])方法  只有全部的异步结果都成功  返回的结果才为成功
        // 如果是失败 返回失败结果
        return Promise.all(PromiseAll)
    },
    //  修改全部商品的选中状态
    updateAllcartChecked({ dispatch, getters }, isChecked) {
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = dispatch('updateChecked', { skuId: item.skuId, isChecked })
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }

}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}