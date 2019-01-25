import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'vant';

Vue.use(Toast);
const HTTP = {}

axios.defaults.timeout = 10000
axios.defaults.baseURL = window.baseURL
axios.defaults.responseType = 'json'

// axios.interceptors.request.use(
//   config => {
//     if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.Authorization = `token ${store.state.token}`;
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   });

// // http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           // 返回 401 清除token信息并跳转到登录页面
//           store.commit(types.LOGOUT);
//           router.replace({
//             path: 'login',
//             query: {
//               redirect: router.currentRoute.fullPath
//             }
//           })
//       }
//     }
//     return Promise.reject(error.response.data) // 返回接口返回的错误信息
//   });

HTTP.GET = function (url, data) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: data
    }).then((res) => {
      if(res.data.code === 200){
        resolve(res.data)
      } else if(res.data.code === 201) {
        resolve(res.data)
      }else{
        console.log('请求失败')
        Toast(res.data.msg)
        reject(res.data)
      }
    }).catch((res) => {
      console.log('失败',res)
      Toast('网络错误')
      reject()
    })
  })
}

HTTP.POST = function (url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, {
      data: data
    }).then((res) => {
      if(res.data.code === 200){
        resolve(res.data)
      }else{
        console.log('请求失败')
      }
    }).catch((res) => {
      console.log('失败')
      reject(res)
    })
  })
}

export default HTTP
