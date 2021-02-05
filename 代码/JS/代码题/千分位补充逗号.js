
let str='1234567'
function convertMoney(str){
    let strarr=str.split('.');
    let first=strarr[0];
    let second=strarr[1] || '00';
    let idx=0;
    let res=[]
    for(let i=first.length-1;i>=0;i--){
       idx++;
       res.unshift(first[i])
       if(idx %3==0){
          res.unshift(',')
       }
       console.log(res)
    }
    let results=res.join('')+'.'+ second;
    return results
}
console.log(convertMoney(str))