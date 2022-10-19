//导入axios实列
import request from './request.js'
// 导入获取mock数据 axios实列
import mockAxios from './mockAxios.js'
// 首页三级分类
export const getCategoryList = () => {
        return request({
            method: "get",
            url: "/product/getBaseCategoryList",
        })
    }
    //获取轮播图数据
export const reqgetBannerList = () => {
        return mockAxios({
            method: 'get',
            url: '/banner'
        })
    }
    //获取floor数据
export const reqGetFloorList = () => {
        return mockAxios({
            method: 'get',
            url: '/floor'
        })
    }
    //获取search数据
export const reqGetSearchList = (params) => {
        return request({
            url: '/list',
            method: 'post',
            data: params
        })
    }
    // 获取商品详情信息的接口 url：/item/{skuId} 请求方式get
export const reqGetGoodInfo = (skuId) => {
        return request({
            url: `/item/${skuId}`,
            method: 'get'
        })
    }
    //发送商品加入购物车请求
export const reqaddGoodcart = (skuId, skuNum) => {
        return request({
            url: `/cart/addToCart/${skuId}/${skuNum}`,
            method: 'post'
        })
    }
    // 发送获取个人购物车信息请求
export const reqGetShopcart = () => {
        return request({
            url: '/cart/cartList',
            method: 'get',
        })
    }
    // 删除购物车商品
export const reqDeleteCartById = (skuId) => {
        return request({
            url: `/cart/deleteCart/${skuId}`,
            method: 'delete'
        })
    }
    //修改购物车某商品的勾选状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateChecked = (skuId, isChecked) => {
        return request({
            url: `/cart/checkCart/${skuId}/${isChecked}`,
            method: 'get'
        })
    }
    // 获取验证码  /api/user/passport/sendCode/phone  get 
export const reqgetCode = (phone) => {
        return request({
            url: `/user/passport/sendCode/${phone}`,
            method: 'get'
        })
    }
    // 注册用户 /api/user/passport/register post
export const reqRegister = (data) => {
        return request({
            url: '/user/passport/register',
            data,
            method: 'post'
        })
    }
    // 登录用户 /api/user/passport/login  post
export const reqUserLogin = (data) => {
        return request({
            url: '/user/passport/login',
            method: 'post',
            data
        })
    }
    //获取登陆用户信息 /api/user/passport/auth/getUserInfo get
export const reqGetUserInfo = () => {
        return request({
            url: '/user/passport/auth/getUserInfo',
            method: 'get'
        })
    }
    // 退出登陆 /api/user/passport/logout get
export const reqLoginOut = () => {
        return request({
            url: '/user/passport/logout',
            method: 'get'
        })
    }
    // 获取用户地址信息
export const reqgetAddress = () => {
        return request({
            url: '/user/userAddress/auth/findUserAddressList',
            mehtod: 'get',
        })
    }
    // 获取订单交易页信息 /api/order/auth/trade get
export const reqGetTradeInfo = () => {
        return request({
            method: 'get',
            url: '/order/auth/trade'
        })

    }
    //提交订单  /api/order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder = (tradeNo, data) => {
        return request({
            url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
            data,
            method: 'post'
        })
    }
    // 获取订单支付信息 /api/payment/weixin/createNative/{orderId} get
export const reqGetcreateNative = (orderId) => {
        return request({
            url: `/payment/weixin/createNative/${orderId}`,
            method: 'get',
        })
    }
    // 查询支付订单状态 /api/payment/weixin/queryPayStatus/{orderId} get
export const reGetQeuryPayStatus = (orderId) => {
        return request({
            url: `/payment/weixin/queryPayStatus/${orderId}`,
            method: 'get'
        })
    }
    // 获取个人中心我的订单数据列表 /api/order/auth/{page}/{limit} get
export const reqGetMyOrderList = (page, limit) => {
    return request({
        url: `/order/auth/${page}/${limit}`,
        method: 'get'
    })
}