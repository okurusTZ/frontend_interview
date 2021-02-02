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





#### 双向绑定的不足之处

* 只能监听一个属性，不能监听整个对象。
  * 实例化后再添加属性，不会被监听到（可以用新增属性$set来解决
  * `this.$set(this.data, 'key', value)`添加单个属性
  * `this.obj = Object.assign({}, this.obj, {age: 18, name: 'xinyi'})`添加多个属性
* 需要for in遍历找对象中的属性
* 不能监听数组，需要对数组进行特异性操作（push，pop，shift
  * 利用index来设置数组项的时候，不能检测到。
  * 本质是无法监听到数组下标的变化
* 会污染源对象



#### 观察者模式和发布-订阅模式的区别

![img](https://user-gold-cdn.xitu.io/2017/11/22/15fe1b1f1797e09a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

发布订阅模式里，发布者的消息不会直接发送给订阅者。他们互相不知道对方的存在，需要一个第三方组件，叫做**信息中介**

![img](https://user-gold-cdn.xitu.io/2017/11/22/15fe1b1f07c13719?imageslim)

#### Vuex和双向绑定的冲突问题

问题来源：使用`v-model="obj.message"`时，如果这个obj本身是在计算属性中返回的一个store对象，那么用户在输入的时候，会试图修改obj.message。在严格模式时，会报错（在非mutation的位置尝试修改state

#### 解决方案

* 给input绑定value，然后侦听input或者change事件

  `<input :value="message" @input="updateMessage">`

  ```vue
  methods: {
  	updateMessage(e) {
  		this.$store.commit('updateMessage', e.target.value)
  	}
  }
  ```

* 双向绑定计算属性

  `<input v-model="message">`

  ```vue
  computed: {
  	message: {
  		get() {
  			return this.$store.state.obj.message;
  		}
  		set(value) {
  			this.$store.commit('updateMessage', value)
  		}	
  	}
  }
  ```

  

