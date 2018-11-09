# Myblog
node(express框架)+mysql+bootstrap的博客demo

## 安装
+ 保证安装了node
+ 若没有下载node_modules则先
	
		`npm install 安装项目所需的包`

## 数据库
+ docs文件夹下有sql文件,打开mysql客户端(各种可视化客户端均可),运行sql文件,导入数据库结构,可自己预先填入部分数据



## 运行项目

+ 项目入口文件 app.js，项目目录下按住shift+右键,选择在此处打开命令窗口(或powershell)



		node app.js
	
		//安装有nodemon的可用nodemon运行
	
		nodemon app.js


## 完成功能

- [x] 首页列表渲染
- [x] 首页列表分页功能
- [x] 注册功能(密码加密)
- [x] 登录功能
- [x] 注销功能
- [x] 发布文章(支持Markdown)
- [x] 编辑文章
- [x] 显示文章详情
- [ ] 搜索功能
- [ ] 删除文章功能
- [ ] 发布问题 

