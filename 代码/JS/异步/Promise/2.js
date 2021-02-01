async function async1(){
  console.log('async1 start');
   await async2();
  //  这个后面的代码被放入微队列里去了
   console.log('async1 end')
}
async function async2(){
   console.log('async2')
}

console.log('script start');
async1();
console.log('script end')