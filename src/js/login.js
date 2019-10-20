$(() => {
    $(".header").load("./header.html");
    $("footer").load("./footer.html");
    
    // 点击切换
    $(".loginTabsItem").click(function () {
        /* 设置当前标签选中，并且排它处理 */
        $(this).addClass("active").siblings().removeClass("active");
        $(".loginBy").eq($(this).index()).addClass("block").siblings().removeClass("block");
    })

    /* 集成图像验证码 */
    let captcha1 = new CaptchaMini({
        fontSize: 30,
        length: 4,
        lineNum: 3,
        dotNum: 10
    });
    let imgCode1;
    captcha1.draw(document.querySelector('#captcha1'), r => {
        console.log("账户登录的验证码 = " + r);
        imgCode1 = r;
        $("#captcha1").prev().val(imgCode1);
    });

    let captcha2 = new CaptchaMini({
        fontSize: 30,
        length: 4,
        lineNum: 3,
        dotNum: 10
    });
    let imgCode2;
    captcha2.draw(document.querySelector('#captcha2'), r => {
        console.log("手机登录的验证码 = " + r);
        imgCode2 = r;
        $("#captcha2").prev().val(imgCode2);
    });


    //登录按钮的点击事件
    $(".loginBtn").click(function () {
        let usernameVal = $("#usernameID").val();
        let passwordVal = $("#passwordID").val();

        $.ajax({
            type: "post",
            url: "../server/login.php",
            data: `username=${usernameVal}&password=${passwordVal}`,
            dataType: "json",
            success: function (response) {
                console.log(111);

                /* 登录成功 */
                if (response.status == "success") {
                    /* 跳转到首页 */
                    // window.location.href = "http://127.0.0.1/1910/32/jianke/src/html/home.html";
                    alert("登录成功");

                } else {
                    /* 注册失败： */
                    alert(response.msg);
                }

            }
        });

    })

});