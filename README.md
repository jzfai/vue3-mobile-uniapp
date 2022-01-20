# vue3-mobile-uniapp


> vue3-mobile-uniapp提供企业级的开发demo

本架构使用的技术为：vue3(setup-script)+vite2+uniapp 的新一代的移动端框架，It's easy and fast!

使用 eslint+prettier+gitHooks 格式和校验代码,提高代码规范性和开发效率

使用最先进的包管理工具pnpm


## 提示
现在uniapp cli 方式已经可以用vue3+vite2构建了, 
我这边测试了三端：h5, 小程序， 和app
基础构建没有问题，
目前已测试的功能：vuex，发送req，跳转，接收跳转的参数，svg-icon(h5中可以用)
然后就是：
uview-ui": "2.0.20", 目前还不支持vue3


## 更新日志

---请查看架构文档

- [真香定律！带你用vue3+vite2撸后台（系列文章入口）](https://juejin.cn/post/7036302298435289095)


## 文档

- [真香定律！带你用vue3+vite2撸后台（系列文章入口）](https://juejin.cn/post/7036302298435289095)

## 线上体验

[github address](https://github.com/jzfai/vue3-mobile-uniapp.git)

[Access address](http://8.135.1.141/vue3-mobile-uniapp)

github 地址：  https://github.com/jzfai/vue3-mobile-uniapp.git

国内体验地址：http://8.135.1.141/vue3-mobile-uniapp


## 例子

![uniapp-demo](http://8.135.1.141/file/images/uniapp-demo.png)

## 相关项目

相关架构有ts和js版本

- js版本：[vue3-mobile-uniapp](https://github.com/jzfai/vue3-mobile-uniapp.git)
- ts版本：[vue3-mobile-uniapp](https://github.com/jzfai/vue3-mobile-uniapp.git)
- pc plus版本：[vue3-element-plus](https://github.com/jzfai/vue3-mobile-uniapp.git)
- pc react版本： [react-admin-template](https://github.com/jzfai/react-admin-template.git)
- java微服务后台数据：[micro-service-plus](https://github.com/jzfai/micro-service-plus)

> 开发和使用感受：两个字 真香！！！！！

vue3和vue2在性能上的对比

- 打包大小减少41%

- 初次渲染快55%, 更新渲染快133%

- 内存减少54%

- **使用Proxy代替defineProperty实现数据响应式**

- **重写虚拟DOM的实现和Tree-Shaking**


## 构建步骤

```bash
# 克隆项目
git clone https://github.com/jzfai/vue3-mobile-uniapp.git

# 进入项目目录
cd  vue3-mobile-uniapp

# pnpm address https://pnpm.io/zh/motivation
# 安装依赖(建议用pnpm)
# 你可以使用 "npm -g i pnpm" 去安装pnpm
pnpm i

# 启动h5
pnpm run dev:h5

# 启动 微信
pnpm run dev:mp-weixin
```


## 其它

```bash
# 代码格式检查并自动修复
pnpm run lint
```


## 额外

架构开发不易，如果感觉好，请给我点个 start ，架构还在不断完善中，欢迎加入我开发，一起成为Contributors ！！！！

## 浏览器支持

注意：vue3不在支持IE浏览器
Modern browsers and Internet Explorer 11+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
|Edge| last 2 versions| last 2 versions| last 2 versions

## 讨论和交流(含vue3+ts视频教程)
[WeChat group](http://8.135.1.141/file/images/wx-groud.png)

## 版本

[MIT](https://github.com/jzfai/vue3-mobile-uniapp/blob/master/LICENSE) license.

Copyright (c) 2021-present  kuanghua



