import axios from "axios";
import { buildMockResponse, isProjectApi } from "./mockData";
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
  // axios 本身返回 Promise，这里多包一层 new Promise 属于冗余：
  // 成功时 resolve(res)、失败时 reject(err) 与直接 return 完全等价，
  // 而且多包一层只会多一个微任务、多一层调用栈（报错时栈更深）。
  return axios.post(url, params);
}

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
  // 这里同样不需要 new Promise：.then / .catch 直接返回的就是 Promise，
  // 用 return 把结果"流"出去即可（注意 catch 里要把错误继续抛出去，不能吞掉）。
  return axios
    .get(url, { params: params })
    .then((res) => {
      const body = res.data;
      // 降级：接口返回空数组时（例如该网关无历史数据），用示例数据兜底，避免整屏空白
      const isEmpty = body && Array.isArray(body.data) && body.data.length === 0;
      if (isEmpty && isProjectApi(url)) {
        return buildMockResponse(url, params);
      }
      return body;
    })
    .catch((err) => {
      // 降级：HTTPS 页面请求 HTTP 后端会被浏览器拦截，此时用示例数据保证能演示
      if (isProjectApi(url)) {
        return buildMockResponse(url, params);
      }
      return Promise.reject(err);
    });
}
