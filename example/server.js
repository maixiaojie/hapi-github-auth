const hapi = require('hapi')
const github_handler = require('./github_handler')

const server = new hapi.server({
    host: 'localhost',
    port: 3001,
    routes: { cors: { origin: ['*'] } }
});
const loginRouter = [{
    path: '/login',
    method: 'get',
    handler: function (req, h) {
        var url = require('../lib/index').plugin.login_url();
        return {
            url
        }
    }
}]
const plugins = [{
    plugin: require('../lib/index'),
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

server.route(loginRouter)
async function start() {
    try {
        await server.register(plugins)
        await server.start()
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
    console.log("server running at:", server.info.uri);
}
start()