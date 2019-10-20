$(() => {
    $(".header").load("./header.html");
    $("footer").load("./footer.html");

    //获取链接中的数据
    let goodsUrlDate = window.location.search.substr(1).split('&');
    let name = goodsUrlDate[0].split("=")[1];
    let price = goodsUrlDate[1].split("=")[1];
    let picurl = goodsUrlDate[2].split("=")[1];
    // console.log(name, price, picurl);

    //用列表页的数据
    $(".imgbox img").attr("src", picurl);
    $(".imgR h3").text(name);
    $(".imgR .price span").text(price);

    //放大镜
    // 要使大图片完全可以看到，则满足比例
    // 遮罩/小图片=大图片盒子/大图片就行
    // 获取页面中的标签
    let oBox = document.querySelector(".imgbox");
    let oMinBox = document.getElementsByClassName("min_box")[0];
    let oMask = document.querySelector(".mask");
    let oMinImg = document.querySelector(".min_box img");
    let oMaxBox = document.querySelector(".max_box");
    let oMaxImg = document.querySelector(".max_box img");
    // 给盒子一个移入移出事件
    oBox.onmouseenter = function () {
        oMask.style.display = "block";
        oMaxBox.style.display = "block";
    }
    oBox.onmouseleave = function () {
        oMask.style.display = "none";
        oMaxBox.style.display = "none";
    }
    // 给遮罩一个移动事件
    oBox.onmousemove = function (e) {
        e = e || window.event;
        // 遮罩走动的距离
        let oX = e.pageX - oBox.offsetLeft - oMask.offsetWidth / 2;
        let oY = e.pageY - oBox.offsetTop - oMask.offsetHeight / 2;
        //遮罩移动的最大距离
        let oMoveX = oMinBox.offsetWidth - oMask.offsetWidth;
        let oMoveY = oMinBox.offsetHeight - oMask.offsetHeight;
        // 要使遮罩不移出去，需要做临界值判断
        if (oX >= oMoveX) {
            oX = oMoveX;

        } else if (oX <= 0) {
            oX = 0;
        }
        if (oY >= oMoveY) {
            oY = oMoveY;
        } else if (oY <= 0) {
            oY = 0;
        }
        //让遮罩跟随你鼠标走
        oMask.style.left = oX + "px";
        oMask.style.top = oY + "px";
        // 遮罩移动的距离/大图片移动的比值是一个定值
        let biliX = (oMaxImg.offsetWidth - oMaxBox.offsetWidth) / oMoveX;
        let biliY = (oMaxImg.offsetHeight - oMaxBox.offsetHeight) / oMoveY;
        // 大图片走动
        oMaxImg.style.left = -oX * biliX + "px";
        oMaxImg.style.top = -oY * biliY + "px";
    }

})