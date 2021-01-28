function trim(str) {
  let reg = /\s+/g;
  return str.replace(reg, '');
}

// 正则表达式

//^ 匹配输入的开始   
// /^A/ 匹配的是以A开头的： 'Act'， 但不会匹配'an A'

//$ 匹配输入的结尾   
// /t$/ 并不会匹配 "eater" 中的 't'，但是会匹配 "eat" 中的 't'

//* 匹配一个表达式0次或多次
// /bo*/ 会匹配 "A ghost boooooed" 中的 'booooo' 和 "A bird warbled" 中的 'b'，但是在 "A goat grunted" 中不会匹配任何内容。

//+ 匹配前面一个表达式 1 次或者多次。等价于 {1,}。
// /a+/ 会匹配 "candy" 中的 'a' 和 "caaaaaaandy" 中所有的 'a'，但是在 "cndy" 中不会匹配任何内容。

//? 匹配前面一个表达式 0 次或者 1 次。等价于 {0,1}。

// /e?le?/ 匹配 "angel" 中的 'el'、"angle" 中的 'le' 以及 "oslo' 中的 'l'。


console.log(typeof [])