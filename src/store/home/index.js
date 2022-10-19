//home小仓库
//导入获取三级分类api封装函数
import { getCategoryList, reqgetBannerList, reqGetFloorList } from '@/api/index.js';
const state = {
    // 三级分类数据
    categoryList: [],
    //轮播图数据
    BannerList: [],
    //floor组件数据
    floorList: []
}
const mutations = {
    // 把axios返回的三级分类数据放到state中
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, BannerList) {
        state.BannerList = BannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
const actions = {
    // 发送axios请求获取三级分类
    async categoryList({ commit }) {
        let result = await getCategoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data);
        }
    },
    // 发送aixos请求获取轮播图数据
    async getBannerList({ commit }) {
        let result = await reqgetBannerList();
        // console.log(result)
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data);
        }
    },
    //发送axios请求获取floor数据
    async getFloorList({ commit }) {
        let result = await reqGetFloorList();
        if (result.code == 200) {
            commit("GETFLOORLIST", result.data)
        }
    }
}
export default {
    state,
    mutations,
    actions
}