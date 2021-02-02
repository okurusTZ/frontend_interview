

function _all(promises){
  return new Promise((resolve,reject) => {
    if(!Array.isArray(promises)){
      return reject(new TypeError('arguments should be Array'))
    }
    let count = 0;
    let results = new Array(promises.length);
    for(let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(res => {
        count ++;
        results[i] = res;
        if(count == promises.length) {
          return resolve(results)
        }
      }, rej => {
        reject(rej);
      })
    }
  })
}