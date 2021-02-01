// 只包含基本数据类型的拷贝
const arr = [1,2,3]
const arr1 = arr.slice();
const arr2 = [...arr];
const arr3 = [].concat(arr);
const arr4 = Array.from(arr);

arr[0] = 100;
console.log(arr,arr1,arr2,arr3,arr4);

const array = [{name: 'xinyi'}, {height: 198}]
const array1 = array.slice();
const array2 = [...array];
const array3 = [].concat(array);
const array4 = Array.from(array);

array[0].name = 'able'
// 浅拷贝，指向的都是同一个对象，所以该对象的name改变时，其他也跟着变了
console.log(array,array1,array2,array3,array4);