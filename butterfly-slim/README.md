# butterfly.js
`butterfly.js`补全计划

## 使用指南

请确保 [npm](https://www.npmjs.com/), [bower](http://bower.io/), [gulp](http://gulpjs.com/), [git](https://git-scm.com/) 已经安装完成。


1. `git clone` 到本地
2. `cd` 到 `git` 目录下，执行`npm install`
3. 执行`bower install`
4. 执行`gulp`，进行开发

## 注意事项

目前只配置了 butterfly.js 必须的依赖包，如：underscore.js, backbone.js, zepto.js(这里用 zepto.js 代替 jquery), require.js, require-text.js。

**需要注意的是：由于 butterfly.js 使用的是 zepto.js ，但是 backbone.js 需要依赖 jquery。这里找到 backbone.js 对其依赖进行修改：**

找到`buile -> lib -> bower_components -> backbone -> backbone.js` 

```javascript
(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });
```
将`jquery ` 改成`zepto`:

```javascript
define(['underscore', 'zepto', 'exports'], function(_, $, exports) {
```
## 开发流程
### 目录结构

```
//目录结构
project
  ┣css           **放置css文件
  ┣js            **放置js文件
  ┃ ┣ ...
  ┃ ┗main.js     **不同的view对应的js文件
  ┣lib           **所依赖的库和文件
  ┣views         **放置html文件，这里将每个html对应的页面称为view
  ┃ ┣ ...
  ┃ ┗main.html   **首页html，这个必须存在，不能重命名
  ┗index.html    **主入口文件
```

### data-view
在 index.html 中，可以通过修改`data-view`的值使用不同的view模式：

```html
<!-- index.html -->

<div id="main" data-view="$StackView"></div> 
	
<!-- 有 $StackView 和 $SingleView 两种 -->
```

在 butterfly.js 中出现`data-view`，就会被识别并加载其对应的 js 文件。如上：`data-view="$StackView"` 则会加载`$StackView`，这里的`$StackView`对应`buile -> lib -> js -> StackView.js`

在其他 view 中，给`data-view`赋值则会加载对应的 js 文件作为这个 view 的 `controller`：

```html
<!-- main.html -->
<div data-view="js/main" id="main-page" class="views">
	<!-- 业务代码写在这里 -->
</div>
``` 
在 main.html 中，对`data-view`的值：`js/main`，则会加载`buile -> js -> main.js` 作为这个 view 的 `controller`。`id`作为 view 的唯一标识，`class`为 view 添加公有样式。

**在 butterfly.js 中运行的开始，会默认加载 views -> main.html 作为首页的 view。**

### view的结构
```javascript
// main.js
define(['butterfly/view'], function(View){   // define([], function(){}) 是 AMD 的加载规范
  return View.extend({                       // 继承 butterfly.js 的 View 使这个main-view 具有 butterfly-view 的属性和功能 
  	el: '#main-page',
  	events: { },                             // events 系统，想去参考 backbone 文档
  	initialize: function () {                // initialize, render, onShow 是常用的 view 的生命周期函数，在加载 view 的时候，会按顺序执行。其次还有 onHide，会在 view 移除的时候执行。

  	},
    render: function(){                      // 整个 view 用的是对象字面量的格式，尤其需要关注 this 的用法

    },
    onShow: function(){
    
    }
  });
});
```
### 功能组件
####navigate
```javascript
Backbone.history.navigate('#/views/a'); 
```
功能与 `location.href = '#/views/a'`相同。
****
####data-action="goBack"
```html
<a data-action="back">返回</a>
```
与`window.history.back()`相同。
*必须是 a 标签*
****
####dialog
```javascript
this.showDialog({
  text: '你好吗？',                   //显示文字
  type: 'confirm',                  //只有 confirm 和 alert，默认是 alert
  success: function () {            //点击确定后执行的函数
    console.log('confirm')
  }.bind(this)
});
```
****
####loading
```javascript
this.showLoading();                // 展示 loading
this.hideLoading();                // 移除 loading
```
## Todo

1. <del>用于构建项目的基础 css 还没有添加，这里可以能要根据项目需要添加：ratchet, bootstrap 或者 normalize.css。</del>
2. 诸如 iscroll.js, fastclick 的基础库也没有进行添加，这个需要根据项目需求。
3. <del>只移植了 butterfly.js 的 view, stackview 模块，诸如：notification.js 等工具类，打算重新进行编写。( modal 类)</del>
4. gulp 任务，<del>未来应该会增加 browserSync 的支持</del>和更高级 e2e, 单元模块测试，增加生产任务，将 js, css, image 进行自动生产压缩(由于 butterfly.js 运用了 require.js 这里是难点，待解决)。 
5. 未来会考虑使用 sass 来更加科学地构建项目 css (更好维护)，mustache 作为 html 模版(实在受够了 underscore 的模版了，个人感觉十分难阅读，而且勾起了我 asp 的不愉快回忆，可选项：jade，但是 jade 需要 node 来编译，可能要在 gulp 添加自动化任务)。
6. 重构 butterfly.js 框架。