import request from '../utils/request'
/**
 * 用户相关的请求模块
 */
/**
 * 用户登录
 */
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 发送验证码请求
export const sendSm = (mobile) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
