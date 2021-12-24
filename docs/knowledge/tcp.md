# TCP 面试题

TCP 的面试题通常情况下前端不会涉及太多，此章主要面对 node.js 工程师。

## TCP 的特性

- TCP 提供一种面向连接的、可靠的字节流服务
- 在一个 TCP 连接中，仅有两方进行彼此通信。广播和多播不能用于 TCP
- TCP 使用校验和，确认和重传机制来保证可靠传输
- TCP 给数据分节进行排序，并使用累积确认保证数据的顺序不变和非重复
- TCP 使用滑动窗口机制来实现流量控制，通过动态改变窗口的大小进行拥塞控制

## 请简述 TCP\UDP 的区别

| 协议 | 连接性                            | 双工性      | 可靠性                     | 有序性                  | 有界性                  | 拥塞控制 | 传输速度 | 量级 | 头部大小   |
| ---- | --------------------------------- | ----------- | -------------------------- | ----------------------- | ----------------------- | -------- | -------- | ---- | ---------- |
| TCP  | 面向连接<br>(Connection oriented) | 全双工(1:1) | 可靠<br>(重传机制)         | 有序<br>(通过 SYN 排序) | 无, 有[粘包情况](#粘包) | 有       | 慢       | 低   | 20~60 字节 |
| UDP  | 无连接<br>(Connection less)       | n:m         | 不可靠<br>(丢包后数据丢失) | 无序                    | 有消息边界, **无粘包**  | 无       | 快       | 高   | 8 字节     |

UDP socket 支持 n 对 m 的连接状态, 在[官方文档](https://nodejs.org/dist/latest-v6.x/docs/api/dgram.html)中有写到在 `dgram.createSocket(options[, callback])` 中的 option 可以指定 `reuseAddr` 即 `SO_REUSEADDR`标志. 通过 `SO_REUSEADDR` 可以简单的实现 n 对 m 的多播特性 (不过仅在支持多播的系统上才有).

## TCP 粘包是怎么回事，如何处理?

默认情况下, TCP 连接会启用延迟传送算法 (Nagle 算法), 在数据发送之前缓存他们. 如果短时间有多个数据发送, 会缓冲到一起作一次发送 (缓冲大小见  `socket.bufferSize`), 这样可以减少 IO 消耗提高性能.

如果是传输文件的话, 那么根本不用处理粘包的问题, 来一个包拼一个包就好了. 但是如果是多条消息, 或者是别的用途的数据那么就需要处理粘包.

可以参见网上流传比较广的一个例子, 连续调用两次 send 分别发送两段数据 data1 和 data2, 在接收端有以下几种常见的情况:

- A. 先接收到 data1, 然后接收到 data2 .
- B. 先接收到 data1 的部分数据, 然后接收到 data1 余下的部分以及 data2 的全部.
- C. 先接收到了 data1 的全部数据和 data2 的部分数据, 然后接收到了 data2 的余下的数据.
- D. 一次性接收到了 data1 和 data2 的全部数据.

其中的 BCD 就是我们常见的粘包的情况. 而对于处理粘包的问题, 常见的解决方案有:

1. 多次发送之前间隔一个等待时间
1. 关闭 Nagle 算法
1. 进行封包/拆包

_**方案 1**_<br />只需要等上一段时间再进行下一次 send 就好, 适用于交互频率特别低的场景. 缺点也很明显, 对于比较频繁的场景而言传输效率实在太低. 不过几乎不用做什么处理.<br />_**方案 2**_<br />关闭 Nagle 算法, 在 Node.js 中你可以通过  [`socket.setNoDelay()`](https://nodejs.org/dist/latest-v6.x/docs/api/net.html#net_socket_setnodelay_nodelay)  方法来关闭 Nagle 算法, 让每一次 send 都不缓冲直接发送.<br />该方法比较适用于每次发送的数据都比较大 (但不是文件那么大), 并且频率不是特别高的场景. 如果是每次发送的数据量比较小, 并且频率特别高的, 关闭 Nagle 纯属自废武功.<br />另外, 该方法不适用于网络较差的情况, 因为 Nagle 算法是在服务端进行的包合并情况, 但是如果短时间内客户端的网络情况不好, 或者应用层由于某些原因不能及时将 TCP 的数据 recv, 就会造成多个包在客户端缓冲从而粘包的情况. (如果是在稳定的机房内部通信那么这个概率是比较小可以选择忽略的)<br />_**方案 3**_<br />封包/拆包是目前业内常见的解决方案了. 即给每个数据包在发送之前, 于其前/后放一些有特征的数据, 然后收到数据的时候根据特征数据分割出来各个数据包.

## 为什么 udp 不会粘包？

1.TCP 协议是面向流的协议，UDP 是面向消息的协议

UDP 段都是一条消息，应用程序必须以消息为单位提取数据，不能一次提取任意字节的数据

2.UDP 具有保护消息边界，在每个 UDP 包中就有了消息头（消息来源地址，端口等信息），这样对于接收端来说就容易进行区分处理了。传输协议把数据当作一条独立的消息在网上传输，接收端只能接收独立的消息。接收端一次只能接收发送端发出的一个数据包,如果一次接受数据的大小小于发送端一次发送的数据大小，就会丢失一部分数据，即使丢失，接受端也不会分两次去接收

## 说一说 OSI 七层模型

![2019-06-24-12-51-02](https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/f99d6190174db81cd9246f7f832b6587.png)

## 讲一下三次握手？

![](https://qnm.hunliji.com/Fg4OpIHMfFedDlBdODMHqFAOjEDk)
第一次握手：建立连接时，客户端发送 syn 包（syn=x）到服务器，并进入 SYN_SENT 状态，等待服务器确认；SYN：同步序列编号（Synchronize Sequence Numbers）。

第二次握手：服务器收到 syn 包，必须确认客户的 SYN（ack=x+1），同时自己也发送一个 SYN 包（syn=y），即 SYN+ACK 包，此时服务器进入 SYN_RECV 状态；

第三次握手：客户端收到服务器的 SYN+ACK 包，向服务器发送确认包 ACK(ack=y+1），此包发送完毕，客户端和服务器进入 ESTABLISHED（TCP 连接成功）状态，完成三次握手。
| 字段 | 含义 |
|-----|-----|
| URG | 紧急指针是否有效。为 1，表示某一位需要被优先处理 |
| ACK | 确认号是否有效，一般置为 1。 |
| PSH | 提示接收端应用程序立即从 TCP 缓冲区把数据读走。 |
| RST | 对方要求重新建立连接，复位。 |
| SYN | 请求建立连接，并在其序列号的字段进行序列号的初始值设定。建立连接，设置为 1 |
| FIN | 希望断开连接。 |

## 讲一下四次握手？

![](https://qnm.hunliji.com/Ft-HieS32rtO1f2TnL5vsMXjk2MI)

TCP 的连接的拆除需要发送四个包，因此称为四次挥手(Four-way handshake)，也叫做改进的三次握手。客户端或服务器均可主动发起挥手动作，在 socket 编程中，任何一方执行  `close()`  操作即可产生挥手操作。

- 第一次挥手(FIN=1，seq=x)<br />假设客户端想要关闭连接，客户端发送一个 FIN 标志位置为 1 的包，表示自己已经没有数据可以发送了，但是仍然可以接受数据。<br />发送完毕后，客户端进入  `FIN_WAIT_1`  状态。<br />
- 第二次挥手(ACK=1，ACKnum=x+1)<br />服务器端确认客户端的 FIN 包，发送一个确认包，表明自己接受到了客户端关闭连接的请求，但还没有准备好关闭连接。<br />发送完毕后，服务器端进入  `CLOSE_WAIT`  状态，客户端接收到这个确认包之后，进入  `FIN_WAIT_2`  状态，等待服务器端关闭连接。<br />
- 第三次挥手(FIN=1，seq=y)<br />服务器端准备好关闭连接时，向客户端发送结束连接请求，FIN 置为 1。<br />发送完毕后，服务器端进入  `LAST_ACK`  状态，等待来自客户端的最后一个 ACK。<br />
- 第四次挥手(ACK=1，ACKnum=y+1)<br />客户端接收到来自服务器端的关闭请求，发送一个确认包，并进入  `TIME_WAIT`状态，等待可能出现的要求重传的 ACK 包。<br />服务器端接收到这个确认包之后，关闭连接，进入  `CLOSED`  状态。<br />客户端等待了某个固定时间（两个最大段生命周期，2MSL，2 Maximum Segment Lifetime）之后，没有收到服务器端的 ACK ，认为服务器端已经正常关闭连接，于是自己也关闭连接，进入  `CLOSED`  状态。<br />

## 为什么连接的时候是三次握手，关闭的时候却是四次握手？

因为当 Server 端收到 Client 端的 SYN 连接请求报文后，可以直接发送 SYN+ACK 报文。其中 ACK 报文是用来应答的，SYN 报文是用来同步的。但是关闭连接时，当 Server 端收到 FIN 报文时，很可能并不会立即关闭 SOCKET，所以只能先回复一个 ACK 报文，告诉 Client 端，"你发的 FIN 报文我收到了"。只有等到我 Server 端所有的报文都发送完了，我才能发送 FIN 报文，因此不能一起发送。故需要四步握手。

## 为什么 TIME_WAIT 状态需要经过 2MSL(最大报文段生存时间)才能返回到 CLOSE 状态？

虽然按道理，四个报文都发送完毕，我们可以直接进入 CLOSE 状态了，但是我们必须假象网络是不可靠的，有可以最后一个 ACK 丢失。所以 TIME_WAIT 状态就是用来重发可能丢失的 ACK 报文。在 Client 发送出最后的 ACK 回复，但该 ACK 可能丢失。Server 如果没有收到 ACK，将不断重复发送 FIN 片段。所以 Client 不能立即关闭，它必须确认 Server 接收到了该 ACK。Client 会在发送出 ACK 之后进入到 TIME_WAIT 状态。Client 会设置一个计时器，等待 2MSL 的时间。如果在该时间内再次收到 FIN，那么 Client 会重发 ACK 并再次等待 2MSL。所谓的 2MSL 是两倍的 MSL(Maximum Segment Lifetime)。MSL 指一个片段在网络中最大的存活时间，2MSL 就是一个发送和一个回复所需的最大时间。如果直到 2MSL，Client 都没有再次收到 FIN，那么 Client 推断 ACK 已经被成功接收，则结束 TCP 连接。

## 为什么不能用两次握手进行连接？

3 次握手完成两个重要的功能，既要双方做好发送数据的准备工作(双方都知道彼此已准备好)，也要允许双方就初始序列号进行协商，这个序列号在握手过程中被发送和确认。

现在把三次握手改成仅需要两次握手，死锁是可能发生的。作为例子，考虑计算机 S 和 C 之间的通信，假定 C 给 S 发送一个连接请求分组，S 收到了这个分组，并发 送了确认应答分组。按照两次握手的协定，S 认为连接已经成功地建立了，可以开始发送数据分组。可是，C 在 S 的应答分组在传输中被丢失的情况下，将不知道 S 是否已准备好，不知道 S 建立什么样的序列号，C 甚至怀疑 S 是否收到自己的连接请求分组。在这种情况下，C 认为连接还未建立成功，将忽略 S 发来的任何数据分 组，只等待连接确认应答分组。而 S 在发出的分组超时后，重复发送同样的分组。这样就形成了死锁。

## 如果已经建立了连接，但是客户端突然出现故障了怎么办？

TCP 还设有一个保活计时器，显然，客户端如果出现故障，服务器不能一直等下去，白白浪费资源。服务器每收到一次客户端的请求后都会重新复位这个计时器，时间通常是设置为 2 小时，若两小时还没有收到客户端的任何数据，服务器就会发送一个探测报文段，以后每隔 75 秒钟发送一次。若一连发送 10 个探测报文仍然没反应，服务器就认为客户端出了故障，接着就关闭连接。

## TCP 中的 RST 标志(Reset)详解

RST 表示复位，用来异常的关闭连接，在 TCP 的设计中它是不可或缺的。就像上面说的一样，发送 RST 包关闭连接时，不必等缓冲区的包都发出去（不像上面的 FIN 包），直接就丢弃缓存区的包发送 RST 包。而接收端收到 RST 包后，也不必发送 ACK 包来确认。

TCP 处理程序会在自己认为的异常时刻发送 RST 包。例如，A 向 B 发起连接，但 B 之上并未监听相应的端口，这时 B 操作系统上的 TCP 处理程序会发 RST 包。

又比如，AB 正常建立连接了，正在通讯时，A 向 B 发送了 FIN 包要求关连接，B 发送 ACK 后，网断了，A 通过若干原因放弃了这个连接（例如进程重启）。网通了后，B 又开始发数据包，A 收到后表示压力很大，不知道这野连接哪来的，就发了个 RST 包强制把连接关了，B 收到后会出现 connect reset by peer 错误。

## ###RST 攻击

A 和服务器 B 之间建立了 TCP 连接，此时 C 伪造了一个 TCP 包发给 B，使 B 异常的断开了与 A 之间的 TCP 连接，就是 RST 攻击了。实际上从上面 RST 标志位的功能已经可以看出这种攻击如何达到效果了。

那么伪造什么样的 TCP 包可以达成目的呢？我们至顶向下的看。

假定 C 伪装成 A 发过去的包，这个包如果是 RST 包的话，毫无疑问，B 将会丢弃与 A 的缓冲区上所有数据，强制关掉连接。

如果发过去的包是 SYN 包，那么，B 会表示 A 已经发疯了（与 OS 的实现有关），正常连接时又来建新连接，B 主动向 A 发个 RST 包，并在自己这端强制关掉连接。

这两种方式都能够达到复位攻击的效果。似乎挺恐怖，然而关键是，如何能伪造成 A 发给 B 的包呢？这里有两个关键因素，源端口和序列号。

一个 TCP 连接都是四元组，由源 IP、源端口、目标 IP、目标端口唯一确定一个连接。所以，如果 C 要伪造 A 发给 B 的包，要在上面提到的 IP 头和 TCP 头，把源 IP、源端口、目标 IP、目标端口都填对。这里 B 作为服务器，IP 和端口是公开的，A 是我们要下手的目标，IP 当然知道，但 A 的源端口就不清楚了，因为这可能是 A 随机生成的。当然，如果能够对常见的 OS 如 windows 和 linux 找出生成 source port 规律的话，还是可以搞定的。

序列号问题是与滑动窗口对应的，伪造的 TCP 包里需要填序列号，如果序列号的值不在 A 之前向 B 发送时 B 的滑动窗口内，B 是会主动丢弃的。所以我们要找到能落到当时的 AB 间滑动窗口的序列号。这个可以暴力解决，因为一个 sequence 长度是 32 位，取值范围 0-4294967296，如果窗口大小像上图中我抓到的 windows 下的 65535 的话，只需要相除，就知道最多只需要发 65537（4294967296/65535=65537）个包就能有一个序列号落到滑动窗口内。RST 包是很小的，IP 头＋ TCP 头也才 40 字节，算算我们的带宽就知道这实在只需要几秒钟就能搞定。

那么，序列号不是问题，源端口会麻烦点，如果各个操作系统不能完全随机的生成源端口，或者黑客们能通过其他方式获取到 source port，RST 攻击易如反掌，后果很严重。