# 题解：P11061 【MX-X4-T1】「Jason-1」IO++

## 思路

首先，我们**不能去掉**输出语句，否则就会代码改变结果。

那么我们就将重心**转移到输入语句上**。

首先，必要的输入语句不可省略。

其次，对于第 $i$ 次的输入语句，如果删除了它会影响接下来的输出，也不能删除。

那么问题的关键就是关于 $i$ 的区间。我们说“如果删除了会影响接下来的输出”，所以那些没有被调用输入值的输入语句就可删除，但为了不影响第 $i$ 句之后的输入语句，所以定论次数在 $[1,\text{maxn}]$ 这个范围内的输入语句都**不可删除**。

于是我们记录一个 $\text{maxn}$ 为 $a_i$ 中的最大值，即 $\text{maxn}=\max(a_1,a_2,\cdots,a_n)$。然后我们将次数大于 $\text{maxn}$ 的语句都删除，即可达到效果。

## 代码

如下：

```cpp
#include <iostream>
#include <algorithm>
#define int long long
using namespace std;

const int N = 1e5 + 10;
int n, x, ans, a[N];
int maxn = -1; // 记得初始为较小值

signed main() {
    cin >> n;
    ans = n; // 记录语句个数
    for (int i = 1; i <= n; i++) {
    	cin >> a[i];
    	if (a[i] != 0) maxn = max(maxn, a[i]); // 记录 maxn
    }
    sort(a + 1, a + n + 1); // 排序以便判断
    for (int i = 1; i <= n && a[i] == 0; i++) {
    	if (i > maxn) {
    		ans--; // 若这条输入语句的次数大于 maxn 就删除不计
    	}
    }
    cout << ans;
    return 0;
}
```