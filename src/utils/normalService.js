import request from '@/utils/request';

function httpGet(values) {
  const apiCode = values.apiCode;
  delete values.apiCode; //apiCode这个不作为参数传入服务端，所以需要删除此属性
  //console.log("----------->api:::"+apiCode);
  return request(apiCode, values, true);
}

export {
  httpGet
}
