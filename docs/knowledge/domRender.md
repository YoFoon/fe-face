# 浏览器渲染原理

### 前言

浏览器的内核是指支持浏览器运行的最核心的程序，分为两个部分的，一是渲染引擎，另一个是 JS 引擎。渲染引擎在不同的浏览器中也不是都相同的。比如在 Firefox 中叫做 Gecko，在 Chrome 和 Safari 中都是基于 WebKit 开发的。本文我们主要介绍关于 WebKit 的这部分渲染引擎内容以及几个相关的问题。

![img](https://image.fundebug.com/2019-01-03-0.png)

### 浏览器工作大体流程

![img](https://image.fundebug.com/2019-01-03-1.png)

浏览器工作流程大体分为如下三部分：

#### 1）浏览器会解析三个东西：

- 一个是 HTML/SVG/XHTML，事实上，Webkit 有三个 C++的类对应这三类文档。解析这三种文件会产生一个 DOM Tree。
- CSS，解析 CSS 会产生 CSS 规则树。
- Javascript，脚本，主要是通过 DOM API 和 CSSOM API 来操作 DOM Tree 和 CSS Rule Tree.

#### 2）解析完成后，浏览器引擎会通过 DOM Tree 和 CSS Rule Tree 来构造 Rendering Tree。

- Rendering Tree 渲染树并不等同于 DOM 树，因为一些像 Header 或 display:none 的东西就没必要放在渲染树中了。
- CSS 的 Rule Tree 主要是为了完成匹配并把 CSS Rule 附加上 Rendering Tree 上的每个 Element。也就是 DOM 结点。也就是所谓的 Frame。
- 然后，计算每个 Frame（也就是每个 Element）的位置，这又叫 layout 和 reflow 过程。

#### 3）最后通过调用操作系统 Native GUI 的 API 绘制。

> 接下来我们针对这其中所经历的重要步骤，一一详细阐述。

### 构建 DOM

浏览器会遵守一套步骤将 HTML 文件转换为 DOM 树。宏观上，可以分为几个步骤：

![img](https://image.fundebug.com/2019-01-03-2.png)

- 浏览器从磁盘或网络读取 HTML 的原始字节，并根据文件的指定编码（例如 UTF-8）将它们转换成字符串。

在网络中传输的内容其实都是 0 和 1 这些字节数据。当浏览器接收到这些字节数据以后，它会将这些字节数据转换为字符串，也就是我们写的代码。

- 将字符串转换成 Token，例如：`<html>`、`<body>`等。**Token 中会标识出当前 Token 是“开始标签”或是“结束标签”亦或是“文本”等信息**。

这时候你一定会有疑问，节点与节点之间的关系如何维护？

事实上，这就是 Token 要标识“起始标签”和“结束标签”等标识的作用。例如“title”Token 的起始标签和结束标签之间的节点肯定是属于“head”的子节点。

![img](https://image.fundebug.com/2019-01-03-3.png)

上图给出了节点之间的关系，例如：“Hello”Token 位于“title”开始标签与“title”结束标签之间，表明“Hello”Token 是“title”Token 的子节点。同理“title”Token 是“head”Token 的子节点。

- 生成节点对象并构建 DOM

事实上，构建 DOM 的过程中，不是等所有 Token 都转换完成后再去生成节点对象，而是一边生成 Token 一边消耗 Token 来生成节点对象。换句话说，每个 Token 被生成后，会立刻消耗这个 Token 创建出节点对象。**注意：带有结束标签标识的 Token 不会创建节点对象。**

接下来我们举个例子，假设有段 HTML 文本：

```
<html>
<head>
    <title>Web page parsing</title>
</head>
<body>
    <div>
        <h1>Web page parsing</h1>
        <p>This is an example Web page.</p>
    </div>
</body>
</html>
```

上面这段 HTML 会解析成这样：

![img](https://image.fundebug.com/2019-01-03-4.png)

### 构建 CSSOM

DOM 会捕获页面的内容，但浏览器还需要知道页面如何展示，所以需要构建 CSSOM。

构建 CSSOM 的过程与构建 DOM 的过程非常相似，当浏览器接收到一段 CSS，浏览器首先要做的是识别出 Token，然后构建节点并生成 CSSOM。

![img](https://image.fundebug.com/2019-01-03-5.png)

在这一过程中，浏览器会确定下每一个节点的样式到底是什么，并且这一过程其实是很消耗资源的。因为样式你可以自行设置给某个节点，也可以通过继承获得。在这一过程中，浏览器得递归 CSSOM 树，然后确定具体的元素到底是什么样式。

**注意：CSS 匹配 HTML 元素是一个相当复杂和有性能问题的事情。所以，DOM 树要小，CSS 尽量用 id 和 class，千万不要过渡层叠下去**。

### 构建渲染树

当我们生成 DOM 树和 CSSOM 树以后，就需要将这两棵树组合为渲染树。

![img](https://image.fundebug.com/2019-01-03-6.png)

在这一过程中，不是简单的将两者合并就行了。**渲染树只会包括需要显示的节点和这些节点的样式信息**，如果某个节点是 `display: none` 的，那么就不会在渲染树中显示。

### 布局与绘制

当浏览器生成渲染树以后，就会根据渲染树来进行布局（也可以叫做回流）。这一阶段浏览器要做的事情是要弄清楚各个节点在页面中的确切位置和大小。通常这一行为也被称为“自动重排”。

布局流程的输出是一个“盒模型”，它会精确地捕获每个元素在视口内的确切位置和尺寸，所有相对测量值都将转换为屏幕上的绝对像素。

布局完成后，浏览器会立即发出“Paint Setup”和“Paint”事件，将渲染树转换成屏幕上的像素。

> 以上我们详细介绍了浏览器工作流程中的重要步骤，接下来我们讨论几个相关的问题：

### 问题一：渲染过程中遇到 JS 文件怎么处理？

JavaScript 的加载、解析与执行会阻塞 DOM 的构建，也就是说，在构建 DOM 时，HTML 解析器若遇到了 JavaScript，那么它会暂停构建 DOM，将控制权移交给 JavaScript 引擎，等 JavaScript 引擎运行完毕，浏览器再从中断的地方恢复 DOM 构建。

也就是说，如果你想首屏渲染的越快，就越不应该在首屏就加载 JS 文件，这也是都建议将 script 标签放在 body 标签底部的原因。当然在当下，并不是说 script 标签必须放在底部，因为你可以给 script 标签添加 defer 或者 async 属性（下文会介绍这两者的区别）。

JS 文件不只是阻塞 DOM 的构建，它会导致 CSSOM 也阻塞 DOM 的构建。

原本 DOM 和 CSSOM 的构建是互不影响，井水不犯河水，但是一旦引入了 JavaScript，CSSOM 也开始阻塞 DOM 的构建，只有 CSSOM 构建完毕后，DOM 再恢复 DOM 构建。

这是什么情况？

这是因为 JavaScript 不只是可以改 DOM，它还可以更改样式，也就是它可以更改 CSSOM。前面我们介绍，不完整的 CSSOM 是无法使用的，但 JavaScript 中想访问 CSSOM 并更改它，那么在执行 JavaScript 时，必须要能拿到完整的 CSSOM。所以就导致了一个现象，如果浏览器尚未完成 CSSOM 的下载和构建，而我们却想在此时运行脚本，那么浏览器将延迟脚本执行和 DOM 构建，直至其完成 CSSOM 的下载和构建。也就是说，**在这种情况下，浏览器会先下载和构建 CSSOM，然后再执行 JavaScript，最后在继续构建 DOM**。

### 问题二：你真的了解回流和重绘吗

![img](https://image.fundebug.com/2019-01-03-7.png)

我们知道，当网页生成的时候，至少会渲染一次。在用户访问的过程中，还会不断重新渲染。重新渲染会重复上图中的第四步(回流)+第五步(重绘)或者只有第五个步(重绘)。

- 重绘:当 render tree 中的一些元素需要更新属性，而这些属性只是影响元素的外观、风格，而不会影响布局的，比如 background-color。
- 回流:当 render tree 中的一部分(或全部)因为元素的规模尺寸、布局、隐藏等改变而需要重新构建

**回流必定会发生重绘，重绘不一定会引发回流**。重绘和回流会在我们设置节点样式时频繁出现，同时也会很大程度上影响性能。回流所需的成本比重绘高的多，改变父节点里的子节点很可能会导致父节点的一系列回流。

#### 1）常见引起回流属性和方法

任何会改变元素几何信息(元素的位置和尺寸大小)的操作，都会触发回流，

- 添加或者删除可见的 DOM 元素；
- 元素尺寸改变——边距、填充、边框、宽度和高度
- 内容变化，比如用户在 input 框中输入文字
- 浏览器窗口尺寸改变——resize 事件发生时
- 计算 offsetWidth 和 offsetHeight 属性
- 设置 style 属性的值

![img](https://image.fundebug.com/2019-01-03-8.png)

#### 2）常见引起重绘属性和方法

![img](https://image.fundebug.com/2019-01-03-9.png)

下面例子中，触发了几次回流和重绘？

```
var s = document.body.style;
s.padding = "2px"; // 回流+重绘
s.border = "1px solid red"; // 再一次 回流+重绘
s.color = "blue"; // 再一次重绘
s.backgroundColor = "#ccc"; // 再一次 重绘
s.fontSize = "14px"; // 再一次 回流+重绘
// 添加node，再一次 回流+重绘
document.body.appendChild(document.createTextNode('abc!'));
```

#### 3）如何减少回流、重绘

- 使用 transform 替代 top
- 使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局）
- 不要把节点的属性值放在一个循环里当成循环里的变量。

```
for(let i = 0; i < 1000; i++) {
    // 获取 offsetTop 会导致回流，因为需要去获取正确的值
    console.log(document.querySelector('.test').style.offsetTop)
}
```

- 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
- 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 requestAnimationFrame
- CSS 选择符从右往左匹配查找，避免节点层级过多
- 将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点。比如对于 video 标签来说，浏览器会自动将该节点变为图层。

### 问题三：async 和 defer 的作用是什么？有什么区别?

接下来我们对比下 defer 和 async 属性的区别：

![img](https://image.fundebug.com/2019-01-03-10.png)

其中蓝色线代表 JavaScript 加载；红色线代表 JavaScript 执行；绿色线代表 HTML 解析。

#### 1）情况 1 `<script src="script.js"></script>`

- 浏览器一边下载 HTML 网页，一边开始解析。也就是说，**不等到下载完，就开始解析**。
- 解析过程中，浏览器发现`script`元素，就暂停解析，把网页渲染的控制权转交给 JavaScript 引擎。
- 如果`script`元素引用了外部脚本，就下载该脚本再执行，否则就直接执行代码。
- avaScript 引擎执行完毕，控制权交还渲染引擎，恢复往下解析 HTML 网页。

#### 2）情况 2 `<script async src="script.js"></script>` (**异步下载**)
- 浏览器开始解析 HTML 网页。
- 解析过程中，发现带有async属性的script标签。
- 浏览器继续往下解析 HTML 网页，同时并行下载`<script>`标签中的外部脚本。
- 脚本下载完成，浏览器暂停解析 HTML 网页，开始执行下载的脚本。
- 脚本执行完毕，浏览器恢复解析 HTML 网页。

async属性可以保证脚本下载的同时，浏览器继续渲染。

async无法保证脚本的执行顺序。哪个脚本先下载结束，就先执行那个脚本。

使用async属性的脚本文件里面的代码，不应该使用document.write方法。

#### 3）情况 3 `<script defer src="script.js"></script>`(**延迟执行**)
- 浏览器开始解析 HTML 网页。
- 解析过程中，发现带有defer属性的`script`元素。
- 浏览器继续往下解析 HTML 网页，同时并行下载`script`元素加载的外部脚本。
- 浏览器完成解析 HTML 网页，此时再回过头执行已经下载完成的脚本。
#### defer 与相比普通 script，有三点区别：
有了defer属性，浏览器下载脚本文件的时候，不会阻塞页面渲染。

下载的脚本文件在`DOMContentLoaded`事件触发前执行（即刚刚读取完`</html>`标签）

而且可以保证执行顺序就是它们在页面上出现的顺序。
#### 注意
对于内置而不是加载外部脚本的script标签，以及动态生成的script标签，defer属性不起作用。

使用defer加载的外部脚本不应该使用document.write方法。

​在加载多个 JS 脚本的时候，async 是无顺序的加载，而 defer 是有顺序的加载。

### defer属性和async属性到底应该使用哪一个？

一般来说，如果脚本之间没有依赖关系，就使用async属性，如果脚本之间有依赖关系，就使用defer属性。如果同时使用async和defer属性，后者不起作用，浏览器行为由async属性决定。

### 问题四：为什么操作 DOM 慢

因为 DOM 是属于渲染引擎中的东西，而 JS 又是 JS 引擎中的东西。当我们通过 JS 操作 DOM 的时候，其实这个操作涉及到了两个线程之间的通信，那么势必会带来一些性能上的损耗。操作 DOM 次数一多，也就等同于一直在进行线程之间的通信，并且操作 DOM 可能还会带来重绘回流的情况，所以也就导致了性能上的问题。

### 问题五：渲染页面时常见哪些不良现象？

**由于浏览器的渲染机制不同，在渲染页面时会出现两种常见的不良现象----白屏问题和 FOUS（无样式内容闪烁）**

FOUC：由于浏览器渲染机制（比如 firefox），再 CSS 加载之前，先呈现了 HTML，就会导致展示出无样式内容，然后样式突然呈现的现象；

白屏：有些浏览器渲染机制（比如 chrome）要先构建 DOM 树和 CSSOM 树，构建完成后再进行渲染，如果 CSS 部分放在 HTML 尾部，由于 CSS 未加载完成，浏览器迟迟未渲染，从而导致白屏；也可能是把 js 文件放在头部，脚本会阻塞后面内容的呈现，脚本会阻塞其后组件的下载，出现白屏问题。

### 总结

![img](https://image.fundebug.com/2019-01-03-11.png)

- 浏览器工作流程：构建 DOM -> 构建 CSSOM -> 构建渲染树 -> 布局 -> 绘制。
- CSSOM 会阻塞渲染，只有当 CSSOM 构建完毕后才会进入下一个阶段构建渲染树。
- 通常情况下 DOM 和 CSSOM 是并行构建的，但是当浏览器遇到一个 script 标签时，DOM 构建将暂停，直至脚本完成执行。但由于 JavaScript 可以修改 CSSOM，所以需要等 CSSOM 构建完毕后再执行 JS。
- 如果你想首屏渲染的越快，就越不应该在首屏就加载 JS 文件，建议将 script 标签放在 body 标签底部。

### 参考文章

- [async 和 defer 的区别 | SegmentFault](https://segmentfault.com/q/1010000000640869)
- [浏览器的渲染原理简介](https://coolshell.cn/articles/9666.html)
- [前端面试之道](https://juejin.im/book/5bdc715fe51d454e755f75ef/section/5c024ecbf265da616a476638)
- [浏览器的渲染：过程与原理](https://juejin.im/entry/59e1d31f51882578c3411c77)
- [你真的了解回流和重绘吗](https://segmentfault.com/a/1190000017329980)
- [关键渲染路径](https://mp.weixin.qq.com/s?__biz=MzA5NzkwNDk3MQ==&mid=2650588806&idx=1&sn=408a54e7c8102fd6944c9a40b119015a&chksm=8891d6a2bfe65fb42f493fe9a4dab672dd7e440f31e753196cee0cfbc6696e4f8dd3a669e040&mpshare=1&scene=1&srcid=1228ZrXsmbZKcgCSu7zTVDwy#)
- [页面重绘和回流以及优化](https://www.css88.com/archives/4996)
- [浏览器重绘(repaint)重排(reflow)与优化浏览器机制](https://juejin.im/post/5c15f797f265da61141c7f86)
- [来源](https://my.oschina.net/u/3375885/blog/2996380)
