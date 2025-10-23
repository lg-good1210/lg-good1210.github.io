# 题解：AT_abc177_c [ABC177C] Sum of product of pairs

## 思路

首先直接暴力不可行，时间复杂度必须优化到 $O(n)$ 及以下。

观察到：

$$
\sum_{i=1}^{N-1}\sum_{j=i+1}^{N}A_iA_j=\sum_{i=1}^{N-1}A_i\left(\sum_{j=i+1}^{N}A_j\right)
$$

设前缀和 $S_n=\displaystyle\sum_{i=1}^{n}a_i$，则原式变为：

$$
\sum_{i=1}^{N-1}A_i\left(\sum_{j=i+1}^{N}A_j\right)=\sum_{i=1}^{N-1}A_i\left(S_N-S_{i+1-1}\right)=\sum_{i=1}^{N-1}A_i\left(S_N-S_{i}\right)
$$

仅需边读入边处理前缀和即可，代码如下：

```cpp
#include <iostream>
#define int long long
using namespace std;

const int N = 2e5 + 10;
const int MOD = 1e9 + 7;

int n, a[N], s[N], sum;

signed main() {
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        s[i] = (s[i - 1] + a[i]) % MOD;
        while (s[i] < 0) s[i] += MOD;
    }
    for (int i = 1; i <= n - 1; i++) {
        sum += a[i] * (s[n] - s[i]);
        sum %= MOD;
        while (sum < 0) sum += MOD;
    }
    cout << sum;
    return 0;
}
```

> 注意取模时的一些的小问题！
