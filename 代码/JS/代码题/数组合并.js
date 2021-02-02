/**
 * 请把两个数组 [‘A1’, ‘A2’, ‘B1’, ‘B2’, ‘C1’, ‘C2’, ‘D1’, ‘D2’] 和 [‘A’, ‘B’, ‘C’, ‘D’]，
 * 合并为 [‘A1’, ‘A2’, ‘A’, ‘B1’, ‘B2’, ‘B’, ‘C1’, ‘C2’, ‘C’, ‘D1’, ‘D2’, ‘D’]。
 */

var a1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 
var a2 = ['A', 'B', 'C', 'D']

const arr = [...a1]
let idx = 0;
for(let i = 0; i < a2.length; i++) {
  const RE = new RegExp(a2[i])
  console.log(RE);
  while(idx < arr.length) {
    ++idx;
    if(!RE.test(arr[idx])) {
      // console.log(idx);
      arr.splice(idx, 0, a2[i])
      break;
    }
  }
}
console.log(arr);