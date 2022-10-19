// 登陆与注册小仓库
import { reqgetCode, reqRegister, reqUserLogin, reqGetUserInfo, reqLoginOut } from '@/api/index.js';
const state = {
    code: '',
    userInfo: {},
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    LOGINOUT(state) {
        // 退出登陆删除用户信息和token
        state.userInfo = {}
        localStorage.removeItem("token")
    }
}
const actions = {
    // 获取验证码
    // 获取验证码这个接口 ，把验证码返回,但是正常情况。后天把验证码发到用户手机上【为什么不用？要花钱】
    async getCode({ commit }, phone) {
        let refult = await reqgetCode(phone)
        if (refult.code == 200) {
            commit("GETCODE", refult.data)
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 注册用户
    async register({ commit }, { phone, password, code }) {
        let refult = await reqRegister({ phone, password, code })
        if (refult.code == 200) {
            return true
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 登陆用户
    async userLogin({ commit }, { phone, password, }) {
        let refult = await reqUserLogin({ phone, password, })
        if (refult.code == 200) {
            localStorage.setItem("token", refult.data.token)
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let refult = await reqGetUserInfo()
            //console.log(refult);
        if (refult.code == 200) {
            commit("GETUSERINFO", refult.data)
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 退出登陆
    async LoginOut({ commit }) {
        let refult = await reqLoginOut()
            // console.log(refult);
        if (refult.code == 200) {
            commit("LOGINOUT")
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