import axios from 'axios'
import qs from 'qs'
import {
  Platform
} from "react-native";


const fetch = (options) => {
  const {
    method = 'get',
    data,
    url,
  } = options;
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(`${url}${options.data ? `?${qs.stringify(options.data)}` : ''}`);
    case 'delete':
      return axios.delete(url, {data});
    case 'head':
      return axios.head(url, data);
    case 'post':
      return axios.post(url, data);
    case 'put':
      return axios.put(url, data);
    case 'patch':
      return axios.patch(url, data);
    default:
      return axios(options)
  }
};
window.baseUrl ='http://112.29.169.54:8081/';
export default async function request(options) {
  options.timeout = 30000;
  console.log(options.data);

  options.url = window.baseUrl + options.url + "?requestId=" + new Date().getTime() + options.data.phoneImei;

  options.header = {
    'Content type': 'application/json; charset=UTF-8',
  };

  console.log(options);
  return fetch(options).then(async (response) => {
    const {statusText, status} = response;
    console.log("res1:", '11');
    let data = options.isCross ? response.data.query.results.json : response.data;
    console.log("res2:", data);
    if (data.response_data !== '') {
      try {
        data.response_data = JSON.parse(data.response_data);
      } catch (e) {
        console.log(e);
      }
    }

    console.log("res3:", data);

    return {
      code: 0,
      status,
      message: statusText,
      ...data,
    }


  }).catch((error) => {
    const {response = {statusText: 'Network Error'}} = error;
    return {code: 1, message: response.statusText}
  })
}
