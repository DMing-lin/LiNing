class Manager {
    constructor(data) {
        this.data = data;
        this.root = null;
    }
    init() {
        this.renderUI();
        this.eventHandler();
    }
    renderUI() {
        let navLi = this.renderNavLi();
        let navList = this.renderNavList();
        $(".nav").append($(navLi));
        $(".navListWrapper").html($(navList));
    }

    renderNavLi() {
        let resNavLi = "";
        for (let i = 0, len = this.data.tabs.length; i < len; i++) {
            resNavLi += `<li><span class="shu"></span><a href=""><span>${this.data.tabs[i]}</span><div class="sanjiao"></div></a></li>`;
            // console.log(resNavLi);
        }
        return resNavLi;
    }
    renderNavList() {
        let res = "";
        for (let i = 0, len = this.data.list.length; i < len; i++) {
            //每个 tab
            let res1 = "";
            this.data.list[i].map(ele => {
                let res2 = "";
                for (let k = 0, len2 = ele.list2.length; k < len2; k++) {
                    res2 += `<li><a href="">${ele.list2[k]}</a></li>`
                    // console.log(res2);                       
                }
                res1 += `<ul><li><a class="big" href="">${ele.types}</a></li>${res2}</ul>`
                // console.log(res1);
            });

            res += `<div class="navList">${res1}</div>`
            // console.log(res);
        };
        return res;
    }

    eventHandler() {
        $(".nav li").hover(function () {
            $(this).toggleClass("active");
            let index = $(this).index();

            $(".navListWrapper").toggleClass("block");
            $(".navListWrapper").children().eq(index - 1).toggleClass("block");
        })
        // self.root.find(".navListWrapper").eq(index).addClass("current").siblings().removeClass("current");

        // $(this).css("background", self.data.color).siblings().css("background", "#fff");


    }
}