---
title: oracle 11g 数据库中文字段vs2013 MFC工程 显示乱码解决办法
date: 2015/12/10
tags:
 - oracle
 - MFC
 - visual studio
 - 乱码
categories:
 - 数据库
 - 后端开发

---
### 命令行执行
```shell
SQL> select * from v$NLS_PArameters 2 ;
PARAMETER                | VALUE
------------------------|-------------------
NLS_LANGUAGE            | SIMPLIFIED CHINESE
NLS_TERRITORY           | CHINA
NLS_CURRENCY            | ￥
NLS_ISO_CURRENCY        | CHINA
NLS_NUMERIC_CHARACTERS  | .,
NLS_CALENDAR            | GREGORIAN
NLS_DATE_FORMAT         | DD-MON-RR
NLS_DATE_LANGUAGE       | SIMPLIFIED CHINESE
NLS_CHARACTERSET        | ZHS16GBK   ← 注意此项！
```

### 分析原因：
字符集是ORACLE 为适应不同语言文字显示而设定的。用于汉字显示的字符集主要有ZHS16CGB231280，US7ASCII，WE8ISO8859P1等。字符集不仅需在 服务器端存在，而且客户端也必须有字符集注册。服务器端，字符集是在安装ORACLE时指定的，字符集登记信息 存储在ORACLE数据库字典的V$NLS_PARAMETERS表中;
我的VS2013工程使用 项目设置的字符集是“Use Multi-Byte Character Set”
而数据库上面是 SIMPLIFIED CHINESE_CHINA.ZHS16GBK

### 解决办法：
最后我在系统的环境变量里面加了个NLS_LANG值也是SIMPLIFIED CHINESE_CHINA.ZHS16GBK，重启了一下VS，然后就好了
