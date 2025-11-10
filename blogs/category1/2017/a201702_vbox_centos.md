---
title: windows8.1+VBox+CentOS共享文件夹
date: 2017/07/08
tags:
 - vbox
 - 配置
categories:
 - 工具
 - 操作系统

---

参考：https://wenku.baidu.com/view/cefd119002768e9950e738d6.html

1. 首先在VBox中安装好CentOS64位虚拟机

2. 共享文件夹的设置参考Ubuntu共享的设置方法
![vbox](/old/a201702_vbox01.png "vbox")

3. 如果直接安装VBox增强功能会产生
```shell
Failed to set up service vboxadd, please check the log file /var/log/VBoxGuestAdditions.log for details 
```
的错误.
原因是显然内核不支持 缺少编译内核的相关组件（其实我不懂），解决方法安装内核组件即可。

4. 命令行root 用户执行命令：

```shell
yum install kernel kernel-devel
yum install gcc
yum install -y gcc gcc-c++ make kernel-devel
```
成功执行上面三条命令就算完成了关键部分，然后就可以重启CentOS，再安装增强功能

桌面上就会如图所示，然后按照他的指示安装就行，
![vbox](/old/a201702_vbox02.png "vbox")

5.使用root用户在`/mnt`目录下创建共享文件挂载点文件夹：
```shell
mkdir share
```
6.挂载共享文件夹到虚拟机中的挂载点文件夹：
```shell
mount -t vboxsf sharefile /mnt/share/
```
就ok啦！
![vbox](/old/a201702_vbox03.png "vbox")
