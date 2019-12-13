
const github_handler = function (req, h, access_json_token, userinfo) {
    // your handler ...
    return {
        access_json_token,
        userinfo
    }
}
module.exports = github_handler