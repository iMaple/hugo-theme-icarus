---
title: "Readme"
author: ""

description: ""
tags: ["blog", "icarus"]
keywords: []
categories: ["配置"]
cover: "https://raw.githubusercontent.com/iMaple/imaple.github.io/assets/img/c287d3e60959bec52b33306c65e04770-135b5c.webp"
thumbnail: "https://raw.githubusercontent.com/iMaple/imaple.github.io/assets/img/04eddfdc33c7a770b55bf4e714387384-bcb3e7.webp"

toc: true
comment: false
donate: false

date: 2020-09-28T15:18:00+08:00
lastmod: 2020-09-28T15:18:00+08:00

draft: false

---

A blog theme for Hugo

> 主题移植自 [hexo-theme-icarus](https://github.com/ppoffice/hexo-theme-icarus)

<!--more-->

## 预览

![预览](https://raw.githubusercontent.com/iMaple/imaple.github.io/assets/img/1ff999fb344da440c0828deaef6928c2-3421ed.webp)

## 安装

> 请参阅相关[官方文档](https://gohugo.io/getting-started/quick-start/#step-3-add-a-theme)

简要步骤：

1. 创建站点

   ```bash
   hugo new site blog
   cd blog
   git init
   ```
   
2. 加载主题

   ```shell
   git submodule add https://github.com/iMaple/hugo-theme-icarus.git themes/icarus
   cp -r themes/icarus/exampleSite/* .
   ```

   删掉站点根目录下的 `config.toml` 文件（如果存在该文件）。

   ```
   rm -rf config.toml
   ```

3. 新建文章

   ```
   hugo new posts/hello.md
   ```

4. 启动本地服务

   ```
   hugo server -D
   ```

## 配置

> 请参阅原主题[相关文档](https://blog.zhangruipeng.me/hexo-theme-icarus/Configuration/icarus-user-guide-configuring-the-theme/)

~~TODO~~

## 更新

在站点根目录下，

```shell
cd themes/icarus
git pull
```


