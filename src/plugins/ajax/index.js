import axios from 'axios'
function convertURL (url) {
  // 获取时间戳
  let timstamp = (new Date()).valueOf()
  // 将时间戳信息拼接到url上
  if (url.indexOf('?') >= 0) {
    url = url + '&t=' + timstamp
  } else {
    url = url + '?t=' + timstamp
  }
  return url
}
export default {
  post (url, data, config) {
    return axios.post(convertURL(url), data, config).then((res) => {
      return res
    })
  },
  get (url, params, config) {
    return axios.get(convertURL(url), config).then((res) => {
      return res
    })
  }
}
