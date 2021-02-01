// 本身就是Generator函数的语法糖，把*用async替代，把yield用await替代

const fs = require('fs')

const readFile = function(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if(err) return reject(err);
      resolve(data);
    })
  })
}

const gen = async function () {
  const f1 = await readFile('./generator2.js')
  const f2 = await readFile('./generator.js')
  console.log(f1.toString());
  console.log(f2.toString());
}

// 不需要next()
// 直接调用函数即可
gen()