// 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b,...,a+nb 的时间
// 然后写一个 myClear，停止上面的 mySetInterVal

function mySetInterVal(fn,a,b) {
  this.a = a;
  this.b = b;
  this.time = 0;
  this.t = 0;
  this.start = () => {
    // 这里需要设置一个t是为了方便clear
    this.t = setTimeout(() => {
      fn();
      this.time++;
      // 间隔a+bn秒之后，再次执行
      this.start();
      console.log(this.a+this.time*this.b)
    }, this.a+this.time*this.b);
  }

  this.stop = () => {
    // 取消掉setTimeOut方法设置的timeout
    clearTimeout(this.t)
    this.time = 0
  }
}

var a = new mySetInterVal(()=>{console.log('123')},1000,1000)
a.start()
a.stop()