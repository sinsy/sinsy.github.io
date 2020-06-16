## 常用语句
`git init`

`git checkout --orphan gh-pages`

`git remote add origin https://github.com/username/jekyll_demo.git`

`git push origin gh-pages`

`jekyll new blog`

`jekyll server --watch`

## jekyll安装参考文档
1. [搭建一个免费的，无限流量的Blog----github Pages和Jekyll入门](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)
2. [配置jekyll安装环境与部署博客网站](https://www.jianshu.com/p/58f19083138f)

## 目录结构
* _includes 页面的局部模块，通过`{% include head.html %}`引入
  * footer.html : 底部模块
  * head.html : xxx.html>head标签模块
  * sidebar.html : 侧边栏模块
  * social.html : 社交模块 
* pages 页面
  layout页面里的引用 {content}, pages模块下单页面的头部代码（与layout页面创建联系）
  ```
  ---
  layout: default #对应的layout模块
  title: blog #标题
  permalink: /blog/ #对应的链接跳转
  ---
  ```
  * blog.html : 当链接为/blog/#xxx引用blog.html文件内容，为博客文章， layout: default
  * demo.html : 暂时不用，以后可以扩展为代码模块的展示，layout: default
  * tags.html : 标签页面，layout: default
  * resume.html : 简历，layout: resume
* _layouts 页面布局
  * default.html : 文章列表展示页面
  * index.html : 首页
  * post.html : 文章内容页面
  * resume.html : 简历
* _posts 文章目录
  ```
  ---
  layout: post  #对应的layout模块
  title: Chrom安装vue-devtools工具 #标题
  date:  2020-06-15 #日期
  category: 前端 #目录
  tags: [浏览器,工具] #标签
  ---
  ```
  * frontend : 前端模块文章
  * resource : 其他模块文章

* _sass 模块局部样式文件

* css 引入_sass文件夹文件

* 总目下的index.html： layout: index

