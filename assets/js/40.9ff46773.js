(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{236:function(v,_,e){"use strict";e.r(_);var N=e(4),o=Object(N.a)({},function(){var v=this,_=v.$createElement,e=v._self._c||_;return e("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[e("h1",{attrs:{id:"cdn-原理简析"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cdn-原理简析","aria-hidden":"true"}},[v._v("#")]),v._v(" CDN 原理简析")]),v._v(" "),e("p",[v._v("CDN（Content Delivery Network，内容分发网络）将源站的内容发布到接近用户的网络“边缘”，用户可以就近获取所需数据，不仅降低了网络的拥塞状况、提高请求的响应速度，也能够减少源站的负载压力。")]),v._v(" "),e("p",[v._v("很多同学都比较熟悉 CDN 的作用和功能，但是可能也会像我之前一样，对 CDN 的原理不是十分了解。所以本文旨在对 CDN 的工作原理和核心组件进行简要的描述。")]),v._v(" "),e("h3",{attrs:{id:"_1-访问源站的过程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-访问源站的过程","aria-hidden":"true"}},[v._v("#")]),v._v(" 1. 访问源站的过程")]),v._v(" "),e("p",[v._v("为了更加清楚地展示 CDN 的原理，我们首先回顾一下不使用缓存直接到源站请求数据的过程：")]),v._v(" "),e("p",[e("img",{attrs:{src:"https://qnm.hunliji.com/FphKEwjaTmqaV6AfsYSJwEdm0l8C",alt:"img"}})]),v._v(" "),e("p",[v._v('如上图所示，如果要访问的网站名为："join.qq.com"，客户端首先会在本机的 hosts 文件和 hosts 缓存中查找该域名对应的 IP 地址；如果本机中没有此信息，则会到我们的'),e("code",[v._v("本地DNS")]),v._v("进行询问该域名对应的 IP 地址；如果本地 DNS 中仍然没有该域名的 IP 信息时，则会由本地 DNS 依次向"),e("code",[v._v("根DNS")]),v._v("、"),e("code",[v._v("顶级域DNS")]),v._v("、"),e("code",[v._v("权威DNS")]),v._v("进行询问，最终"),e("code",[v._v("本地DNS")]),v._v("将 IP 地址发送给客户端。客户端通过 IP 地址向远程的源站服务器发出 HTTP 请求并获取相应的数据内容。")]),v._v(" "),e("p",[v._v("以上是通过 DNS 的"),e("code",[v._v("迭代解析")]),v._v("模式获取域名对应的 IP 地址并发送 HTTP 请求的过程。源站的提供商通过配置权威 DNS 将源站的域名与提供服务的服务器主机进行绑定，使客户端通过 DNS 服务可以顺利地获取源站域名对应的 IP 地址并通过 IP 地址与源站进行通信。")]),v._v(" "),e("h4",{attrs:{id:"dns-的记录类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#dns-的记录类型","aria-hidden":"true"}},[v._v("#")]),v._v(" DNS 的记录类型")]),v._v(" "),e("p",[v._v("为了方便后续的讨论，需要了解 DNS 是如何对查询请求进行应答的。")]),v._v(" "),e("p",[v._v("在 DNS 系统中，最常见的资源记录方式是 Internet 类记录，该记录由包含 4 个字段的数据构成：Name、Value、Type、TTL。其中 Name 和 Value 可以理解为一对键值对，但是其具体含义取决于 Type 的类型，TTL 记录了该条记录应当从缓存中删除的时间。在资源记录的类型中中，最为常见且重要的类型 Type 主要有：")]),v._v(" "),e("ol",[e("li",[e("p",[v._v("A 记录（Address）")]),v._v(" "),e("p",[v._v("A 记录用于描述目标域名到 IP 地址的映射关系，将目标域名与 A 记录的 Name 字段进行匹配，将成功匹配的记录的 Value 字段的内容（IP 地址）输出到 DNS 回应报文中。")])]),v._v(" "),e("li",[e("p",[v._v("NS 记录（Name Server）")]),v._v(" "),e("p",[v._v("NS 记录用于描述目标域名到负责解析该域名的 DNS 的映射关系，根据目标域名对 NS 记录的 Name 字段进行匹配，将成功匹配的记录的 Value 字段（负责解析目标域名的 DNS 的 IP 地址）输出到 DNS 回应报文中。")])]),v._v(" "),e("li",[e("p",[v._v("CNAME 记录")]),v._v(" "),e("p",[v._v("CNAME 记录用于描述目的域名和别名的对应关系，如果说 A 记录可以将目标域名转换为对应主机的 IP 地址，那么 CNAME 记录则可以将一个域名（别名）转换为另一个域名，如果多条 CNAME 记录指向同一个域名，则可以将多个不同的域名的请求指向同一台服务器主机。并且，CNAME 记录通常还对应了一条 A 记录，用于提供被转换的域名的 IP 地址。")])])]),v._v(" "),e("h3",{attrs:{id:"_2-通过-cdn-获取缓存内容的过程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-通过-cdn-获取缓存内容的过程","aria-hidden":"true"}},[v._v("#")]),v._v(" 2. 通过 CDN 获取缓存内容的过程")]),v._v(" "),e("p",[v._v("在上一章节中主要介绍了通过 DNS 服务直接访问源站的请求响应过程。与其不同的是，CDN 将我们对源站的请求导向了距离用户较近的缓存节点，而非源站。")]),v._v(" "),e("p",[v._v("如图所示是通过 CDN 进行请求响应的过程图。通过图中可以看出，在 DNS 解析域名时新增了一个"),e("code",[v._v("全局负载均衡系统（GSLB）")]),v._v("，GSLB 的主要功能是根据用户的本地 DNS 的 IP 地址判断用户的位置，筛选出距离用户较近的"),e("code",[v._v("本地负载均衡系统（SLB）")]),v._v("，并将该 SLB 的 IP 地址作为结果返回给本地 DNS。SLB 主要负责判断"),e("code",[v._v("缓存服务器集群")]),v._v("中是否包含用户请求的资源数据，如果缓存服务器中存在请求的资源，则根据缓存服务器集群中节点的健康程度、负载量、连接数等因素筛选出最优的缓存节点，并将 HTTP 请求重定向到最优的缓存节点上。")]),v._v(" "),e("p",[e("img",{attrs:{src:"https://qnm.hunliji.com/Ft7poEKZeKFrjcT-8YEqTsMYcrWo",alt:"img"}})]),v._v(" "),e("p",[v._v('为了更清晰地说明 CDN 的工作原理，下面以客户端发起对"join.qq.com/video.php"的 HTTP 请求为例进行说明：')]),v._v(" "),e("ol",[e("li",[v._v('用户发起对"join.qq.com/video.php"的 HTTP 请求，首先需要通过本地 DNS 通过"迭代解析"的方式获取域名"join.qq.com"的 IP 地址；')]),v._v(" "),e("li",[v._v("如果本地 DNS 的缓存中没有该域名的记录，则向"),e("code",[v._v("根DNS")]),v._v("发送 DNS 查询报文；")]),v._v(" "),e("li",[e("code",[v._v("根DNS")]),v._v('发现域名的前缀为"com"，则给出负责解析'),e("code",[v._v("com")]),v._v("的"),e("code",[v._v("顶级DNS")]),v._v("的 IP 地址；")]),v._v(" "),e("li",[v._v("本地 DNS 向"),e("code",[v._v("顶级DNS")]),v._v("发送 DNS 查询报文；")]),v._v(" "),e("li",[e("code",[v._v("顶级DNS")]),v._v('发现域名的前缀为"qq.com"，在本地记录中查找负责该前缀的'),e("code",[v._v("权威DNS")]),v._v("的 IP 地址并进行回复；")]),v._v(" "),e("li",[v._v("本地 DNS 向"),e("code",[v._v("权威DNS")]),v._v("发送 DNS 查询报文；")]),v._v(" "),e("li",[v._v('权威 DNS 查找到一条 NAME 字段为"join.qq.com"的'),e("code",[v._v("CNAME记录")]),v._v('（由服务提供者配置），该记录的 Value 字段为"join.qq.cdn.com"；并且还找到另一条 NAME 字段为"join.qq.cdn.com"的 A 记录，该记录的 Value 字段为 GSLB 的 IP 地址；')]),v._v(" "),e("li",[v._v("本地 DNS 向 GSLB 发送 DNS 查询报文；")]),v._v(" "),e("li",[v._v("GSLB 根据"),e("code",[v._v("本地DNS")]),v._v("的 IP 地址判断用户的大致位置为深圳，筛选出位于华南地区且综合考量最优的 SLB 的 IP 地址填入 DNS 回应报文，作为 DNS 查询的最终结果；")]),v._v(" "),e("li",[v._v("本地 DNS 回复客户端的 DNS 请求，将上一步的 IP 地址作为最终结果回复给客户端；")]),v._v(" "),e("li",[v._v('客户端根据 IP 地址向 SLB 发送 HTTP 请求："'),e("a",{attrs:{href:"https://join.qq.com/video.php",target:"_blank",rel:"noopener noreferrer"}},[v._v("join.qq.com/video.php"),e("OutboundLink")],1),v._v('"；')]),v._v(" "),e("li",[v._v("SLB 综合考虑缓存服务器集群中各个节点的资源限制条件、健康度、负载情况等因素，筛选出最优的缓存节点后回应客户端的 HTTP 请求（状态码为 302，重定向地址为最优缓存节点的 IP 地址）；")]),v._v(" "),e("li",[v._v("客户端接收到 SLB 的 HTTP 回复后，重定向到该缓存节点上；")]),v._v(" "),e("li",[v._v("缓存节点判断请求的资源是否存在、过期，将缓存的资源直接回复给客户端，否则到源站进行数据更新再回复。")])]),v._v(" "),e("p",[v._v('其中较为关键的步骤为 6~9，与普通的 DNS 过程不同的是，这里需要服务提供者（源站）配置它在其权威 DNS 中的记录，将直接指向源站的 A 记录修改为一条 CNAME 记录及其对应的 A 记录，CNAME 记录将目标域名转换为 GSLB 的别名，A 记录又将该别名转换为 GSLB 的 IP 地址。通过这一系列的操作，将解析源站的目标域名的权力交给了 GSLB，以致于 GSLB 可以根据地理位置等信息将用户的请求引导至距离其最近的"缓存节点"，减缓了源站的负载压力和网络拥塞。')]),v._v(" "),e("p",[v._v("以上主要介绍了目前 CDN 中最为常见的工作方式，这种工作方式利用 CNAME 将域名和目标 IP 之间进行解耦，将目标 IP 的解析权下放到 GSLB 中，方便实现更多自定义的功能，是一种更加灵活的方式。")])])},[],!1,null,null,null);_.default=o.exports}}]);