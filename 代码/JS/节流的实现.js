// 利用时间戳实现

function throttle(func, wait) {
  let context, args;
  // 时间戳
  let previous = 0;

  return function() {
    let now = +new Date();
    context = this;
    args = arguments;
    // 如果超过时间戳，就更新
    if (now - previous > wait) {
      func.apply(context, args)
      previous = now
    }
  }
}

// 利用计时器实现

function throttle2(func, wait) {
  let timeout;
  return function() {
    const context = this
    const args = arguments
    // 如果没有设定timeout
    if(!timeout) {
      timeout = setTimeout(() => {
        // 经过wait的time后，清空timeout计时器
        timeout = null;
        func.apply(context, args)
      }, wait);
    }
  }
}