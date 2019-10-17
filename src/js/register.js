$(() => {

    /* 测试数据 */
    $("#usernameID").val("dddd");
    $("#passwordA,#passwordB").val("123456");
    $("#phoneID").val("13809739550");
    $("#msgCode").val("999");
    $("#emailID").val("813656523@qq.com");

    //验证用户名
    $("#usernameID").keyup(function () {
        let val = $(this).val().trim();
        if (/^\w{4,20}$/.test(val)) {
            $(".tips").removeClass("block");
        } else {
            $(".tips").addClass("block");
            $(".tips").children().text(`4-40位字符，支持汉字、字母、非纯数字及"-"、"_"、"."、"@"组合`);
        }
    });

    //验证密码
    $("#passwordA").keyup(function () {
        let val = $(this).val();
        if (/^[0-9a-zA-Z]{6,20}$/.test(val)) {
            $(".tips").removeClass("block");
        } else {
            $(".tips").addClass("block");
            $(".tips").children().text("密码是由6－20位字符组成，建议由字母、数字和符合两种以上组合");
        }
    });

    $("#passwordB").blur(function () {
        let val = $(this).val();
        let targetVal = $("#passwordA").val().trim();
        /* 监听输入框失去焦点的事件，当输入框失去焦点的时候获取当前的内容和第一次输入的密码进行匹配 */
        if (targetVal === val) {
            $(".tips").removeClass("block");
        } else {
            $(".tips").addClass("block");
            $(".tips").children().text("您两次输入的密码不一致");
        }
    });

    //验证手机
    $("#phoneID").keyup(function () {
        let val = $(this).val().trim();
        if (/^1[3-9]\d{9}$/.test(val)) {
            $(".tips").removeClass("block");
        } else {
            $(".tips").addClass("block");
            $(".tips").children().text("完成验证后，你可以用该手机号登录或找回密码");
        }
    });

    /* 集成图像验证码 */
    let captcha1 = new CaptchaMini({
        fontSize: 30,
        length: 4,
        lineNum: 3,
        dotNum: 10
    });
    let imgCode;
    captcha1.draw(document.querySelector('#captcha'), r => {
        console.log("验证码 = " + r);
        imgCode = r;
        $("#captcha").prev().val(imgCode);
    });

    /* 给手机号码发送短信： */
    let randomNumber;

    function getRandom(min, max) {
        return parseInt(Math.random() * (max - min + 1)) + min
    }

    randomNumber = 999;
    $("#smsSend").click(function () {
        $("#phoneID").trigger("keyup");
        let flag = $(".tips").hasClass("block");

        /* 如果flag的值是flase,那么我们就调用第三方平台发请求 发短信 */
        if (flag) return;

        // randomNumber = getRandom(1000, 9999);
        // $.ajax({
        //     type: 'post',
        //     url: 'http://route.showapi.com/28-1',
        //     dataType: 'json',
        //     data: {
        //         "showapi_appid": '91032', //这里需要改成自己的appid
        //         "showapi_sign": 'd57b19c8d2d44aef94aee464768a38d8', //这里需要改成自己的应用的密钥secret
        //         "mobile": $("#phoneID").val(),
        //         "content": `{"name":"文顶顶","code":${randomNumber},"minute":"3","comName":"脑子进水集团"}`,
        //         "tNum": "T150606060601",
        //     },
        //     success: (result) => console.log(result)
        // });
    });

    //同意服务协议
    $(".checkbox").click(() => {
        if (!$(".checkbox").is(":checked")) {
            $("#agreement").text("*请阅读并勾选服务协议");
            $(".registerBtn").css("background-color", "#DDDDDD");
            return;
        } else {
            $("#agreement").text("");
            $(".tongyi").css("background-color", "#ffffff");
            $(".registerBtn").css({
                "background-color": "#EE2737",
                "cursor": "pointer"
            });
        }
    });

    /* 注册按钮的处理： */
    /* 检查表单验证通过 && 图像验证码 && 手机短信验证码 && 是否勾选协议  把页面数据作为参数提交给服务器： */
    $(".registerBtn").click(function () {

        $("#usernameID").trigger("keyup");
        $("#passwordA").trigger("keyup");
        $("#passwordB").trigger("blur");
        $("#phoneID").trigger("keyup");

        if (!$(".checkbox").is(":checked")) {
            $(".tongyi").css("background-color", "#EEEFEF");
            return;
        }
        if ($(".tips").hasClass("block")) return;

        console.log(111);

        // if ($(".form-group-error").length != 0) return;


        /* 发请求给服务器  注册： */
        $.ajax({
            type: "post",
            url: "../server/register.php",
            data: `username=${$("#usernameID").val()}&password=${$("#passwordA").val()}&phone=${$("#phoneID").val()}&email=${$("#emailID").val()}`,
            dataType: "json",
            success: function (response) {
                /* 注册成功： */
                console.log(response, response.status);

                if (response.status == "ok") {
                    console.log("++++");

                    /* 跳转到首页 */
                    // window.location.href = "http://127.0.0.1/1910/32/jianke/src/html/home.html";
                    alert("注册成功");
                } else {
                    /* 注册失败： */
                    alert(response.msg);
                }
            }
        });
    })







});