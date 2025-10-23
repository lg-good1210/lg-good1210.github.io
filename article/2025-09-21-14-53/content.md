# 题解：P10508 质因子

## 重点思路

我们需要找到这 $1000$ 个数中，质因子 $2$ 的出现次数。

我们在线处理，读入数字 $n$ 后，不断地将 $n$ 除以 $2$ 直到无法整除，并且记录变量 $ans$ 为答案。

给出答案的代码：

```cpp
#include <iostream>
#define int long long // 注意开 long long
using namespace std;

int n, ans;

signed main() {
    freopen("numlist.txt", "r", stdin);
    ios::sync_with_stdio(0);
    cin.tie(0);
    while (cin >> n) {
        while (n % 2 == 0) ans++, n /= 2;
        // 不断除以 2 直到无法整除，并将 ans 加 1
    }
    cout << ans;
    return 0;
}
```

## 答案

最终答案为 $251$。
