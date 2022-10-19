import { reqGetGoodInfo, reqaddGoodcart } from '@/api/index.js'
import { getUUID } from '@/store/urils/uuid_token.js' // 导入生成uuid函数
const state = {
        //商品详情数据
        goodInfo: {},
        // 游客身份
        uuid_token: getUUID()
    }
    //修改state
const mutations = {
        GETGOODINFO(state, goodInfo) {
            state.goodInfo = goodInfo
        }
    }
    // 异步
const actions = {
        async getGoodInfo({ commit }, skuid) {
            let result = await reqGetGoodInfo(skuid)
            if (result.code == 200) {
                commit("GETGOODINFO", result.data)
            }
        },
        async addGoodCart({ commit }, { skuId, skuNum }) {
            let result = await reqaddGoodcart(skuId, skuNum)
            if (result.code == 200) {
                return true
            } else {
                // 加入购物车失败
                return Promise.reject(new Error('faile'));
            }
        }
    }
    // 计算属性
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
}