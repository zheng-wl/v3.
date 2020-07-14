/*
 * @Autor: zwl
 * @Date: 2020-07-08 17:01:22
 * @LastEditors: zwl
 * @LastEditTime: 2020-07-11 17:57:01
 */
export const _Debounce = (fn: any, t: number): Function => {
  const delay = t || 500
  let timer: any
  return function(): void {
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout((): void => {
      timer = null
      fn(...args)
    }, delay)
  }
}
export const _Throttle = (fn: any, t: number) => {
  let last: any
  let timer: any
  const interval = t || 500
  return function() {
    const args = arguments
    const now = +new Date()
    if (last && now - last < interval) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        fn(...args)
      }, interval)
    } else {
      last = now
      fn(...args)
    }
  }
}

export const _SpecialBox = (val: any) => {
  if (val.includes('box-size') && val.includes('.box-size')) {
    return val
  } else {
    return '<div class="box-size">' + val + '</div> <style>.box-size *{max-width:100%}</style>'
  }
}

export const _SelectArr = (arr: any, name: string, id: any = 'id'): any => {
  const arr1 = []
  for (const item of arr) {
    const obj: any = {}
    obj.value = item[id]
    obj.label = item[name]
    arr1.push(obj)
  }
  return arr1
}

export const _HandleSimplePage = (arr: any, currentPage: any, limit: any) => {
  const start = (+currentPage * limit) - limit
  const end = +currentPage * limit
  return arr.slice(start, end)
}

export const settings = {
  imgBaseUrl: 'https://website.bjike.com/api/attach/pub/img/'
}

export const _ToLine = (name: any) => {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}
export const _ToLineArr = (arr: any): any => {
  const obj: any = {}
  for (const item of arr) {
    obj[item] = _ToLine(item)
  }
  return obj
}

export const _ArrId = (val: any) => {
  const arr = []
  for (const item of val) {
    arr.push(item.id)
  }
  return arr
}

export const getImgId = (val: any) => {
  const index = val.lastIndexOf('\/')
  return val.substring(index + 1, val.length)
}

export const isEmpty = (obj: any) => {
  if (!obj && obj !== 0 && obj !== '') {
    return true
  }
  if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
    return true
  }
  if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
    return true
  }
  return false
}
