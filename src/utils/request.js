import axios from "axios";
// 接口公共部分
// 本地接口

// const commonUrl = "http://localhost:8080/";
// 线上接口
//axios.defaults.baseURL = "https://mqtt.vikedata.com/mqtt-cli/api/v1/"

//改成用ip访问
// 全局强制设置 baseURL
const baseURL = "http://121.5.9.113:8090"
axios.defaults.baseURL = baseURL
axios.defaults.timeout = 30000
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 如果url里有旧域名，直接替换
    if (config.url.includes("jxautts.top:444")) {
      config.url = config.url.replace("https://jxautts.top:444", baseURL)
    }
    // 强制覆盖baseURL，防止被其他地方修改
    config.baseURL = baseURL
    return config;
  },
  error => Promise.reject(error)
);

/**
 * @description POST请求封装
 * @param { String } url 请求的接口
 * @param { Object } params 请求的参数
 * @example
 * this.$post(
 * 	'app/api',
 * 	{name: 'yzp'}).then(res => {
 *     console.log('请求成功')}).catch(err => {console.log(err)})
 */

export function postRequest(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// /**
//  * body传参的post请求
//  * @param {*} url
//  * @param {*} data
//  * @returns
//  */
// export function postBodyRequest(url, data) {
//   return new Promise((resolve, reject) => {
//     axios
//       .post(url, data)
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

/**
 * @description GET请求封装
 * @param { String } url 请求的接口
 * @param { Object } params 请求的参数
 * @example
 * this.$get(
 * 	'app/api',
 * 	{name: 'yzp'}).then(res => {
 *     console.log('请求成功')}).catch(err => {console.log(err)})
 */
export function getRequest(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
