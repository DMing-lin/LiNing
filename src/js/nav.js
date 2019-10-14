$(() => {
    $.getJSON("../server/navData.json", (data) => {
        data.forEach(element => {
            var manager1 = new Manager(element);
            manager1.init();
        });
    });
    // var manager1 = new Manager()
    // manager1.init()
})

