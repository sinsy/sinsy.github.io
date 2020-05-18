---
layout: post
title:  "Git常用资源"
date:   2016-04-28 14:39:15 +0800
categories: 其他
tags: [git]
---
## 一、git创建
**创建版本库** `mkdir learngit`

**查看路径** `pwd`

**初始化** `git init`

## 二、查看记录
**查看提交历史** `git log（–pretty=oneline)`

**查看命令历史** `git reflog`

**查看某次修改** `git show xxxx`

**查看状态** `git status`

**查看不同** `git diff`

## 三、文件操作

**添加文件** `git add readme.txt`

**提交文件** `git commit -m “XXXX”(-m 带提交说明)[建议使用]/git commit -a`

**直接删除文件** `git rm test.txt`

**删除文件暂存状态** `git rm --cached test.txt`

**还原删除文件** `git checkout test.txt`

## 四、版本操作
**版本回退** 

* `git reset --hard commit_id(HEAD^:回退到上一版本)`
* `git reset commit_id (保留修改)`

**标签功能**

* git tag # 显示所有标签
* git tag -l 'v1.4.2.*' # 显示 1.4.2 开头标签
* git tag v1.3 # 简单打标签   
* git tag -a v1.2 9fceb02 # 后期加注标签
* git tag -a v1.4 -m 'my version 1.4' # 增加标签并注释， -a 为 annotated 缩写
* git show v1.4 # 看某一标签详情
* git push origin v1.5 # 分享某个标签
* git push origin --tags # 分享所有标签

## 五、远程仓库

### 1.远程仓库准备工作
1. 创建ssh key： ssh-keygen -t rsa –C “youremail@example.com”，如果一切顺利的话，可以在用户主目录里找到.ssh目录，里面有id_rsa和id_rsa.pub两个文件，这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。
2. 登陆GitHub，打开“Account settings”，“SSH Keys”页面：
然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容。

### 2.远程仓库操作语句
**关联** `git remote add origin git@server-name:path/repo-name.git`

**取消关联** `git remote rm origin`

**推送** 

* `git push -u origin master(第一次推送所有内容)`
* `git push origin master(推送最新修改)`

**克隆** `git clone git@server-name:path/repo-name.git`

**抓取分支** `git checkout -b dev origin/dev`

**本地更新** `git pull`

## 三、分支操作
**查看分支**  `git branch`

**创建分支** `git branch <name>`

**切换分支** `git checkout <name>`

**创建+切换分支** `git checkout -b <name>`

**合并到当前分支** `git merge <name>`

**删除分支** `git branch -d <name>`

**查看分支合并情况** `git log –graph –pretty=oneline –abbrev-commit`

## 四、代码冲突
1.保留生产服务器上所做的改动,仅仅并入新配置项, 处理方法如下:

```    
git stash
git pull
git stash pop
git diff -w +文件名 //确认代码自动合并的情况
```

2.反过来,如果希望用代码库中的文件完全覆盖本地工作版本. 方法如下:

```
git reset --hard
git pull
```
