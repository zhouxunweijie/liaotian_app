const utils = {
  /**
   * 时间戳转换为时间
   * @param {*} timestamp 时间戳
   */
  timestampToTime (timestamp) {
    var date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = date.getDate() + ' '
    var h = date.getHours() + ':'
    var m = date.getMinutes() + ':'
    var s = date.getSeconds()
    return Y + M + D + h + m + s
  },
  /**
   * 对象数组排序
   */
  arraySort (arr, key, num) {
    if(arr.length === 0){
      return []
    }
    num = num || null
    arr.sort((a, b) => { return Number(a[key]) - Number(b[key]) })
    if (num) {
      if (arr.length > num) {
        return arr.slice(0)
      }
      return arr.slice(0, num)
    }
    return arr
  },
  /**
   * 更改数组中id的其中一项
   */
  updateArray (arr, id, obj) {
    if(arr.length > 0){
      if(typeof obj === 'object'){
        if(typeof obj['hint'] === 'boolean' && obj['hint']){
          obj.hint = arr.find(el => el.accountNumber === id).hint + 1
        } else if(typeof obj['hint'] === 'number'){
          obj.hint = 0
        }
        return arr.splice(arr.findIndex(el => el.accountNumber === id), 1, Object.assign(arr.find(el => el.accountNumber === id), obj))
      }
    }
  },
  /**
   * 获取url参数
   */
  getUrlArgObject (name) {  
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
  },
  /**
   * 向本地缓存中的添加数据
   */
  pushLocalData (name, id, obj){
    var data = JSON.parse(localStorage.getItem(name))
    if(typeof id === 'object'){
      obj = id
      // 没有容器则创建
      if(!data) {
        data = []
      }
      data.push(obj)
    } else {
      // 没有容器则创建
      if(!data) {
        data = {}
      }
      if(!data[id]) {
        data[id] = []
      }
      data[id].push(obj)
    }
    localStorage.setItem(name,JSON.stringify(data))
  },
  /**
   * 合并两个数组中的共同项 并且增加isIdentical字段
   * isIdentical false 不相同/true 相同
   */
  mergeArr (arr, ary) {
    if(arr && ary){
      return arr.map(el => {
        if(ary.findIndex(item => item.id === el.id) === -1){
          el.isIdentical = false
        } else {
          el.isIdentical = true
        }
        return el
      })
    } else {
      if(arr){
        return arr
      }
      return []
    }
  },

  /**
   * 用于把用utf16编码的字符转换成实体字符，以供后台存储
   * @param  {string} str 将要转换的字符串，其中含有utf16字符将被自动检出
   * @return {string}     转换后的字符串，utf16字符将被转换成&#xxxx;形式的实体字符
   */
  utf16toEntities: function (str) {
    var patt=/[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
    str = str.replace(patt, function(char){
            var H, L, code;
            if (char.length===2) {
                H = char.charCodeAt(0); // 取出高位
                L = char.charCodeAt(1); // 取出低位
                code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
                return "&#" + code + ";";
            } else {
                return char;
            }
        });
    return str;
  },
  /**
 *
 *
 *用于反解开EMOJI编码后的字符串
 *
 *
 * */
  uncodeUtf16: function (str){
    if(str){
      var reg = /\&#.*?;/g;
      var result = str.replace(reg,function(char){
          var H,L,code;
          if(char.length == 9 ){
              code = parseInt(char.match(/[0-9]+/g));
              H = Math.floor((code-0x10000) / 0x400)+0xD800;
              L = (code - 0x10000) % 0x400 + 0xDC00;
              return unescape("%u"+H.toString(16)+"%u"+L.toString(16));
          }else{
              return char;
          }
      });
      return result;
    }
    return ''
  }
}

export default utils
