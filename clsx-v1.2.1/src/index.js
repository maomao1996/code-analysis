// 对参数进行类型判断并做相应处理
function toVal(mix) {
  var k,
    y,
    str = ''

  // 当参数 mix 为字符串和数值时直接拼接
  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix
  }
  // 当参数 mix 为对象时
  else if (typeof mix === 'object') {
    // 当参数 mix 为数组时对其进行遍历并递归调用 toVal
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if ((y = toVal(mix[k]))) {
            str && (str += ' ')
            str += y
          }
        }
      }
    } else {
      // 遍历对象的属性，把属性值为真的属性名拼接成字符串
      for (k in mix) {
        if (mix[k]) {
          str && (str += ' ')
          str += k
        }
      }
    }
  }

  return str
}

// 接收多个参数并返回一个字符串
export function clsx() {
  var i = 0,
    tmp,
    x,
    str = ''

  // 遍历 arguments
  while (i < arguments.length) {
    // 对 tmp 赋值，并判断其是否为真值
    if ((tmp = arguments[i++])) {
      // 调用 toVal 方法对 tmp 进行处理，如果处理结果为真，则进行字符串拼接
      if ((x = toVal(tmp))) {
        str && (str += ' ')
        str += x
      }
    }
  }
  return str
}

export default clsx
