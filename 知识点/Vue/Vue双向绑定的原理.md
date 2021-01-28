![图片描述](https://segmentfault.com/img/bVBQYu?w=730&h=390)

### 发布-订阅模式

* 发布者：observer
* 订阅者： watcher
* 调度中心：dep



#### Object.defineProperty()

三个参数：

1. 属性所在的对象
2. 要操作的属性
3. 被操作属性的特性{}
   * get：读取属性时触发
   * set：修改属性时触发



```javascript
var obj = {}
Object.defineProperty(obj, 'value', {
    get() {
        // 拦截到get事件时需要做的事
    },
    set() {
        // 拦截到set事件时需要做的事
    }
});


```

#### 数据劫持

通过`Object.defineProperty()`来操作数据的get和set



#### 思路整理

1. 利用observer，拦截对象的get和set方法。一旦开始观察，就生成一个订阅器，包含订阅者数组，用于存放watcher
2. 一旦指定的value被get了，就把这个watcher加入到订阅者队列里去。（实际上watcher在自身实例化的时候，自动调用get方法，往订阅器里添加自己
3. 每当属性变动的时候，触发observer里的set方法，让订阅器向所有数组里的订阅者发送一个notify方法，通知所有订阅者更新自身的数据。

