import request from '../../../servers/request'


//登录
export async function login(params) {

  return request({
    url: 'compcag/SALARY20', //接口标识
    method: 'post',
    data: params,
  })
}


//注册
export async function register(params) {

  return request({
    url: 'post/businessId', //接口标识
    method: 'post',
    data: params,
  })
}

//修改密码
export async function changePwd(params) {

  return request({
    url: 'post/businessId', //接口标识
    method: 'post',
    data: params,
  })
}

// 设置/找回 密码
export async function retrievePwd(params) {

  return request({
    url: 'post/businessId', //接口标识
    method: 'post',
    data: params,
  })
}

//获取验证码
export async function sendSMSCode(params) {

  return request({
    url: 'post/businessId', //接口标识
    method: 'post',
    data: params,
  })
}
