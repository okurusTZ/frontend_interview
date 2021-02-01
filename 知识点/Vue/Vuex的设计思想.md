核心是**状态管理**，组件之间都有共享的状态，例如一个组件需要获取另一个组件的状态，或者一个组件需要改变另一个组件的状态等。

状态管理的解决思路：把组件之间需要共享的状态抽离出来，遵循特定的规律来统一管理，让状态的变化可以预测和追踪。

![img](https://pic1.zhimg.com/80/v2-1b21813cd1d621658fe7402f0af4b104_720w.jpg)

#### store

全局唯一的，包含着应用中的状态state。可以通过`this.$store.state`访问到。

state改变，view也会跟着改变，利用的是Vue的响应式机制。

#### Mutation

state不能直接更改（无法跟踪到状态的变化）

更改Vuex里store中状态的唯一方法是提交mutation。mutation非常类似于事件，每个mutation有一个字符串的事件类型和一个回调函数。

触发`store.commit('func')`

**mutation里都是同步事务**，不同步修改的话会很难调试，不知道什么时候改变发生，难确定先后顺序。A/B两个mutation调用顺序可能是A->B，但最终改变state的结果是B->A；

#### Action

**用于处理异步**，View通过`store.dispatch('func')`来触发某个Action，Action里不管经过多少异步操作，最后通过`store.commit('func')`来触发mutation。一个Action里可以触发多个mutation。

#### Getter

方便计算属性的复用

#### Module

实际上是把一个大的store拆开。每个module有自己的state、mutation...

