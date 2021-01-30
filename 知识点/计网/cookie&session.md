### Cookie

理论上，在程序里一个用户的所有请求都应该属于同一个会话。但因为HTTP协议是无状态的协议，一旦数据交换完毕，客户端和服务器端的连接就关闭了，再次交换数据需要建立新的连接，意味着无法服务器无法从连接上跟踪会话。

##### 因此cookie被设计用来弥补HTTP协议的不足。

cookie相当于是给客户端办法的通行证，服务器可以根据cookie上的信息来确认客户身份。

本质：一小段文本信息。

客户端请求服务器，如果服务器需要记录该用户状态，就使用response向客户端浏览器发送一个cookie。客户端浏览器把cookie保存下来，下一次请求的时候把请求的网址连同该cookie一起提交给服务器。服务器检查cookie，以此确认用户的状态。

##### Cookie具有不可跨域名性

根据规范，浏览器访问Google只会携带Google的cookie，不会携带Baidu的cookie。同样，也只能操作自身的cookie。

##### Cookie的属性

* name：名称，一旦创建不可更改
* value：值
* maxAge：cookie失效的时间
* secure：是否仅被使用安全协议传输（上传数据前先将数据加密
* path：使用路径
* domain：可以访问该cookie的域名
* comment：用处说明
* version：cookie的版本号

##### 有效期(maxAge)

如果为正数，则表示cookie会在maxAge秒后自动失效，浏览器会将未失效的cookie持久化，写到对应的cookie文件中去，无论是关闭了浏览器还是电脑，只要在maxAge秒之前，登录网站cookie仍然有效。

如果为负数，则表示cookie只在本浏览器窗口和子窗口内有效，关闭窗口后马上失效。该cookie为临时性cookie。**cookie的默认maxAge为-1**

##### 修改和删除

修改：不提供对应操作，只需要建一个同名cookie，添加到response中覆盖原来的cookie即可。

删除：建一个同名cookie，设置maxAge为0，并添加到response中覆盖原来的cookie。

##### cookie的域名

不可跨域性。处于隐私安全机制决定，防止非法网站获取其他网站的cookie。

正常情况下，同一个一级域名下的两个二级域名，例如www.baidu.com和image.baidu.com也是不能交互cookie的，因为两者的域名并不严格相同。

> 如果要让二级域名都可以使用cookie，设置domain参数。
>
> setDomain(".baidu.com")

##### cookie的路径

决定的是访问cookie的路径，即哪些路径下的程序可以使用cookie。页面只能获取属于他path的cookie。

##### cookie的安全属性

设置secure为true，浏览器只会在HTTPS和SSL等安全协议中传输此类cookie。但不能对cookie内容加密，如果需要高安全性，需要在程序中对cookie内容加密、解密，以防泄露。

##### 禁止JS访问cookie

设置httpOnly

`header("Set-Cookie:hidden=value;httpOnly")`

##### cookie的SameSite属性

防止CSRF攻击和用户追踪，用于限制第三方发出的cookie，减少安全风险。

* Strict

  完全禁止第三方Cookie，跨站点时，任何情况下都不会发送Cookie

  > 用户体验不好，比如当前网页有一个github的连接，用户点击跳转就不会带有github
  >
  > 的cookie，跳转过去总是未登录状态

* Lax

  大多数情况不发送第三方cookie，但是导航到目标网址的get请求除外

* None

  显式关闭SameSite属性。前提必须设置secure属性，不然无效。（保证安全

##### 如何保护cookie

* httpOnly：无法通过脚本获取cookie
* secure：只能在加密传输中传输

### Session机制

session主要用来在服务器端记录客户端状态，比cookie简单，但会相应增加服务器的存储压力。

##### 什么是session？

另一种记录状态的机制，但保存在服务器上。客户端浏览器访问服务器的时候，服务器把客户端的信息以某种形式记录在服务器上，就是session。客户端再次访问的时候只要从session里查找该客户的状态即可。

> cookie是客户身上的通行证，服务器检查通行证来确定客户身份。
>
> session是检查服务器上的客户明细表来确认客户身份，是在服务器上建立的客户档案。

##### 实现用户登录

session是在客户端第一次请求服务器的时候创建的

##### 生命周期

为了获取更高的存取速度，一般放在内存里。每个用户有独立的session。如果session过于复杂，大量客户访问的时候会导致内存溢出，所以session里的信息应该尽量简洁。

session生成后，只要用户继续访问，服务器就会更新最后访问时间，并维护该session。

##### 有效期

服务器会把长期没有活跃的session从内存中删除。这个时间的就是超过时间。

##### 常用方法

* setAttribute：设置session的属性
* getAttribute：返回session的属性
* getAttributeName：返回session中的属性名
* removeAttribute：移除session属性
* getId：返回session的ID
* getCreationTime：返回创建日期
* getLastAccessedTime：获取最后活跃时间
* getMaxInactiveInterval：返回超过时间
* setMaxInactiveInterval：设置超过时间
* isNew：返回是否新创建
* invalidate：使失效



##### session对浏览器的要求

session本身仍然需要cookie支持，因为session不能通过HTTP链接来判断是否为同一个用户，因此服务器要向客户端发送一个名为SessionID的cookie，它的值为session的id，session一局cookie来识别是否为同一个用户。

> 此处的cookie是自动生成，maxAge一般为-1，仅在当前浏览器有效。因此同一机器的两个窗口访问服务器时，会生成不同的session。但子窗口会共享cookie，并共享session。

##### 如果浏览器禁用cookie？

使用URL地址重写，将session的id重写到URL地址中，服务器能解析重写后的URL获取session的id。





### Session和Cookie的比较

1. **存放位置**不同，cookie在用户的浏览器上，而session放在服务器上。
2. **安全性**cookie不是很安全，别人可以分析存放在本地的cookie并进行攻击
3. 设置cookie时间可以使cookie过期。但使用session-destroy会销毁会话。
4. session会在一定时间内保存在服务器上，访问增多时，会影响服务器**性能**
5. 单个cookie的**保存数据**不能超过4k，很多浏览器都限制一个占点最多保存20个cookie。而session没有存储数据量的限制，可以保存更复杂的数据类型。



### 拓展：token

##### 组成

uid+time+sign[+params]

* uid：用户的唯一身份标识
* time：当前时间的时间戳
* sign：签名，`hash/encrypt`压缩成16进制字符串，防止第三方恶意拼接
* params：常用的固定参数，避免重复查库

##### 存放

在客户端存放在localStorage、cookie或者sessionStorage里。在服务器一般存放在数据库里。

##### 认证流程

* 用户登录，服务器把Token返回给客户端
* 客户端收到数据后保存
* 再次访问时，把token放入headers里
* 服务器通过**filter过滤器**校验。校验成功则返回请求数据，失败则返回错误码

##### 抵抗CSRF攻击

CSRF攻击中，**form发起的POST请求不受到浏览器同源策略的限制**，因此cookie会被添加到请求头中。而token不会被浏览器自动添加到headers里，提交的表单无法通过服务器过滤。