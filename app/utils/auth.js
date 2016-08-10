/**
 * Created by tracy on 16/8/9.
 */
var $=require('../../bower_components/jquery/dist/jquery');
module.exports = {
    login(email, pass, cb) {
        cb = arguments[arguments.length - 1];
        if (document.cookie) {
            if (cb) cb(true)
            this.onChange(true)
            return
        }
        loginRequest(email, pass, (res) => {
            if (res.authenticated) {
                // localStorage.token = res.token
                document.cookie = "token=" + res.token;
                if (cb) cb(true)
                this.onChange(true)
            } else {
                if (cb) cb(false)
                this.onChange(false)
            }
        })
    },

    logout(cb) {
        delete document.cookie
        if (cb) cb()
        this.onChange(false)
    },

    loggedIn() {
        return !!document.cookie;
    },

    onChange() {},
    getToken() {
        var tokens  = document.cookie.split('=');
        return tokens[1];
    }

}

function loginRequest(email, pass, cb) {
    var info = {};
    info.username = email;
    info.password = pass;
    var someurl = "http://123.56.205.244:8025/api/authentication";
    var option = {
        type: "post",
        data: info,
    };
    if (info.username && info.password) {
        $.ajax(someurl, option).done(function (data) {
            if (data.status == 1) {
                cb({
                    authenticated: true,
                    token: data.accessToken
                })
            } else if(data.status == -1){
                cb({ authenticated: false })
            }else{
                console.log(data)
            }
        }).fail(function (xhr, status) {
            alert();
            // console.log(status);
            //ajaxLog('失败: ' + xhr.status + ', 原因: ' + status);
        }).always(function () {
            // console.log("成功");
            // ajaxLog('请求完成: 无论成功或失败都会调用');
        });
    }
}

