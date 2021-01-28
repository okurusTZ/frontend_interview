arr = [3, 4, 2, 1, 10, 8, 7, 12, 3]

/**
 * 原理：比较相邻两个元素，如果后面的比前面的小，就交换顺序
 */
function bubbleSort(arr) {
  let length = arr.length;
  // 外层循环，控制趟数，每次只找一个最大值
  for(var i = 0; i < length - 1; i++) {
    for (var j = 0; j < length - 1 - i; j++) {
      if(arr[j+1] < arr[j]) {
        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp; 
      }
    }
  }
  return arr;
}

// bubbleSort(arr)
console.log(bubbleSort(arr))