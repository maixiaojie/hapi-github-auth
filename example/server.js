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
        GITHUB_CLIENT_ID: '46c59fe3e7027e438a7c',
        GITHUB_CLIENT_SECRET: '5f834d9347cbb684c649ca670a02d9aa2d1886fa',
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