# 题解：P12244 踩点

## 思路

先观察样例：

> 输入：
>
> ```input
> 3 2
> 1 2
> 5 7
> 8 9
> ```
>
> 输出：
>
> ```output
> 1
> ```

观察到：对于第 $i$ 节课至第 $i+1$ 节课，课间时间为 $L_{i+1}-R_{i}$。

我们可以模拟，算出每个课间的时间再减去往返时间。若为负数则不考虑此次时间。

即：对于第 $i$ 次课间，也就是对于第 $i$ 节课至第 $i+1$ 节课的课间，打球的时间为 $\max(0, L_{i+1}-R_{i})$。

那么你就可以 AC 这道题了。

## 代码

读入后模拟：

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 1e5 + 10;

int n, T, L[N], R[N];
int ans = 0;

signed main() {
	cin >> n >> T;
	for (int i = 1; i <= n; i++) cin >> L[i] >> R[i];
	for (int i = 1; i < n; i++) {
		ans += max(0, L[i + 1] - R[i] - T);
	}
	cout << ans;
	return 0;
}
```

或者你也可以边读入边计算：

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 1e5 + 10;

int n, T, L[N], R[N];
int ans = 0;

signed main() {
	cin >> n >> T;
	cin >> L[1] >> R[1];
	for (int i = 2; i <= n; i++) {
		cin >> L[i] >> R[i];
		ans += max(0, L[i] - R[i - 1] - T);
	}
	ans = max(0, ans);
	cout << ans;
	return 0;
}
```