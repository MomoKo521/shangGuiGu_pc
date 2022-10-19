// axios二次封装

// 导入axios依赖
import axios from 'axios'
// 导入nprogress进度条依赖
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建axios实列
const request = axios.create({
    baseURL: '/mock',
    timeout: 10000
})


//请求拦截
request.interceptors.request.use((config) => {
            //发送接口请求时展示进度条
            NProgress.start();
            // 请求的拦截
            return config
        },
        (error) => {
            return Promise.reject(error)
        }),
    // // 响应拦截
    request.interceptors.response.use(
        (config) => {
            // 接口请求成功后关闭进度条
            NProgress.done();
            return config.data
        },
        (err) => {

            // 失败响应
            if (err && err.response) {
                switch (err.response.status) {
                    case 400:
                        err.message = '请求无效，请检查参数是否正确!'
                        break

                    case 401:
                        err.message = '未经授权，访问被拒!'
                        break

                    case 403:
                        err.message = '拒绝访问!'
                        break

                    case 404:
                        err.message = `地址不存在!`
                        break

                    case 408:
                        err.message = '请求超时!'
                        break

                    case 500:
                        err.message = '系统错误!'
                        break

                    case 501:
                        err.message = '该方法未实现!'
                        break

                    case 502:
                        err.message = '网管出错!'
                        break

                    case 503:
                        err.message = '服务不可用!'
                        break

                    case 504:
                        err.message = '网关请求超时'
                        break

                    case 505:
                        err.message = 'HTTP版本不受支持'
                        break

                    default:
                        err.message = '未知原因，请求失败'
                }
                return Promise.reject(err)
            }
        }
    )

export default request;