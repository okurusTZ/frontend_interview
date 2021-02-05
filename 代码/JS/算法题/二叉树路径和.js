function maxPathSum( root ) {
  // write code here
  if(!root)return 0;
  let max = -Infinity;
  const getMax = (root) => {
      let rootLeft = root.left ? getMax(root.left) : 0;
      let rootRight = root.right ? getMax(root.right) : 0;
      if(rootLeft < 0){
          rootLeft = 0;
      }
      if(rootRight < 0) {
          rootRight = 0;
      }
      max = Math.max(max, rootLeft + rootRight + root.val);
      return rootLeft > rootRight ? rootLeft + root.val : rootRight + root.val;
  }
  getMax(root);
  return max;
  
}