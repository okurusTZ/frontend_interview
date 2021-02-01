// 递归实现
function deepTraversal(node, nodeList=[]) {
  if(node !== null) {
    nodeList.push(node);
    let children = node.children;
    for(let i = 0; i < children.length; i++) {
      deepTraversal(children[i], nodeList);
    }
  }
  return nodeList;
}

// 非递归实现
function deepTraversal2(node) {
  let stack = [];
  let nodes = [];
  if(node) {
    stack.push(node);
    while(stack.length){
      let item = stack.pop();
      let children = item.children;
      nodes.push(item);
      for(let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i]);
      }
    }
  }
  return nodes;
}