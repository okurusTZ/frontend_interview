![Vue 实例生命周期](https://cn.vuejs.org/images/lifecycle.png)

```vue
var vm = new Vue({
	el: '#app',
	data: {
		message: 'Vue的生命周期'
	}
})
```



* `beforeCreate()`
  * el: undefined
  * data: undefined
  * message: undefined
* `created()`
  * el: undefined
  * data: [object object]
  * message: 'Vue的生命周期'
* `beforeMount()`
  * el: [object HTMLDiveElement]...
  * data: [object object]
  * message: 'Vue的生命周期'
* `mounted()`
  * el: [object HTMLDiveElement]...
  * data: [object object]
  * message: 'Vue的生命周期'
* `beforeUpdate()`
* `updated()`
* `beforeDestroy()`
* `destroyed()`



1. 在beforeCreate和created钩子函数之间的生命周期

   > 这个生命周期之间，初始化时间，进行数据的观测，created的时候，数据已经和data属性进行绑定了，当data中的属性值变化时，视图也会变化
   >
   > 但还是没有el选项

2. created和beforeMount之间的生命周期

   > **1.首先判断是否有el选项**，如果有就继续向下编译，如果没有el选项，就停止编译，也就是生命周期停止，直到在该实例上调用了vm.$mount(el)
   >
   > 如果注释掉代码中的`el:'#app'`部分，那么在created状态就停止了。后面继续调用`vm.$mount(el)`，则可以继续执行。
   >
   > **2.判断是否有template参数**，如果有，则将其作为模板编译成render函数，如果没有则将外部html作为模板编译。其中在template中的模板优先级是高于外部html的。
   >
   > 因此可以看出为何el的判断要在template之前，因为vue需要通过el来找到对应的outer template。
   >
   > 同时，也可以通过Vue对象中的render函数来做渲染操作。
   >
   > 综合优先级：
   >
   > render函数 > template > outer HTML

   如下代码，页面中渲染的是this is createElement

   ```Vue
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>vue生命周期学习</title>
     <script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
   </head>
   <body>
     <div id="app">
       <!--html中修改的-->
       <h1>{{message + '这是在outer HTML中的'}}</h1>
     </div>
   </body>
   <script>
     var vm = new Vue({
       el: '#app',
       template: "<h1>{{message +'这是在template中的'}}</h1>", //在vue配置项中修改的
       data: {
         message: 'Vue的生命周期'
       },
       render() {
           return createElement('h1', 'this is createElement')
       }
   </script>
   </html>
   ```

   

3. beforeMount和mounted之间的生命周期

   > 给Vue实例对象添加$el成员，并替换掉挂载的DOM元素

4. mounted

   > mouted之前， 对应的值还是{{}}语法占位的，以虚拟DOM的形式存在，mouted之后，内容被替换。

   ![clipboard.png](https://segmentfault.com/img/bVVUYC?w=424&h=274)

5. beforeUpdate和updated之间的生命周期

   > 当Vue发现data中的数据发生了改变，会触发对应组件的重新渲染。
   >
   > beforeUpdate，可以监听到data的变化，但是view层没有被重新渲染，view层数据没有变化。
   >
   > updated后，view层数据才被重新渲染，数据更新。

6. beforeDestroy和destroyed之间的生命周期

   > 当vm.$destroy()被调用时，beforeDestroy在实例销毁前调用，此时实例完全可用。
   >
   > destroyed在实例销毁后调用，调用后，所有Vue实例指示的东西都会解绑，所有的监听器被移除，子实例也被销毁。