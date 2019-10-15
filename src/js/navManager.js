class Manager {
    constructor(data) {
        this.data = data;
        this.root = null;
    }
    init() {
        this.renderUI();
        // this.eventHandler();
    }
    renderUI() {
        let navLi = this.renderNav();
        let navList = this.renderNavList();
        $(".navListWrapper").html($(navList));
    }
    renderNav() {
        let navLi = "";
        for (let i = 0, len = this.data.tabs.length; i < len; i++) {
            navLi += `<li><a href=""><span>${this.data.tabs[i]}</span><div class="sanjiao"></div></a></li>`;
            console.log(navLi);


        }
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
}