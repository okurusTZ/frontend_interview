// 原理，利用了JS的事件循环机制，把对应的回调函数设置成了宏任务或者微任务
// 保证在主线程的操作执行完后，再执行的目的（DOM更新完后

// 使用场景： created()/mounted()等钩子函数里
// DOM操作时，例如：使用$ref来读取元素的时候
// 计算页面高度的时候

export const nextTick = (function () {
  // 用于存储外部传入的cb函数
  const callbacks = []
  // 是否正在等待的标志
  // false，允许触发在下次事件循环触发cb中的调用
  // true，已经触发过，需要等到下一次事件循环
  let pending = false

  // 这个函数是用来在下次事件循环中触发callbacks的触发函数
  let timerFunc

  // 异步执行，什么时候执行取决于是什么类型的任务
  function nextTickHandler () {
    pending = false
    // 复制callback
    const copies = callbacks.slice(0)
    // 清除callback
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
      // 依次触发回调函数
      copies[i]()
    }
  }
  // 如果支持promise，首先使用promise实现
  if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    timerFunc = () => {
      setImmediate(nextTickHandler)
    }
    // 如果不支持promise，但支持MutationObserver
    // H5新特性，异步，当DOM更新时触发，在所有的DOM改变结束后触发。
  } else if (typeof MessageChannel !== 'undefined' && (
    isNative(MessageChannel) ||
    // Phantomjs
    MessageChannel.toString() === '[object MessageChannelConstructor]'
  )) {
    const channel = new MessageChannel()
    const port = channel.port2
    channel.port1.onmessage = nextTickHandler
    timerFunc = () => {
      port.postMessage(1)
    }
  } else
  /* istanbul ignore next */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    // use microtask in non-DOM environments, e.g. Weex
    const p = Promise.resolve()
    timerFunc = () => {
      p.then(nextTickHandler)
    }
    // 都不支持的话，使用setTimeout
  } else {
    // fallback to setTimeout
    timerFunc = () => {
      setTimeout(nextTickHandler, 0)
    }
  }

  return function queueNextTick (cb, ctx) {
    let _resolve
    callbacks.push(() => {
      if (cb) {
        try {
          cb.call(ctx)
        } catch (e) {
          handleError(e, ctx, 'nextTick')
        }
      } else if (_resolve) {
        _resolve(ctx)
      }
    })
    if (!pending) {
      pending = true
      timerFunc()
    }
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        _resolve = resolve
      })
    }
  }
})()
