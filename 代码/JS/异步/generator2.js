const fs = require('fs')

const readFile = function(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if(err) return reject(err);
      resolve(data);
    })
  })
}

const gen = function* () {
  const f1 = yield readFile('./Fib.js')
  const f2 = yield readFile('./EventLoop.js')
  console.log(f1.toString());
  console.log(f2.toString());
}
