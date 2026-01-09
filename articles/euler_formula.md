---
title: "关于欧拉公式的证明"
date: "2025-07-11"
tags: ["数学", "欧拉公式"]
---

# 关于 $e^{i\pi}+1=0$ 的简单证明

## 前置知识

### 关于 $e$

> 建议已学习自然常数及导数的跳过

有极限

$$
\lim_{x\to\infty}\left(1+\dfrac{1}{x}\right)^x
$$

这个极限的结果即为 $e$.

### 关于导数

称一个函数 $f(x)$ 的导数为 $f'(x)$ 或 $\dfrac{\mathrm{d}}{\mathrm{d}x}f(x)$. $n$ 阶导数为 $f^{(n)}(x)$

一个函数的导数为函数的瞬时变化率。

在区间 $\left[x,x+\Delta x\right]$ 中，函数的变化率为 $\dfrac{f(x +\Delta x)-f(x)}{\Delta x}$

当 $\Delta x$ 趋向于 0 时，此时的变化率就为这个函数的导数。用极限表示，即为

$${f}'{(x)}=\lim_{\Delta x \to 0} \dfrac{f(x + \Delta x)-f(x)}{\Delta x}$$

关于导数，也有如下公式

$$
C'=0\\
(f\pm g)'=f'\pm g' \\
(fg)'= f'g+fg' \\
(x^n)'=nx^{n-1} \\
$$

定义函数 $f(x)=e^x$，则 ${f}'{(x)}$ 为

$$
\lim_{\Delta x \to 0} \dfrac{e^{x + \Delta x}-e^x}{\Delta x}
$$

即

$$
\lim_{\Delta x \to 0} e^{x}\cdot\dfrac{e^{\Delta x}-1}{\Delta x}
$$

而中间的极限部分的结果为 $1$，满足这个条件的数就是 $e$，其约等于 $2.718$. 也称其为自然常数

### 关于 $i$

> 建议学习了虚数及复数的跳过

关于一元二次方程 $x^2+1=0$，判别式 $\Delta=0^2-4=-4<0$，意味着这个方程在实数域内无解。

定义虚数单位 $i^2=-1$，即 $i=+\sqrt{-1}$，则上述方程的解为

$$
\begin{cases}
x_1=i \\
x_2=-i \\
\end{cases}
$$

关于 $i$ 的 $n$ 次方，以下为 $n\in[1,4]$ 时的结果

| $i$ 的 $n$ 次方 | 结果 |
| :----------: | :----------: |
| $i^1$ | $i$ |
| $i^2$ | $-1$ |
| $i^3$ | $-i$ |
| $i^4$ | $1$ |

当 $n > 4$ 时，$i^n$ 的结果即为 $i^{n \bmod4}$。

设 $n=4k+m(0\le m<4,m,k\in \mathbb{N^*})$

则 $i^n=i^{4k+m}=i^{4k}\times i^m=(i^4)^k\times i^m=1\times i^m=i^m$

其中 $m=n\bmod 4$.


### 关于 $\pi$

> 建议学习过圆周率及关于圆的基本知识的跳过

$\pi$ 为圆形中周长与直径的比值，是无理数。

用 $\pi$ 可求圆形的面积和周长，具体的

$$
C= 2\pi r=d\pi \\
$$ 
$$
S=\pi r^2 \\
$$

其中 $r$ 为半径，$d$ 为直径。

### 关于正弦的导数及其规律

关于正弦函数的导数，即 $\dfrac{\mathrm{d}}{\mathrm{d}x}\sin x$，导数即为

$$
\lim_{\Delta x\to 0}\dfrac{\sin(x+\Delta x)-\sin x}{\Delta x}
$$

展开 $\sin(x+\Delta x)$，得

$$
\lim_{\Delta x \to 0}\dfrac{\sin x\cos \Delta x+\cos x\sin \Delta x-\sin x}{\Delta x}
$$

合并同类项，得

$$
\underset{(\text{sine I})}{\underbrace{\lim_{\Delta x \to 0}\sin x\dfrac{(\cos \Delta x-1)}{\Delta x}}}+\underset{(\text{sine II})}{\underbrace{\lim_{\Delta x \to 0}\cos x\dfrac{\sin \Delta x}{\Delta x}}}
$$

#### 计算 $(\text{sine II})$

![实例图](https://cdn.luogu.com.cn/upload/image_hosting/0ad0r1ko.png)

如上图，$\angle ADB=\angle ADC=\Delta x$，$AD=1$

当 $\Delta x$ 趋向于 $0$ 时，$AC$ 也趋向于 $\stackrel\frown{AB}$

其中 $AC=\sin \Delta x$，$AB=\Delta x$

故 $\displaystyle\lim_{\Delta x\to 0}\dfrac{\sin\Delta x}{\Delta x}=1$

所以 $\displaystyle\lim_{\Delta x \to 0}\cos x\dfrac{\sin \Delta x}{\Delta x}=1$

#### 计算 $(\text{sine I})$

上述中 $\displaystyle\lim_{\Delta x \to 0}\dfrac{\sin \Delta x}{\Delta x}=1$，则 $\displaystyle\lim_{\Delta x \to 0}\dfrac{(\sin \Delta x)^2}{{(\Delta x)}^{2}}=1$.

将 $(\sin \Delta x)^2$ 替换为 $1-(\cos \Delta x)^2$，则

$$
\displaystyle\lim_{\Delta x \to 0}\dfrac{1-(\cos \Delta x)^2}{{(\Delta x)}^{2}}=1
$$

运用平方差公式，得

$$
\displaystyle\lim_{\Delta x \to 0}\dfrac{(1-\cos \Delta x)(1+\cos \Delta x)}{{(\Delta x)}^{2}}=1
$$

展开，得

$$
\displaystyle\lim_{\Delta x \to 0}\dfrac{1-\cos \Delta x}{\Delta x}\cdot\lim_{\Delta x \to 0}\dfrac{1+\cos \Delta x}{{\Delta x}}=1
$$

将 $\displaystyle\lim_{\Delta x \to 0}\dfrac{1+\cos \Delta x}{{\Delta x}}$ 移至右边，得

$$
\lim_{\Delta x\to 0}\dfrac{1-\cos\Delta x}{\Delta x}=\lim_{\Delta x\to 0}\dfrac{1}{\frac{1+\cos\Delta x}{\Delta x}}
$$

整理右边，得

$$
\lim_{\Delta x\to 0}\dfrac{1-\cos \Delta x}{\Delta x}=\lim_{\Delta x\to 0}\dfrac{\Delta x}{1+\cos\Delta x}
$$

将右边带入 $\Delta x=0$，得

$$
\lim_{\Delta x\to 0}\dfrac{1-\cos\Delta x}{\Delta x}=\dfrac{0}{1+\cos 0}
$$

整理右边，得

$$
\lim_{\Delta x\to 0}\dfrac{1-\cos\Delta x}{\Delta x}=\dfrac{0}{1}
$$

即

$$
\lim_{\Delta x\to 0}\dfrac{1-\cos\Delta x}{\Delta x}=0
$$

两边同时乘 $-1$，得

$$
\lim_{\Delta x\to 0}\dfrac{-1+\cos \Delta x}{\Delta x}=0
$$

即

$$
\lim_{\Delta x\to 0}\dfrac{\cos \Delta x-1}{\Delta x}=0
$$

两边同时乘上 $\sin x$，得

$$
\lim_{\Delta x\to 0}\sin x\dfrac{\cos \Delta x-1}{\Delta x}=0
$$

#### 正弦的导数

带入原式，可得

$$
0\sin x+1\cos x=\cos x
$$

### 关于余弦的导数

关于余弦的导数，即 $\dfrac{\mathrm{d}}{\mathrm{d}x}\cos x$，导数即为

$$
\lim_{\Delta x\to 0}\dfrac{\cos (x+\Delta x)-\cos x}{\Delta x}
$$

展开 $\cos(x+\Delta x)$，得

$$
\lim_{\Delta x \to 0}\dfrac{\cos x\cos \Delta x-\sin x\sin \Delta x-\cos x}{\Delta x}
$$

合并同类项，得

$$
\underset{(\text{cosine I})}{\underbrace{\lim_{\Delta x\to 0}\cos x\dfrac{\cos \Delta x-1}{\Delta x}}}-\underset{(\text{cosine II})}{\underbrace{\lim_{\Delta x\to 0}\sin x\dfrac{\sin \Delta x}{\Delta x}}}
$$

#### 计算 $(\text{cosine I})$

联立 $(\text{sine I})$ 中内容可知，

$$
\lim_{\Delta x\to 0}\dfrac{\cos \Delta x-1}{\Delta x}=0
$$

两边同时乘上 $\cos x$，得

$$
\lim_{\Delta x\to 0} \cos x\dfrac{\cos \Delta x-1}{\Delta x}=0
$$

#### 计算 $(\text{cosine II})$

联立 $(\text{sine II})$ 中内容可知，

$$
\displaystyle\lim_{\Delta x\to 0}\dfrac{\sin\Delta x}{\Delta x}=1
$$

两边同时乘上 $\sin x$，得

$$
\displaystyle\lim_{\Delta x\to 0}\sin x\dfrac{\sin\Delta x}{\Delta x}=\sin x
$$

#### 余弦函数的导数

代入原式，得

$$
0-\sin x = -\sin x
$$

### 正弦、余弦导数的规律

观察正弦函数的导数，称正弦函数的 $n$ 阶导数为 ${(\sin x)}^{(n)}$。

| $n(0\le n\le 4)$ | 正弦函数的 $n$ 阶导数 |
| :----------: | :----------: |
| $0$ | $\sin x$ |
| $1$ | $\cos x$ |
| $2$ | $-\sin x$ |
| $3$ | $-\cos x$ |
| $4$ | $\sin x$ |

观察发现，正弦函数的 $n$ 阶导数从 $4$ 开始循环，具体地，

$$
(\sin x)^{(n)}=(\sin x)^{(n\bmod 4)}
$$

而对于余弦函数的导数，与正弦函数类似，列表：

| $n(0\le n\le 4)$ | 余弦函数的 $n$ 阶导数 |
| :----------: | :----------: |
| $0$ | $\cos x$ |
| $1$ | $-\sin x$ |
| $2$ | $-\cos x$ |
| $3$ | $\sin x$ |
| $4$ | $\cos x$ |

余弦函数的导数也是从 $4$ 开始循环，具体地

$$
(\cos x)^{(n)}=(\cos x)^{n\bmod 4}
$$

## 正题

不妨设 

$$
\sin x = a+bx+cx^2+dx^3+ex^4+fx^5+\cdots
$$

代入 $x=0$，得

$$
a=0
$$

两边同时求导，得

$$
\cos x=b+2cx+3dx^2+4ex^3+5fx^4+\cdots
$$

代入 $x=0$，得

$$
b=1
$$

两边再次同时求导，得

$$
-\sin x=2c+6dx+12ex^2+20fx^3+\cdots
$$

代入 $x=0$，得

$$
c=0
$$

重复以上过程，得

$$
\sin x = x-\dfrac{1}{6}x^3+\dfrac{1}{120}x^5-\cdots
$$

观察发现，上式可写为

$$
\sin x = \dfrac{1}{1!}x^1+\left(-\dfrac{1}{3!}\right)x^3+\dfrac{1}{5!}x^5+\cdots
$$

其中每一单项式的系数的正负性与 $x$ 的次数有关：

- 当 $\left\lfloor\dfrac{x}{2}\right\rfloor$ 为奇数时，系数为负数；

- 当 $\left\lfloor\dfrac{x}{2}\right\rfloor$ 为偶数时，系数为正数。

于是，

$$
\sin x = \sum_{n=0}^{\infty}\dfrac{(-1)^n}{(2n+1)!}x^{2n+1}
$$

与正弦函数相同，设

$$
\cos x=a+bx+cx^2+dx^3+ex^4+fx^5+\cdots
$$

代入 $x=0$，得

$$
a=1
$$

两边同时求导，得

$$
-\sin x=b+2cx+3dx^2+4ex^3+5fx^4+\cdots
$$

代入 $x=0$，得

$$
b=0
$$

两边再次同时求导，得

$$
-\cos x=2c+6dx+12ex^2+20fx^3+\cdots
$$

代入 $x=0$，得

$$
c=-\dfrac{1}{2}
$$

重复以上过程，得到

$$
\cos x=1-\dfrac{1}{2}x^2+\dfrac{1}{24}x^4-\cdots
$$

观察发现，上式可写为

$$
\cos x=\dfrac{1}{0!}x^0+\left(-\dfrac{1}{2!}\right)x^2+\dfrac{1}{4!}x^4+\cdots
$$

其中每一单项式的系数的正负性与 $x$ 的次数有关：

- 当 $\dfrac{x}{2}$ 为奇数时，系数为负数；

- 当 $\dfrac{x}{2}$ 为偶数时，系数为正数。

于是

$$
\cos x=\sum_{n=0}^{\infty}\dfrac{(-1)^n}{(2n)!}x^{2n}
$$

又设 

$$
e^x=a+bx+cx^2+dx^3+ex^4+fx^5+\cdots
$$

代入 $x=0$，得

$$
a=1
$$

两边同时求导，得

$$
e^x=b+2cx+3dx^2+4ex^3+5fx^4+\cdots
$$

代入 $x=0$，得

$$
b=1
$$

两边再次同时求导，得

$$
e^x=2c+6dx+12ex^2+20fx^3\cdots
$$

代入 $x=0$，得

$$
c=\dfrac{1}{2}
$$

重复以上过程，最终得

$$
e^x=1+x+\dfrac{1}{2}x^2+\dfrac{1}{6}x^3+\dfrac{1}{24}x^4+\dfrac{1}{120}x^5+\cdots
$$

观察上式，可写为

$$
e^x=\dfrac{1}{0!}x^0+\dfrac{1}{1!}x^1+\dfrac{1}{2!}x^2+\dfrac{1}{3!}x^3+\dfrac{1}{4!}x^4+\dfrac{1}{5!}x^5+\cdots
$$

则

$$
e^x=\sum_{n=0}^{\infty}\dfrac{1}{n!}x^n
$$

设 $x=i\theta \in \mathbb{C}$，其中 $\theta \in R$

观察 $e^x$ 的展开式，将其分为偶数部分和奇数部分，则

$$
e^x=\left(\sum_{n=0}^{\infty}\dfrac{1}{(2n)!}x^{2n}\right)+\left(\sum_{n=0}^{\infty}\dfrac{1}{(2n+1)!}x^{2n+1}\right)
$$

展开，得

$$
e^{i\theta}=\left(\sum_{n=0}^{\infty}\dfrac{1}{(2n)!}i^{2n}\theta^{2n}\right)+\left(\sum_{n=0}^{\infty}\dfrac{1}{(2n+1)!}i^{2n+1}\theta^{2n+1}\right)
$$

再次展开，得

$$
e^{i\theta}=\left(\sum_{n=0}^{\infty}\dfrac{(-1)^n}{(2n)!}\theta^{2n}\right)+\left(\sum_{n=0}^{\infty}\dfrac{(-1)^n}{(2n+1)!}i\theta^{2n+1}\right)
$$

将 $i$ 移至括号外，则

$$
e^{i\theta}=\left(\sum_{n=0}^{\infty}\dfrac{(-1)^n}{(2n)!}\theta^{2n}\right)+i\left(\sum_{n=0}^{\infty}\dfrac{(-1)^n}{(2n+1)!}\theta^{2n+1}\right)
$$

联立上文的 $\sin x$ 与 $\cos x$ 的展开式

$$
\sin x = \sum_{n=0}^{\infty}\dfrac{(-1)^n}{(2n+1)!}x^{2n+1} \\
\cos x=\sum_{n=0}^{\infty}\dfrac{(-1)^n}{(2n)!}x^{2n} \\
$$

代入，得

$$
e^{i\theta}=\cos \theta+i\sin\theta
$$

代入 $\theta = \pi$，得

$$
e^{i\pi}=\cos \pi + i\sin \pi=-1+0=-1
$$

两边同时加 $1$，得

$$
e^{i\pi} + 1 = 0
$$

所以:

$$
\boxed{e^{i\pi} + 1 = 0}
$$

证毕.
