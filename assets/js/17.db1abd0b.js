(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{215:function(n,e,t){"use strict";t.r(e);var r=t(4),a=Object(r.a)({},function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[t("h2",{attrs:{id:"从-jsx-到-virtual-dom"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#从-jsx-到-virtual-dom","aria-hidden":"true"}},[n._v("#")]),n._v(" 从 jsx 到 virtual dom")]),n._v(" "),t("h3",{attrs:{id:"注意：react-的类型规范使用的是-flow，类似-ts，比-ts-检测稍微弱一点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#注意：react-的类型规范使用的是-flow，类似-ts，比-ts-检测稍微弱一点","aria-hidden":"true"}},[n._v("#")]),n._v(" 注意：react 的类型规范使用的是 flow，类似 ts，比 ts 检测稍微弱一点")]),n._v(" "),t("p",[n._v("###首先来看一个最简单的 react 的例子")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v('const ComponentA = (props) => {\n  return <p>这是一个节点</p>\n}\n\nexport default (props) => {\n\treturn (\n    \t<div>这是父节点div\n        \t<span id="span">这是子节点span</span>\n        \t<ComponentA />\n      \t</div>\n    )\n}\n')])])]),t("p",[n._v("经过 babel 转换之后就会变成")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v('var ComponentA = function ComponentA(props) {\n  return React.createElement("p", null, "这是一个节点");\n};\n\nvar _default = function _default(props) {\n  return React.createElement(\n  "div",\n  null,\n  "这是父节点div",\n  React.createElement("span", {id: "span"}, "这是子节点span"),\n  React.createElement(ComponentA, null));\n};\n\n')])])]),t("p",[n._v("我们知道构成一个元素的三要素是"),t("code",[n._v("标签")]),n._v(","),t("code",[n._v("标签属性")]),n._v(","),t("code",[n._v("内容")]),n._v("。通过上面的代码转变之后，我们可以看到每一个标签都用 createElement 这个做了一程包装。第一个传入的是标签类型。第二个传入的是标签属性，我们看到 span 标签上的额 id 就是在第二个参数中传入，假如没有标签属性就传了 null。第三个之后的都是该标签里面的的内容或者说是子标签，按顺序依次传入。")]),n._v(" "),t("p",[n._v("##createElement 这个函数到底做了啥")]),n._v(" "),t("p",[n._v("打开 react 源码文件夹里面的 react.js，我们看到")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("import {\n  createElement,\n  ...\n} from './ReactElement';\n")])])]),t("p",[n._v("找到 ReactElement.js 这个文件，打开它，并找到 createElement 函数")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("/**\n * @param type 标签名字\n *    1、字符串比如div、p这类原生DOM\n *    2、class类型的继承自Component或者PureComponent的组件\n *    3、function,纯函数的组件\n *    4、...未知\n * @param config 标签属性\n * @param children 标签里面的子标签们\n */\nexport function createElement(type, config, children) {\n\t// 初始化一些变量\n  let propName;\n  const props = {};\n\n  let key = null;\n  let ref = null;\n  let self = null;\n  let source = null;\n\n\t// 标签上存在属性 id，key，ref等等。。\n  if (config != null) {\n  \t// 是否含有合法的ref\n    if (hasValidRef(config)) {\n      ref = config.ref;\n    }\n    // 是否含有合法的key\n    if (hasValidKey(config)) {\n      key = '' + config.key;\n    }\n\n\t\t// self 和 source 仅在开发环境中用到，略过\n    self = config.__self === undefined ? null : config.__self;\n    source = config.__source === undefined ? null : config.__source;\n\n    // 遍历标签上的属性\n   \t// 把 __self, __source, key, ref 这四个react自有属性过滤掉\n    for (propName in config) {\n      if (\n        hasOwnProperty.call(config, propName) &&\n        !RESERVED_PROPS.hasOwnProperty(propName)\n      ) {\n      \t// 过滤掉后的属性放到props中\n        props[propName] = config[propName];\n      }\n    }\n  }\n\n  // 第三个之后就是按顺序传入的子标签\n  // 并把 children挂载到props上\n  const childrenLength = arguments.length - 2;\n  if (childrenLength === 1) {\n    props.children = children;\n  } else if (childrenLength > 1) {\n    const childArray = Array(childrenLength);\n    for (let i = 0; i < childrenLength; i++) {\n      childArray[i] = arguments[i + 2];\n    }\n    // 忽略开发环境\n    if (__DEV__) {\n      ...\n    }\n    props.children = childArray;\n  }\n\n  // 存在情况这是一个class组件，并且初始有defalutProps\n  // 把defaultProps里面的值也挂载到props上面\n  if (type && type.defaultProps) {\n    const defaultProps = type.defaultProps;\n    for (propName in defaultProps) {\n      if (props[propName] === undefined) {\n        props[propName] = defaultProps[propName];\n      }\n    }\n  }\n  if (__DEV__) {\n    ...\n  }\n\n  // 返回一个ReactElement函数\n  return ReactElement(\n    type,\n    key,\n    ref,\n    self,\n    source,\n    ReactCurrentOwner.current,\n    props,\n  );\n}\n")])])]),t("p",[n._v("咦，我们似乎在 ReactElement 函数中看到了一个意外传入的参数 ReactCurrentOwner.current")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("const ReactCurrentOwner = {\n  current: (null: null | Fiber),\n  currentDispatcher: (null: null | Dispatcher),\n};\n// current初始值是null，实际上是当前应用对应的Fiber对象。\n")])])]),t("p",[n._v("###我们来看一下 ReactElement 这个函数做了啥")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("const ReactElement = function(type, key, ref, self, source, owner, props) {\n  const element = {\n    // shared/ReactSymbols 这个文件中找到\n    // REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;\n    // 可以看出这个是常亮\n    // $$typeof 用于确定是否属于 ReactElement\n    // ReactDOM.createPortal的时候是REACT_PORTAL_TYPE，\n    // 不过他不是通过createElement创建的，所以他应该也不属于ReactElement\n    $$typeof: REACT_ELEMENT_TYPE,\n\n    type: type,\n    key: key,\n    ref: ref,\n    props: props,\n\n    _owner: owner,\n  };\n\n  if (__DEV__) {\n    ...\n  }\n\n  return element;\n};\n")])])]),t("p",[t("code",[n._v("ReactElement")]),n._v("只是一个用来承载信息的容器，他会告诉后续的操作这个节点的以下信息：")]),n._v(" "),t("ol",[t("li",[t("code",[n._v("type")]),n._v("类型，用于判断如何创建节点")]),n._v(" "),t("li",[t("code",[n._v("key")]),n._v("和"),t("code",[n._v("ref")]),n._v("这些特殊信息")]),n._v(" "),t("li",[t("code",[n._v("props")]),n._v("新的属性内容")]),n._v(" "),t("li",[t("code",[n._v("$$typeof")]),n._v("用于确定是否属于"),t("code",[n._v("ReactElement")])])]),n._v(" "),t("p",[n._v("这些信息对于后期构建应用的树结构是非常重要的，"),t("strong",[n._v("而 React 通过提供这种类型的数据，来脱离平台的限制")])]),n._v(" "),t("p",[t("img",{attrs:{src:"https://qnm.hunliji.com/o_1dj71uovn15ug1pv61495bjg120r9.png",alt:"img"}})])])},[],!1,null,null,null);e.default=a.exports}}]);