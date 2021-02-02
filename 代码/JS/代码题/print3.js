var a = {
  i: 1,
  toString() {
    return a.i++;
  }
}

// == 会隐式转换，所以重写toString()即可
// 这里是把一个对象类转换成了number，所以调用了toString方法
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}