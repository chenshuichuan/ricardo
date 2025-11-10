---
title: Failed to connect to github.com port 443 Timed out
date: 2016/06/23
tags:
  - git
categories:
  - 工具
  - 错误

---
# fatal: unable to access '' :Failed to connect to github.com port 443: Timed out
初学github使用，今天遇到
```shell
fatal: unable to access 'https://github.com/xxx/xxx.github.io.git/': Failed to connect to github.com port 443: Timed out
Fatal: TaskCanceledException encountered.
```

![github](/old/a201607_github01.png "github")


### 解决办法
重新登录该代码仓库，或多git push 几次 它可能弹出登录框给，输入账号密码即可解决 