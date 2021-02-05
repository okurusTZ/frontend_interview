const { func } = require("prop-types");

function spiralOrder(arr) {
  const m = arr.length;
  const n = arr[0].length;
  let left = 0, right = n - 1, top = 0, bottom = m - 1;
  let length = m * n;
  let res = [];
  while(res.length < length) {
    for(let i = left; i <= right; i++) {
      res.push(arr[top][i]);
    }
    top++
    for(let i = top; i <= bottom; i++) {
      res.push(arr[i][bottom]);
    }
    right--;
    if(left > right || top > bottom)break;
    for(let i = right; i >= left; i--) {
      res.push(arr[bottom][i]);
    }
    bottom--;
    for(let i = bottom; i >= top; i--) {
      res.push(arr[i][left])
    }
    left++;
  }
  return res;
}