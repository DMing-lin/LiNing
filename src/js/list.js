// let pages = document.getElementById('pages');
let ipage = 1; //获取第一页数据
let num = 25; //每页显示5条

// 渲染数据

$(() => {
    function init() {
        console.log(1);

        function creat(arr) {
            console.log(arr);
            let html = arr.data.map(item => {
                return `<li data-guid="${item.uid}"><img src="${item.img}" alt=""><div><p>${item.name}</p><span>￥ ${item.price}.00</span></div></li>`;
            }).join('');
            $("#thingList").html(html);

            // 渲染页码
            // let total = Math.ceil(arr.total / arr.num);
            // let spanstr = '';
            // for (let i = 0; i < total; i++) {
            //     spanstr += `< a href=" ">${i + 1}</ a>`;
            // }
            // $("pages").html(spanstr);
            // pages.innerHTML = spanstr;
            // pages.children[ipage - 1].className = 'active';
        }
        $.ajax({
            type: 'get',
            url: '../server/paging.php',
            data: {
                page: ipage,
                num: num
            },
            success: str => {
                let arr = JSON.parse(str);
                console.log(arr);
                creat(arr);
            }
        });

    }
    init();
})