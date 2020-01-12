/**
 * 防抖函数
 * @param func 要执行的函数
 * @param wait 等待事件
 * @param immediate 是否立即执行
 */
function debouncing(func: Function, wait: number = 0, immediate: boolean = false) {
  let timeout: any = null;
  return function(this: any) {
    const args = arguments;
    const _this = this;

    const later = function() {
      timeout = null;
      if (!immediate) func.apply(_this, args);
    }
    const now = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (now) func.apply(_this, args);
  }
}

/**
 * 节流
 * @param func 要节流的函数
 * @param wait 节流间隔时间
 */
function throttling(func: Function, wait: number = 0) {
  let timeout: any = null;
  let startTime = Date.now();
  return function (this: any) {
    const args = arguments;
    const _this = this;
    const curTime = Date.now();
    clearTimeout(timeout);

    if (curTime - startTime >= wait) {
      func.apply(_this, args);
      startTime = curTime
    } else {
      timeout = setTimeout(() => {
        func.apply(_this, args);
      }, wait)
    }
  }
}

export {
  debouncing,
  throttling
}
