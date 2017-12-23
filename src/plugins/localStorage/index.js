export default {
  set: function (key, value, seconds) {
    // 设置过期原则
    if (!value) {
      localStorage.removeItem(key)
    } else {
      var exp = new Date()
      localStorage[key] = JSON.stringify({
        value,
        expires: exp.getTime() + seconds
      })
    }
  },
  get: function (name) {
    try {
      let o = JSON.parse(localStorage[name])
      if (!o || o.expires < Date.now()) {
        localStorage.removeItem(name)
      } else {
        return o.value
      }
    } catch (e) {
      // 兼容其他localstorage
      // console.log(e)
      return localStorage[name]
    } finally {
    }
  }
}
