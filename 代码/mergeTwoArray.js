// 合并二维有序数组成一维有序数组，归并排序的思路


// 此函数用于处理把两个一维数组拼接
function merge(arr1, arr2) {
  var res = []
  while(arr1.length > 0 & arr2.length > 0) {
    if(arr1[0] < arr2[0]) {
      // shift()方法用于把第一个数组的第一个元素删除，并返回其值
      res.push(arr1.shift())
    }else {
      res.push(arr2.shift())
    }
  }
  // 处理一个arr先添加完的情况
  return res.concat(arr1).concat(arr2);
}

function mergeArr(arr) {
  let arrLen = arr.length;
  
  // 处理空的情况
  if(arrLen === 0) {
    return [];
  }
  // 这里需要使用arr.length因为会随时变化
  while(arr.length > 1){
    // 获取第一个一维数组
    let arrayItem1 = arr.shift()
    // 获取第二个一维数组
    let arrayItem2 = arr.shift()
    res = merge(arrayItem1, arrayItem2)
    arr.push(res)
  }
  return arr[0]
}

var arr1 = [[1,5,7],[2,3,4],[2,5,6]];
console.log(mergeArr(arr1))