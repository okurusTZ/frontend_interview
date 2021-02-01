

### WEBPACK构建流程

1. 初始化参数，根据项目配置文件来初始化参数
2. 根据参数来初始化compiler，加载所有配置的插件，执行对象的run方法开始进行编译
3. 找到入口，根据配置中的entry找到入口文件
4. 从入口文件出发，调用所有配置的loader对模块进行翻译，再找出模块依赖的模块，递归本步骤直到所有依赖的文件都进行了处理。
5. 完成模块编译，输出每个模块被翻译后的最终内容和依赖图。
6. 根据入口和模块之间的依赖关系，组装成含有一个或多个模块的chunk，再把每个chunk转换成一个单独的文件添加到输出列表。
7. 输出完成，写入到文件系统中。



#### 1.优化图片

使用url-loader，将图片转化成base64压缩，防止小图片太多请求次数多。

```javascript
1：下载 url-loader
     npm install -D url-loader
2: 配置
   在 webpack.prod.conf.js 文件夹中配置
     module: {
      rules: [{
         test: /\.(png|svg|jpg|gif)$/,
         use: [{
           loader: 'url-loader', // 优化小图片过多造成请求数太多
           options: {
             limit: 8192, // 如果图片小于 8192 bytes 就直接 base64 内置到模板，否则才拷贝
             outputPath: 'img/'
           } 
         }]
      },
 
```

#### 2.分离第三方包

打包后的bundle.js文件夹较大，每次加载的时候请求慢，所以有必要在打包时候把第三方包分离出来，使用CommonsChunkPlugin插件进行配置。

#### 3.分离CSS文件并压缩

利用插件分离css文件，在项目加载的时候尽早优先加载css样式，也是为了解决js文件体积过大的问题。

#### 4.压缩js文件

利用uglify将js压缩，减少打包后的bundle.js等文件的大小

#### 5.压缩html文件

利用html-webpack-plugin进行压缩。

#### 6.路由的懒加载

把不同理由对应组件分割成不同的代码块，当路由被访问的时候才加载对应组件。