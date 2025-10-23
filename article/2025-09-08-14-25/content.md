# 题解：P5091 【模板】扩展欧拉定理

## 前言及介绍

了解扩展欧拉定理之前，先看看费马小定理和欧拉定理。

### 费马小定理

费马小定理是数论中基础的定理之一。具体地，对于任意质数 $p$ 与任意整数 $a(p\nmid a)$，都满足 $a^{p-1}\equiv 1\pmod{p}$（定理一）。

这个定理也等价于：对于任意质数 $p$ 与任意整数 $a$，都满足 $a^{p}\equiv a\pmod{p}$。

这两个的同余关系在 $p\nmid a$ 等价，而当 $p\mid a$ 时有 $a^{p}\equiv0\equiv a\pmod{p}$。

#### 定理一的证明

首先证明对于 $i=1,2,\cdots,p-1$，$ia\bmod p$ 都各个不相同。

利用反证法：若有 $1\le i<j<p$ 使得 $ia\bmod p=ja\bmod p$，则必定 $(j-i)a\equiv 0\pmod{p}$。

但明显地，$(j-i)$ 与 $a$ 都不是 $p$ 的倍数，矛盾所以得证。

然后回到定理一。

因为每个余数都互不相同且数量为 $p-1$，所以我们可以视为它是 $\{1,2,\cdots,p-1\}$ 的一种排列。因此，有：

$$
\prod_{i=1}^{p-1}i=\prod_{i=1}^{p-1}(ia\bmod p)\equiv\prod_{i=1}^{p-1}ia=a^{p-1}\prod_{i=1}^{p-1}i\pmod{p}
$$

则：

$$(a^{p-1}-1)\prod_{i=1}^{p-1}i\equiv 0\pmod{p}$$

定理一得证。

#### 定理二的证明

观察到定理二 $\forall a \in \mathbb{N}$ 都成立，采用数学归纳法。其中负整数可以转化为正整数。

归纳起点为 $0^p\equiv 0\pmod{p}$，显然成立。假设对于 $a\in \mathbb{N}$ 成立，需证明对于 $a+1$ 也成立。由二项式定理可知：

$$(a+1)^p=a^p+\binom{p}{1}a^{p-1}+\binom{p}{2}a^{p-2}\cdots+\binom{p}{p-1}a+1$$

不管首尾，组合数 $\binom{p}{n}=\dfrac{p!}{k!(p-k)!}$ 之中，$p$ 都可整数分子而不能整除分母，因此这些系数对于 $n\neq 0$ 且 $n\neq p$ 都是 $p$ 的倍数。因此：

$$
(a+1)^p\equiv a^p+1\equiv a+1\pmod{p}
$$

其中的第二步是假设。

因此，定理二成立。

综上，费马小定理的两种形式都成立。

### 欧拉定理

欧拉定理是将费马小定理推广到了一般的模数，但仍要求底数与指数互质。

具体地，对于整数 $m>0$ 与整数 $a$ 且 $\gcd(a,m)=1$，都有 $a^{{\varphi}(m)}\equiv 1\pmod{m}$。

其中 $\varphi(n)$ 为欧拉函数，表示小于等于 $n$ 与 $n$ 互质的数的个数。

显然对于质数 $p$ 有 $\varphi(p)=p-1$，因此费马小定理也仅是欧拉定理的一个特例。

#### 证明

与费马小定理的定理一的证明类似。

取一个与 $m$ 互质的数列。考虑集合

$$S=\{r\in\mathbb{Z}^{+}:1\le r\le m-1,\gcd(r,m)=1\}$$

集合 $S$ 是模 $m$ 的既约剩余系，也就是说，集合 $S$ 是所有小于 $m$ 的正整数，且与 $m$ 互质的数构成的集合。

根据欧拉函数的定义可知，$|S|=\varphi(m)$。类似上面的证明，将它们分别乘上 $a$，也相当于对该集合进行重新的排列，集合 $S$ 变为：

$$S=\{ar\bmod m:r\in\mathbb{S}\}$$

易验证 $\gcd(ar,m)=1$ 且对于不同的 $r_1,r_2\in S$ 对应的 $ar_1\bmod m$ 与 $ar_2\bmod m$ 也一定不同。因此：

$$
\prod_{r\in S}r\equiv\prod_{r\in S}ar=a^{\varphi{(m)}}\prod_{r\in S}r\pmod{m}
$$

再次重复之前的证明过程，只要消去掉 $\displaystyle\prod_{r\in S}r$ 即可得到 $a^{\varphi(m)}\equiv 1\pmod{m}$。

## 正题——扩展欧拉定理

扩展欧拉定理进一步地将结论推广到了底数与指数不互质的情况。彻底解决了任意模数下任意底数的幂次计算，将它们转化为了指数小于 $2\varphi(m)$ 的情况，从而可通过快速幂在 $O(\log \varphi(m))$ 下通过。

具体地，扩展欧拉定理的命题如下：

> 对于任意正整数 $m$、整数 $a$、非负整数 $k$，都有：
>
> $$
> a^k\equiv\begin{cases}
> a^{k\bmod \varphi(m)}, & \gcd(a,m)=1; \\
> a^k, & \gcd(a,m)\neq 1,k<\varphi(m); \\
> a^{(k\bmod \varphi(m))+\varphi(m)}, & \gcd(a,m)\neq 1, k\ge \varphi(m).
> \end{cases} \pmod{m}
> $$

第二种情况为直接使用快速幂当 $k<\varphi(m)$ 时。而第一种与第三种的区别就是通过取余实现降幂后是否需要加上一项 $\varphi(m)$。当然。将第一种情形合并纳入到第二种、第三种也是可以的。

### 证明

首先，我们要找到一个 $k_0\in\mathbb{N}$ 使得 $a$ 与 $m'$ 互质（其中 $m'=\frac{m}{\gcd(a^{k_0},m)}$）。我们设 $\nu_p(n)$ 是整数 $n$ 质因数分解中质数 $p$ 的幂次。

我们现只关注 $a$ 的质因数 $p(\nu_p(a)>0)$，因为 $a$ 与 $m$ 的公因子只能来自 $a$ 的质因数。而对于每个公因子 $p$ 我们计算 $m$ 中 $p$ 的幂次 $\nu_p(m)$ 能被 $a$ 中 $p$ 的幂次 $\nu_p(a)$ 整除的最大次数。而 $k_0$ 取这些次数的最大值，那么就取

$$
k_0=\max\left\{\left\lceil\dfrac{\nu_p(m)}{\nu_p(a)}\right\rceil:\nu_p(a)>0\right\}
$$

而互质的原因就是：$\gcd(a^{k_0},m)$ 已经提取了 $a,m$ 的所有公因子，所以剩下的 $m'$ 与 $a$ 没有共同质因数，故 $a$ 和 $m'$ 互质。

然后我们考虑对于 $k\ge k_0$ 同余的 $b\equiv a^k\pmod{m}$。

化简同余式。因为 $\gcd(a^{k_0},m)=\gcd(a^k,m)\mid a^k$，所以可将等式两侧（包括模数）同时除以 $\gcd(a^{k_0},m)$。

因为左边 $b$ 除以公因子，得到与 $m'$ 相关的同余；右边将 $a^k$ 拆分为 $a^{k_0}\times a^{k-k_0}$，再去除以公因子，也分离出了与 $m'$ 互质的部分。

那么就得到：

$$
\dfrac{b}{\gcd(a^{k_0},m)}=\dfrac{a^{k_0}}{\gcd(a^{k_0},m)}\times a^{k-k_0}\pmod{m'}
$$

此时可以惊奇地发现，$a$ 与模数 $m'$ 互质，可以直接利用欧拉定理（这里不解释了），得到：

$$
\dfrac{b}{\gcd(a^{k_0},m)}\equiv\dfrac{a^{k_0}}{\gcd(a^{k_0},m)}\times a^{(k-k_0)\bmod\varphi(m')}\pmod{m'}
$$

此时再将 $\gcd(a^{k_0},m)$ 乘回去，就能得到

$$
a^k\equiv a^{k_0}\times a^{(k-k_0)\bmod\varphi(m')}=a^{k_0+(k-k_0)\bmod\varphi(m')}\pmod{m'}
$$

这样就得到了扩展欧拉定理的形式。

## 代码

```cpp
#include <iostream>
#define int __int128
using namespace std;

const int N = 2e4 + 10;

int a, b, m;
bool f;

int phi(int n) {
	int ans = n;
	for (int i = 2; i * i <= n; i++) {
		if (n % i == 0) {
			ans -= ans / i;
			while (n % i == 0) n /= i;
		}
	}
	if (n > 1) ans -= ans / n;
	return ans;
}

int gcd(int a, int b) {
	if (b == 0) return a;
	return gcd(b, a % b);
}

int qpow(int a, int b, int p) {
	int res = 1;
	while (b) {
		if (b & 1) res = res * a % p;
		b >>= 1;
		a = a * a % p;
	}
	return res % p;
}

inline int read() {
	int x = 0, np = 1;
	char ch = getchar();
	while (ch < '0' || ch > '9') np = (ch == '-' ? -1 : np), ch = getchar();
	while ('0' <= ch && ch <= '9') {
		x = (x << 1) + (x << 3) + (ch ^ 48);
		ch = getchar();
	}
	return x * np;
}

inline int read_mod(int p) {
	int x = 0;
	char ch = getchar();
	while (ch < '0' || ch > '9') ch = getchar();
	while ('0' <= ch && ch <= '9') {
		x = (x << 1) + (x << 3) + (ch ^ 48);
		if (x >= p) f = 1;
		x %= p;
		ch = getchar();
	}
	return x;
}

inline void write(int x) {
	if (x < 0) putchar('-'), x = -x;
	if (x >= 10) write(x / 10);
	putchar(x % 10 + '0');
	return;
}

signed main() {
	a = read(), m = read();
	a %= m;
	int mod = phi(m);
	b = read_mod(mod);
	if (f && gcd(a, m) != 1) {
	    b += mod;
	}
	write(qpow(a, b, m));
	return 0;
}
```

## 后记

在**严格证明**部分中选用了 OI-Wiki 上的[严格证明](https://oi-wiki.org/math/number-theory/fermat/#%E4%B8%A5%E6%A0%BC%E8%AF%81%E6%98%8E)一处。
