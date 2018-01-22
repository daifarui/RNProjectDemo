import request from '../../../servers/request'


//获取数据
export async function getDetail(params) {

  return request({
    url: 'post/businessId', //接口标识
    method: 'post',
    data: params,
  })
}

