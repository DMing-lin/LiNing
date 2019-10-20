$(() => {
    $(".header").load("./header.html");
    $("footer").load("./footer.html");
    // $(".showNewL").click(function () {
    //     $(".showNew").children().eq(0).animate({
    //         left: "-=330px"
    //     })
    //     console.log(111);
    // });
    // $(".showNewR").click(function () {
    //     $(".showNew").children().eq(0).animate({
    //         left: "+=330px"
    //     })
    //     console.log(222);
    // });

    // 5场馆
    $(".fiveVanue a").hover(function () {
        $(this).children("img").animate({
            left: "-=15px"
        }, 200)
    }, function () {
        $(this).children("img").animate({
            left: "+=15px"
        }, 200)
    });

    // hot style 爆款推荐
    $.getJSON("../server/hotStyleDate.json", (data) => {
        data.forEach(element => {
            var hotStylemanager = new hotStyleManager(element);
            hotStylemanager.init();
        });
    });

    $(".hotStyleTabs").eq(0).children("a").addClass("active");
    $(".hotStyleList").eq(0).addClass("block");

    class hotStyleManager {
        constructor(data) {
            this.data = data;
            this.root = null;
        }
        init() {

            this.renderhotStyleUI();
            this.eventHandler();
        }
        renderhotStyleUI() {
            let hotStyleTabs = this.renderhotStyleTabs();
            let hotStyleList = this.renderhotStyleList();
            $(".hotStyleTabs").append($(hotStyleTabs));
            $(".hotStyle").append($(hotStyleList));

            // $(".F111").append($(hotStyleTabs));
            // $(".F11").append($(hotStyleList));

            // $(".F222").append($(hotStyleTabs));
            // $(".F22").append($(hotStyleList));

            // $(".F333").append($(hotStyleTabs));
            // $(".F33").append($(hotStyleList));

            // $(".F444").append($(hotStyleTabs));
            // $(".F44").append($(hotStyleList));

            // $(".F555").append($(hotStyleTabs));
            // $(".F55").append($(hotStyleList));
        }


        renderhotStyleTabs() {
            let reshotStyleTabs = "";
            for (let i = 0, len = this.data.tabs.length; i < len; i++) {
                reshotStyleTabs += `<li><a href="">${this.data.tabs[i]}</a></li>`;
            }
            return `<ul>${reshotStyleTabs}</ul>`
        }

        renderhotStyleList() {
            let reshotStyleList = "";
            for (let i = 0, len = this.data.list.length; i < len; i++) {
                //每个 tabs
                let res1 = "";
                this.data.list[i].map(ele => {
                    //每个格子
                    let res2 = "";
                    for (let k = 0, len2 = ele.src.length; k < len2; k++) {
                        res2 += `<img src="${ele.src[k]}" alt="">`
                    }
                    // console.log(res2);
                    res1 += `<li><div class="hotStyleListC"><a href="">${res2}</a></div><div class="hotStyleListR">${res2}</div><div class="hotStyleListFooter"><a href=""><p>${ele.price}</p><p>${ele.title}</p></a></div></li>`
                });
                // console.log(res1);
                reshotStyleList += `<div class="hotStyleList"><ul>${res1}</ul></div>`
            };
            // console.log(reshotStyleList);
            return reshotStyleList;
        }
        eventHandler() {
            $(".hotStyleTabs a").mouseenter(function () {
                $(".hotStyleTabs a").removeClass("active");
                $(this).addClass("active");
                let index = $(this).parent("li").index();
                $(".hotStyleList").eq(index).addClass("block").siblings().removeClass("block");
            });

            // $(".hotStyleListR img").mouseenter(function () {
            //     let index = $(this).index();
            //     $(this).parent(".hotStyleListR").prev().children("img").eq(index).addClass("block").siblings().removeClass("block");
            //     $(".hotStyleListC").html(this);
            // });

        }
    }















});