var arr = [3, 15, 8, 29, 102, 22];
console.log(arr.sort((a, b) => {
  // 如果没有表达式，默认是按照UTF-16的顺序排序的
  return (a - b)
}));