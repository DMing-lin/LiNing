$(() => {
    new Promise(function (resolve, reject) {
        $.ajax({
            type: "get",
            url: "../server/getPageCount.php",
            dataType: "json",
            success: (data) => {
                let res = "";
                for (let i = 0; i < data.count; i++) {
                    res += `<a href="javascript:;">${i + 1}</a>`
                }
                $(".pages").html(res);
                $(".pages").children().eq(0).addClass("active");

                resolve();
            }
        });
    }).then(function () {
        getDataWithPage(1, 0);
    })

    /* type ==0 默认排序  id */
    /* type ==1 升序排列  价格 */
    /* type ==2 降序排列  价格 */
    function getDataWithPage(page, type) {
        $.ajax({
            type: "get",
            url: "../server/getGoodsData.php",
            data: `page=${page}&sortType=${type}`,
            dataType: "json",
            success: (data) => renderUI(data)
        });
    }

    function renderUI(data) {
        console.log(data);

        let html = data.map((ele) => `<li data-guid="${ele.uid}"><img src="${ele.img}" alt=""><div><p>${ele.name}</p><span>￥ ${ele.price}.00</span></div></li>`).join('');
        $("#thingList").html(html);
    }

    /* 先给页面添加点击事件，当点击的时候获取页码值，根据该值发送网络请求 */
    $(".pages").on("click", "a", function () {
        getDataWithPage($(this).text());
        $(this).addClass("active").siblings().removeClass("active");
    })

    /* 处理排序 */
    $(".typeBtn").click(function () {
        getDataWithPage(1, $(this).index());
    })






    // // 渲染数据
    // let ipage = 1; //获取第一页数据
    // let num = 20; //每页显示20条

    // function init() {
    //     // console.log(1);

    //     function creat(arr) {
    //         // console.log(arr);
    //         let html = arr.data.map(item => `<li data-guid="${item.uid}"><img src="${item.img}" alt=""><div><p>${item.name}</p><span>￥ ${item.price}.00</span></div></li>`).join('');
    //         $("#thingList").html(html);

    //         // 渲染页码
    //         let total = Math.ceil(arr.total / arr.num);
    //         let spanstr = '';
    //         for (let i = 0; i < total; i++) {
    //             spanstr += `<a href="">${i+1}</a>`;
    //         }
    //         $(".pages").html(spanstr);
    //         $(".pages").children().eq(ipage - 1).addClass("active").siblings().removeClass("active");
    //     }


    //     $.ajax({
    //         type: 'get',
    //         url: '../server/paging.php',
    //         data: {
    //             page: ipage,
    //             num: num
    //         },
    //         success: str => {
    //             let arr = JSON.parse(str);
    //             // console.log(arr);
    //             creat(arr);
    //         }
    //     });

    // }
    // init();
})