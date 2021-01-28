const arr = [98, 42, 25, 54, 15, 3, 25, 72, 41, 10, 121];

function quickSort(arr) {
  if(arr.length <= 1) {
    return arr;
  }
  const pivotIndex = Math.floor(arr.length / 2);
  var left = [];
  var right = [];
  // 从数组中取出基准元素并删除
  const pivot = arr.splice(pivotIndex, 1)[0];
  arr.forEach(number => {
    if(number > pivot) {
      right.push(number);
    } else {
      left.push(number);
    }
  });
  // 此时，已经被分为left和right两边
  return quickSort(left).concat(pivot, quickSort(right))
}

console.log(quickSort(arr))



function bubbleSort(arr) {
  let length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}