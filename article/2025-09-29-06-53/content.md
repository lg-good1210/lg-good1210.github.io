# 题解：P12412 「YLLOI-R1-T1」等你下课

## 思路

我们要让小 Y 能够尽可能的不孤独，就要每节课都尽可能的有一位好朋友陪他。

假设第 $i$ 节课有 $(n-1)$ 个人去选择（因为有 $1$ 人要陪小 Y），则一共选择了 $k(n-1)$ 次。

那么就可知，答案的式子：

$$
\sum m-k(n-1)
$$

若为负数则取 $0$ 即可，即：

$$
\max\left(0, \sum m-k(n-1)\right)
$$

## 代码

如下：

```cpp
#include <iostream>
#define int long long
using namespace std;

const int N = 1e6 + 10;

int n, k, s, a[N];

signed main() {
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);
    
    cin >> n >> k;
    for (int i = 1; i <= n; i++) cin >> a[i], s += a[i];
    cout << max(0LL, s - k * (n - 1));
    return 0;
}
```

时间复杂度：$O(n)$。
