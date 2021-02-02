
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  })
}


sleep(1000).then(() => {
  console.log('我醒了');
});

// async
async function sleepAsync() {
  console.log('sleepy');
  await sleep(5000);
  console.log('continue working...')
}

sleepAsync()

// generator
function* gen() {
  yield sleep(5000);
}
var g = gen();
g.next().value.then(() => {
  console.log('我也醒了');
});


// callback
function esleep(callback,time) {
  if(typeof callback === 'function') {
    setTimeout(callback, time);
  }
}
function output() {
  console.log('callback也醒了');
}
esleep(output, 8000)