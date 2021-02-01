
const { spawn } = require("child_process");

// 原理就是把generator函数和自动执行器包装在了一个函数里
async function fn(args) {
  // do sth
}

function fn(args) {
  return spawn( function* () {
    // do sth
  })
}

function spawn(genFn) {
  return new Promise((resolve, reject) => {
    let gen = genFn();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch (error) {
        return reject(error);
      }
      // 表示所有的await都执行完成了
      if(next.done) {
        return resolve(next.value);
      }
      // 建一个新的Promise
      Promise.resolve(next.value).then(v => {
        step(() => {
          // 把值传入下下步
          return gen.next(v);
        });
      }, e => {
        step(() => {
          // 抛出错误
          return gen.throw(e);
        })
      })
    }
    step(() => {
      return gen.next(undefined);
    })
  })
}