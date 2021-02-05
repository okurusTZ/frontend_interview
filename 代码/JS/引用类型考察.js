
let a={m:10,n:30}
let b=a;
let c=b;
b.m=20;
let d={...b}
c={n:40}
 
console.log(a.m) //20
console.log(a===b) //true
console.log(a===c) //false
console.log(b===d) //false（...运算符第一层深拷贝，如果某项还是引用类型会互相影响）
console.log(b===c) //false