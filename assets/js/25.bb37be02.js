(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{225:function(t,s,a){"use strict";a.r(s);var n=a(4),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"bitmap-算法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bitmap-算法","aria-hidden":"true"}},[t._v("#")]),t._v(" BitMap 算法")]),t._v(" "),a("p",[t._v("用一个问题来引出这次的文章")]),t._v(" "),a("blockquote",[a("p",[t._v("10亿个无序整数，已知最大值为15亿，请对这10亿个数进行排序(假设无重复)。现要在32位机器上对其排列，并且内存限制为2G。")])]),t._v(" "),a("p",[t._v("分析一下问题，10G的文件，只有2G的内存，显然不能一次性的把数据直接读进内存中直接排序。")]),t._v(" "),a("p",[t._v("那么，还有什么其他办法呢？这里就可以使用"),a("code",[t._v("BitMap")])]),t._v(" "),a("h2",{attrs:{id:"什么是bitmap"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么是bitmap","aria-hidden":"true"}},[t._v("#")]),t._v(" 什么是BitMap")]),t._v(" "),a("p",[t._v("所谓的BitMap就是用一个bit位来标记某个元素对应的Value，而Key即是该元素。由于采用了Bit为单位来存储数据，因此在存储空间方面，可以大大节省。")]),t._v(" "),a("p",[t._v("来看一个简单具体的例子，假设我们要对0-7内的5个元素(4,7,2,5,3)排序（这里假设这些元素没有重复）。那么我们就可以采用BitMap的方法来达到排序的目的。要表示8个数，我们就只需要8个Bit（1Bytes），首先我们开辟1Byte的空间，将这些空间的所有Bit位都置为0")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1 Bytes 来表示 8 为 Bit")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("\n")])])]),a("p",[t._v("然后遍历这5个元素，首先第一个元素是4，那么就把4对应的位置为1，因为是从零开始的，所以要把第五位置为1：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1 Bytes 来表示 8 为 Bit")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("\n")])])]),a("p",[t._v("然后处理第二个元素7，将第八位置为1,接着处理第三个元素，一直到最后处理完所有的元素，将相应的位置为1，对应状态如下")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1 Bytes 来表示 8 为 Bit")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("\n")])])]),a("p",[t._v("然后我们现在遍历一遍Bit区域，将该位是一的位的编号输出（2，3，4，5，7），这样就达到了排序的目的。")]),t._v(" "),a("p",[t._v("用简单的js代码实现以下")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" arr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("7")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("FindClass")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" bytes "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//用来存储数据")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" bytes"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// //先初始化为0")]),t._v("\n    bytes"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("addMember")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("number")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//添加")]),t._v("\n    bytes"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("number"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("isExist")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("number")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//判断是否存在")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("bytes"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("number"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("getBytes")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" bytes"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" findClass "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("FindClass")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" arr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 把对应位置标记为1")]),t._v("\n  findClass"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addMember")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" bytes "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" findClass"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getBytes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" result "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" bytes"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("bytes"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("push")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// [2,3,4,5,7]")]),t._v("\n")])])]),a("p",[t._v("那么如果扩充到一亿个整数排序呢，一个整数算作4个字节，4亿个字节大概需要占用380M的内存空间")]),t._v(" "),a("p",[t._v("想象一下有8个路灯,编号从1-8,其中2,5,7,8是亮的,其余不亮.")]),t._v(" "),a("p",[t._v("如果二进制来表示，且用1代表亮，0代表不亮，那么这个二进制表现为"),a("code",[t._v("01001011")])]),t._v(" "),a("p",[t._v("1个整数有4个Bytes, 也就是32Bit,就可以代表32盏灯")]),t._v(" "),a("p",[t._v("改造一下上面的isExit方法")]),t._v(" "),a("p",[t._v("设一个"),a("code",[t._v("value")]),t._v("，其初始化为0")]),t._v(" "),a("p",[t._v("当 add() 传进来参数是"),a("code",[t._v("0")]),t._v("的时候, 就把"),a("code",[t._v("value")]),t._v("的第1位设置为"),a("code",[t._v("1")]),t._v(", 如下所示")]),t._v(" "),a("blockquote",[a("p",[t._v("00000000 00000000 00000000 00000001\n此时"),a("code",[t._v("value")]),t._v("的值为 1")])]),t._v(" "),a("p",[t._v("再加 3, 把"),a("code",[t._v("value")]),t._v("的第4位设置为"),a("code",[t._v("1")])]),t._v(" "),a("blockquote",[a("p",[t._v("00000000 00000000 00000000 00001001\n此时 "),a("code",[t._v("value")]),t._v("的值为 9 ,9就表示0和3都存在")])]),t._v(" "),a("p",[t._v("可以得出结论, 32bit 可以判断"),a("code",[t._v("0-31")]),t._v("是否存在")]),t._v(" "),a("p",[t._v("如果创建一个大小为10的数组,数组里存储整数,那么这个数组就可以表示代表"),a("code",[t._v("0-319")]),t._v("是否存在")]),t._v(" "),a("ul",[a("li",[t._v("bytes[0] 表示0-31是否存在")]),t._v(" "),a("li",[t._v("bytes[1] 表示32-63是否存在")]),t._v(" "),a("li",[t._v("....")]),t._v(" "),a("li",[t._v("bytes[9] 表示288-319是否存在")])]),t._v(" "),a("p",[a("strong",[t._v("通过这种方式,可以把空间的使用降低为原来的"),a("code",[t._v("1/32")])])]),t._v(" "),a("p",[t._v("存储一个亿数据的存在状态,就只需要10M+的空间")]),t._v(" "),a("h2",{attrs:{id:"位运算"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#位运算","aria-hidden":"true"}},[t._v("#")]),t._v(" 位运算")]),t._v(" "),a("p",[t._v("这种方式涉及到了位运算,简单了解下:")]),t._v(" "),a("h3",{attrs:{id:"按位与"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#按位与","aria-hidden":"true"}},[t._v("#")]),t._v(" 按位与 &")]),t._v(" "),a("p",[t._v("规则: 两个整数进行&与运算,相同二进制的数字如果都是1, 则结果为1,有一个为0,则为0")]),t._v(" "),a("ul",[a("li",[t._v("1 & 1 = 1")]),t._v(" "),a("li",[t._v("1 & 0 = 0\n-0 & 0 = 0")])]),t._v(" "),a("h3",{attrs:{id:"按位或"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#按位或","aria-hidden":"true"}},[t._v("#")]),t._v(" 按位或 |")]),t._v(" "),a("p",[t._v("规则: 两个整数进行|或运算,相同二进制的数字如果有一个为1, 则结果为1,都是0,则为0")]),t._v(" "),a("ul",[a("li",[t._v("1 | 1 = 1")]),t._v(" "),a("li",[t._v("1 | 0 = 1")]),t._v(" "),a("li",[t._v("0 | 0 = 0")])]),t._v(" "),a("h3",{attrs:{id:"左移"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#左移","aria-hidden":"true"}},[t._v("#")]),t._v(" 左移 <<")]),t._v(" "),a("p",[t._v("规则: 二进制向左移动n位, 在后面添加n个0")]),t._v(" "),a("ul",[a("li",[t._v("3<<1 = 0011 -> 0110, 得到了 6")]),t._v(" "),a("li",[t._v("3<<2 = 0011 -> 1100, 得到了 12")])]),t._v(" "),a("h2",{attrs:{id:"实现"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#实现","aria-hidden":"true"}},[t._v("#")]),t._v(" 实现")]),t._v(" "),a("p",[t._v("按照上面的思路,重新设计一个查找类, 实现"),a("code",[t._v("addMember")]),t._v("和"),a("code",[t._v("isExist")]),t._v("方法，用更快的速度，更少的内存")]),t._v(" "),a("h3",{attrs:{id:"addmember"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#addmember","aria-hidden":"true"}},[t._v("#")]),t._v(" addMember")]),t._v(" "),a("p",[a("code",[t._v("0-100")]),t._v("只需要4个整数, 4 * 32 > 100 来表示是否存在,创建一个大小为4的数组")]),t._v(" "),a("p",[t._v("思路:")]),t._v(" "),a("ul",[a("li",[t._v("先用"),a("code",[t._v("member/32")]),t._v(",确定"),a("code",[t._v("member")]),t._v("在数组里的索引"),a("code",[t._v("arr_index")]),t._v(",比如"),a("code",[t._v("33")]),t._v("就存在"),a("code",[t._v("arr[1]")]),t._v("中")]),t._v(" "),a("li",[t._v("然后用"),a("code",[t._v("member%32")]),t._v("，确定在整数的哪个二进制位进行操作"),a("code",[t._v("bit_index")]),t._v(", 比如"),a("code",[t._v("33")]),t._v("就存在 "),a("code",[t._v("arr[1]")]),t._v(" 的下标为"),a("code",[t._v("1")]),t._v("的bit上")]),t._v(" "),a("li",[t._v("最后执行"),a("code",[t._v("bit_arr[arr_index] = bit_arr[arr_index] | 1<<bit_index")]),t._v("用来对应的bit进行赋值")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("addMember")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("member")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 决定在数组中的索引")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" arr_index "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Math"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("floor")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("member "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 决定在整数的32个bit位的哪一位上")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" bit_index "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" member "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("32")]),t._v(" \n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 对应的bit进行赋值")]),t._v("\n  bit_arr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("arr_index"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" bit_arr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("arr_index"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<<")]),t._v(" bit_index\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//                 00000000 00000000 00000000 00000000 | 1 << 1")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1 << 1 相当于    00000001 << 1 -> 00000010")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 所以上面计算得到   00000000 00000000 00000000 00000010")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"isexist"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#isexist","aria-hidden":"true"}},[t._v("#")]),t._v(" isExist")]),t._v(" "),a("p",[t._v("思路")]),t._v(" "),a("ul",[a("li",[t._v("先用"),a("code",[t._v("member/32")]),t._v(",确定"),a("code",[t._v("member")]),t._v("在数组里的索引"),a("code",[t._v("arr_index")])]),t._v(" "),a("li",[t._v("然后用"),a("code",[t._v("member%32")]),t._v(",确定在整数的哪个二进制位进行操作"),a("code",[t._v("bit_index")])]),t._v(" "),a("li",[t._v("最后执行"),a("code",[t._v("bit_arr[arr_index] & 1<<bit_index")]),t._v(",如果结果为"),a("code",[t._v("1")]),t._v(",就说明"),a("code",[t._v("member")]),t._v("存在")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("isExist")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("member")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 决定在数组中的索引")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" arr_index "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Math"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("floor")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("member"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 决定在整数的32个bit位的哪一位上")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" bit_index "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" member "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("32")]),t._v(" \n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" value "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" bit_arr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("arr_index"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<<")]),t._v(" bit_index\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" value "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("这种数据结构基于位做映射，能够用很少的内存存储数据，和数组不同，它只能存储表示某个数是否存在，可以用于大数据去重，大数据排序，两个集合取交集。")]),t._v(" "),a("p",[t._v("BitMap在处理大数据时才有优势，而且要求数据集紧凑，如果要处理的数只有3个：1，1000，100000，那么空间利用率太低了，最大的值决定了BitMap要用多少内存。")]),t._v(" "),a("h2",{attrs:{id:"大数据排序"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#大数据排序","aria-hidden":"true"}},[t._v("#")]),t._v(" 大数据排序")]),t._v(" "),a("p",[t._v("拿出一开始提到的问题")]),t._v(" "),a("p",[t._v("BitMap存储最大值为15亿的集合，只需要180M 的空间，空间使用完全可以接受，")]),t._v(" "),a("p",[t._v("至于速度，存储和比较过程中的位运算速度都非常快，第一次遍历，将10亿个数都放入到BitMap中，")]),t._v(" "),a("p",[t._v("第二次，从0到15亿进行遍历，如果在BitMap，则输出该数值，这样经过两次遍历，就可以将如此多的数据排序。")]),t._v(" "),a("h3",{attrs:{id:"再来一个问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#再来一个问题","aria-hidden":"true"}},[t._v("#")]),t._v(" 再来一个问题")]),t._v(" "),a("p",[t._v("在2.5亿个整数中找出不重复的整数，注，内存不足以容纳这2.5亿个整数")]),t._v(" "),a("p",[t._v("采用2-Bitmap（每个数分配2bit，00表示不存在，01表示出现一次，10表示多次，11无意义）")]),t._v(" "),a("p",[t._v("共需内存"),a("code",[t._v("2^32 * 2 bit")]),t._v("="),a("code",[t._v("1GB")]),t._v("内存")]),t._v(" "),a("p",[t._v("然后扫描这2.5亿个整数，查看Bitmap中相对应位,如果是00变01，01变10，10保持不变。")]),t._v(" "),a("p",[t._v("所描完事后，查看bitmap，把对应位是01的整数输出即可。")]),t._v(" "),a("h2",{attrs:{id:"扩展阅读-布隆过滤器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#扩展阅读-布隆过滤器","aria-hidden":"true"}},[t._v("#")]),t._v(" 扩展阅读(布隆过滤器)")]),t._v(" "),a("p",[t._v("前面所讲的BitMap的确很厉害，可以，却有着很强的局限性，BitMap只能用来处理整数，无法处理字符串，假设让你写一个强大的爬虫，每天爬取数以亿计的网页，那么你就需要一种数据结构，能够存储你已经爬取过的 url ，这样，才不至于重复爬取。")]),t._v(" "),a("p",[t._v("你可能会想到使用hash函数对url进行处理，转成整数，这样，似乎又可以使用BitMap了，但这样还是会有问题。假设BitMap能够映射的最大值是 M ，一个url的hash值需要对M求模，这样，就会产生冲突，而且随着存储数据的增多，冲突率会越来越大。")]),t._v(" "),a("p",[t._v("布隆过滤器的思想非常简单，其基本思路和BitMap是一样的，可以把布隆过滤器看做是 BitMap的扩展。为了解决冲突率，布隆过滤器要求使用k个 hash函数，新增一个 key时，把 key散列成 k 个整数，然后在数组中将这 k 个整数所对应的二进制位设置为1，判断某个key是否存在时，还是使用 k 个hash函数对key进行散列，得到k个整数，如果这k个整数所对应的二进制位都是1，就说明这个key存在，否则，这个key不存在。")]),t._v(" "),a("p",[t._v("推荐链接")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://yq.aliyun.com/articles/3607",target:"_blank",rel:"noopener noreferrer"}},[t._v("大数据量处理利器：布隆过滤器"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://blog.csdn.net/liebert/article/details/79737042",target:"_blank",rel:"noopener noreferrer"}},[t._v("javascript实现布隆过滤器"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"参考"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考","aria-hidden":"true"}},[t._v("#")]),t._v(" 参考")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.e-learn.cn/topic/1619491",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.e-learn.cn/topic/1619491"),a("OutboundLink")],1),t._v(" "),a("a",{attrs:{href:"https://blog.xhu.me/post/JS%20%E5%AE%9E%E7%8E%B0%20BitMap%20%E6%9F%A5%E8%AF%A2%E7%AE%97%E6%B3%95",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://blog.xhu.me/post/JS%20%E5%AE%9E%E7%8E%B0%20BitMap%20%E6%9F%A5%E8%AF%A2%E7%AE%97%E6%B3%95"),a("OutboundLink")],1)])])},[],!1,null,null,null);s.default=e.exports}}]);