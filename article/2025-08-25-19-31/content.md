# 题解：P5357 【模板】AC 自动机

## 前置

AC 自动机是以 Trie 的结构结合 KMP 思想建立的。

:::info[Trie 的结构体模板]
```cpp
#include <string>
using namespace std;
const int N = 2e5 + 10;

struct Trie {
  int nxt[N][26] = {}, cnt = 0;
  bool ext[N] = {};

  void insert(string s) {
    int p = 0;
    for (int i = 0; i < s.size(); i++) {
      int c = s[i] - 'a';
      if (!nxt[p][c]) nxt[p][c] = ++cnt;
      p = nxt[p][c];
    }
    ext[p] = true;
  }

  bool find(string s) {
    int p = 0;
    for (int i = 0; i < s.size(); i++) {
      int c = s[i] - 'a';
      if (!nxt[p][c]) return 0;
      p = nxt[p][c];
    }
    return ext[p];
  }
};
```
:::

思想这里不再叙述，OI-Wiki 上有：[KMP](https://oi-wiki.org/string/kmp/)。

## fail 指针及构建

AC 自动机利用 fail 指针来辅助多模式串的匹配。

当状态 $u$ 匹配失败时，fail 指针会引导至另一状态 $v$。状态 $v$ 代表的字符串是状态 $u$ 代表的字符串的所有后缀中**最长的、并且被自动机识别的后缀**。

这个 fail 指针与 KMP 的 nxt 指针相似，在构建时参考 KMP 中构造 nxt 指针的思想：

考虑字典树中当前节点 $u$，其父节点为 $p$，$p$ 由字符 $ch$ 指向 $u$，即 $\operatorname{trie}(p,c)=u$。

假设我们都知道深度小于 $u$ 的所有结点的 fail 指针：

- 如果存在 $\operatorname{trie}(\operatorname{fail}(p), c)$：则让 $u$ 的 fail 指针指向这个 $\operatorname{trie}(\operatorname{fail}(p), c)$;
- 否则继续寻找 $\operatorname{trie}(\operatorname{fail}(\operatorname{fail}(p)), c),\operatorname{trie}(\operatorname{fail}(\operatorname{fail}(\operatorname{fail}(p))), c),\dots$ 并重复判断，直到到达根节点；
- 若依旧不存在，就直接让 fail 指针指向根节点。

如上就完成了构建 $\operatorname{fail}(u)$ 的操作。

那么就能完成 `build` 函数：

```cpp
void build() { // 建立 fail
    queue<int> q;
    for (int i = 0; i < 26; i++) if (tr[0].son[i]) q.push(tr[0].son[i]);
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (int i = 0; i < 26; i++) {
            if (tr[u].son[i]) {
				tr[tr[u].son[i]].fail = tr[tr[u].fail].son[i];
//		        tr[tr[tr[u].fail].son[i]].du++; 之后有用
			    q.push(tr[u].son[i]);
			}
            else tr[u].son[i] = tr[tr[u].fail].son[i];
        }
    }
    return;
}
```

## 查询 $S$

直接暴力枚举 $S$ 的每一位，然后将这一位的所有 fail 跳一遍。代码如下：

```cpp
void query(string s) {
    int u = 0;
    for (int i = 0; i < s.size(); i++) {
        u = tr[u].son[s[i] - 'a'];
        for (int j = u; j && tr[j].cnt != -1; j = tr[j].fail) {
            if (tr[j].idx) ans[tr[j].idx]++;
        }
    }
    return;
}
```

## 优化

如果你提交的这段代码，那么你将获得 $76\text{pts}$ 的分数（[76pts 记录](https://www.luogu.com.cn/record/233130318)）。

`build` 函数的代码似乎没什么可优化的，但我们发现 `query` 函数中似乎可以进行优化。

每次的匹配，会一直向 fail 边跳，效率较低。

那如何优化呢？首先要了解一个性质：

:::info[fail 指针的一个性质]
在一个 AC 自动机中，如果只保留 fail 边，那么剩余的图一定是棵树。
:::

:::success[原因]
很显然：因为 fail 不成环，并且深度一定比现在的低。
:::

那么就可以转化为在 fail 的树上链的求和的问题。

我们的时间主要都浪费在跳 fail 上。如果可以预先记录，最后同一求和，那么效率就会得到提升。

我们按照 fail 树，做一次内向树上的拓扑排序，就能一次性求出所有模式串的出现次数。

同时要改变以下 `build` 函数，在原基础上为拓扑排序增加入度的统计。

:::success[`build` 函数]
```cpp
void build() {
    queue<int> q;
    for (int i = 0; i < 26; i++) if (tr[0].son[i]) q.push(tr[0].son[i]);
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (int i = 0; i < 26; i++) {
            if (tr[u].son[i]) {
                tr[tr[u].son[i]].fail = tr[tr[u].fail].son[i];
                tr[tr[tr[u].fail].son[i]].du++;
                q.push(tr[u].son[i]);
            } else tr[u].son[i] = tr[tr[u].fail].son[i];
        }
    }
    return;
}
```
:::

:::success[`query` 函数]
```cpp
void query(string t) {
    int u = 0;
    for (int i = 0; i < t.size(); i++) {
		u = tr[u].son[t[i] - 'a'];
		tr[u].ans++;
	}
    return;
}
```
:::

:::success[拓扑排序：`topu` 函数]
```cpp
void topu() {
    queue<int> q;
    for (int i = 0; i <= tot; i++) if (tr[i].du == 0) q.push(i);
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        ans[tr[u].idx] = tr[u].ans;
        int v = tr[u].fail;
        tr[v].ans += tr[u].ans;
        if (!--tr[v].du) q.push(v);
    }
    return;
}
```
:::

## 最终代码及其他

:::success[AC]
```cpp
#include <iostream>
#include <cstring>
#include <queue>
using namespace std;

const int N = 2e5 + 6, SIZE = 2e5 + 6;

int n, tot, ans[N], pidx, idx[N];
string s;

struct Node {
    int son[30], ans, fail, du, idx;
    void init() {
        memset(son, 0, sizeof(son));
        ans = fail = idx = 0;
        return;
    }
} tr[SIZE];

void init() {
    tot = pidx = 0;
    tr[0].init();
    return;
}

void insert(string s, int &idx) {
    int u = 0;
    for (int i = 0; i < s.size(); i++) {
        int &son = tr[u].son[s[i] - 'a'];
        if (!son) son = ++tot, tr[son].init();
        u = son;
    }
    if (!tr[u].idx) tr[u].idx = ++pidx;
    idx = tr[u].idx;
    return;
}

void build() {
    queue<int> q;
    for (int i = 0; i < 26; i++) if (tr[0].son[i]) q.push(tr[0].son[i]);
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (int i = 0; i < 26; i++) {
            if (tr[u].son[i]) {
                tr[tr[u].son[i]].fail = tr[tr[u].fail].son[i];
                tr[tr[tr[u].fail].son[i]].du++;
                q.push(tr[u].son[i]);
            } else tr[u].son[i] = tr[tr[u].fail].son[i];
        }
    }
    return;
}

void query(string t) {
    int u = 0;
    for (int i = 0; i < t.size(); i++) u = tr[u].son[t[i] - 'a'], tr[u].ans++;
    return;
}

void topu() {
    queue<int> q;
    for (int i = 0; i <= tot; i++) if (tr[i].du == 0) q.push(i);
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        ans[tr[u].idx] = tr[u].ans;
        int v = tr[u].fail;
        tr[v].ans += tr[u].ans;
        if (!--tr[v].du) q.push(v);
    }
    return;
}

signed main() {
    init();
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> s;
        insert(s, idx[i]);
        ans[i] = 0;
    }
    build();
    cin >> s;
    query(s);
    topu();
    for (int i = 1; i <= n; i++) cout << ans[idx[i]] << endl;
    return 0;
}
```
:::

[记录在这里](https://www.luogu.com.cn/record/233131953)。

:::info[时间复杂度]
时间复杂度：$O(|\Sigma|\times\sum L_i + |T|)$。

其中 $|\Sigma|=26$（字母表），$\sum L_i$ 为所有模式串总长度，$|T|$ 为文本串长度。
:::
