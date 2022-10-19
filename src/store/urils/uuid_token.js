// 使用uuid生成一个随机的身份码
// 目的  如果用户未登陆  那么就给使用uuid生成的随机身份码作为游客登陆标识
import { v4 as uuidv4 } from 'uuid'
// 要生成一个随机字符串，且每次执行不能发送变化，游客身份持久存储
export const getUUID = () => {
    let uuid_token = localStorage.getItem('UUIDTOKEN')
        //如果拿不到uuid_token说明未生成游客身份码
    if (!uuid_token) {
        // 生成游客临时身份
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}