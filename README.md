# hapi-github-auth
GitHub Authentication for Hapi.js (v17+)

😄

我们提供了可以直接运行的示例，在 `/example` 目录下面。

demo 运行方法：

1. 配置 Client ID 和 Client Secret
2. 在根目录下执行 `node /example/server.js` 即可快速启动
3. 访问 `http://localhost:3001/login`
4. 访问返回的 url 地址，成功授权后，即可看到授权账号的公开用户信息。

## 插件使用方法

### setp1: 

在 [ github ](https://github.com/settings/developers) 中新建APP,获取Client ID 和 Client Secret。

### step2:

在您的 Hapi.js 项目中下载该插件。

```sh
npm install hapi-github-auth
```

### step3:

在您的 Hapi.js 项目中引入此插件并且注册。

```js
// 授权成功后的处理方法
const github_handler = require('./github_handler.js')

// 配置插件
const plugins = [{
    plugin: require('hapi-github-auth'),
    options: {
        SCOPE: 'user',
        handler: github_handler,
        BASE_URL: 'http://localhost:3001',
        GITHUB_CLIENT_ID: 'your github client id',
        GITHUB_CLIENT_SECRET: 'you githun client secret',
        GITHUB_AUTH_REDIRECT_URL: '/github_auth',
        PORT: 3001,
        GITHUB_HOSTNAME: 'github.com',
        GITHUB_API_HOSTNAME: 'api.github.com'
    }
}]

// ...

// 将插件注册到server中
await server.register(plugins)
```

### step4:

在您的项目中添加一个路由，用来获取 github 授权登录的 url 地址

```js
const loginRouter = [{
    path: '/login',
    method: 'get',
    handler: function (req, h) {
        // 点击这个url 就到    github 授权登录的页面
        var url = require('hapi-github-auth').plugin.login_url();
        return {
            url
        }
    }
}]
```

### step5:

授权登录成功后，可以获得 access_token、用户信息等。在您配置的 handler 里面继续处理后面的逻辑即可。

```js
// github_handler.js
const github_handler = function (req, h, access_json_token, userinfo) {
    // your handler ...
    return {
        access_json_token,
        userinfo
    }
}
module.exports = github_handler
```

## 配置项说明：

---

`SCOPE`: 授权方法

`handler`: 授权成功后的回调方法

`BASE_URL`:  项目基础url, 比如,'http://localhost:3001'

`GITHUB_CLIENT_ID`: your github client id

`GITHUB_CLIENT_SECRET`: your githun client secret

`GITHUB_AUTH_REDIRECT_URL`: 授权成功后的路径。 如,'/github_auth'

`PORT`: 项目端口号， 如，3001

`GITHUB_HOSTNAME`: 'github.com'

`GITHUB_API_HOSTNAME`: 'api.github.com

---

## issue

遇到问题可以直接提 issue 。

## 国际化

目前文档只有中文，有兴趣的同学可以 pr 英文文档哦。

## other

special give thanks to dwyl orgnization.

inspire from @dwyl