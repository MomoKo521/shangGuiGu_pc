import { reqgetAddress, reqGetTradeInfo } from '@/api/index.js'
const state = {
    addressInfo: [],
    orderInfo: {}
}
const mutations = {
    GETADDRESS(state, addressInfo) {
        state.addressInfo = addressInfo
    },
    GETTRADEINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const actions = {
    // 获取用户地址信息
    async getAddress({ commit }) {
        let refult = await reqgetAddress()
            // console.log(refult);
        if (refult.code == 200) {
            commit('GETADDRESS', refult.data)
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 获取订单交易信息
    async getTradeInfo({ commit }) {
        let refult = await reqGetTradeInfo()
            // console.log(refult);
        if (refult.code == 200) {
            commit("GETTRADEINFO", refult.data)
        } else {
            return Promise.reject(new Error('fali'))
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}