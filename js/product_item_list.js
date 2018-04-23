$(document).ready(function () {


    var arrProductImage = [
        ["1.jpg", "7 Thói Quen Của Bạn Trẻ Thành Đạt (Tái Bản)_Nhà Xuất Bản Tổng hợp TP.HCM_Nhà Sách Tiki Sách tiếng Việt Sách kỹ năng - Sống đẹp Sách tư duy - Kỹ năng sống_small"],
        ["2.jpg", "Dám Nghĩ Lớn! (Tái Bản 2016)_Nhà Xuất Bản Tổng hợp TP.HCM_Nhà Sách Tiki Sách tiếng Việt Sách kinh tế_small"],
        ["3.jpg", "Thám Tử Lừng Danh Conan (Tập 93)_Nhà Xuất Bản Kim Đồng_Nhà Sách Tiki Sách tiếng Việt Truyện Tranh, Manga, Comic_small"],
        ["4.jpg", "Bạn Đỡ Ngu Ngơ Rồi Đấy_Nhà Xuất Bản Thế Giới_Nhà Sách Tiki Sách tiếng Việt Sách kỹ năng - Sống đẹp Sách tư duy - Kỹ năng sống_small"],
        ["5.jpg", "Cẩm Nang Tự Học IELTS_Nhà Xuất Bản Thế Giới_Nhà Sách Tiki Sách tiếng Việt Sách Học Ngoại Ngữ_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"]



    ];


    var numberOfItemsInOnePage = 8;

    var size = arrProductImage.length

    var numberOfPage = Math.ceil((size / numberOfItemsInOnePage));

    var currentPage = 1;

    var five_pages = [1, 2, 3, 4, 5]
    // PHAN TRANG

    for (let i = 0; i < numberOfPage; i++) {
        let btnAdd_Checkout = $('<button type="button"></button>')
            .text(i + 1)
            .css({
                "margin": "0px 5px"
            })
            .addClass("btn btn-outline-dark btn-sm");

        if (i >= 5) {
            btnAdd_Checkout.css("display", "none")
        }

        $(".btn-divide-page").children("button:last").before(btnAdd_Checkout);
    }


    if (numberOfPage <= 1) {
        generateItemList(0, size)
        $(".btn-divide-page").css("display", "none")
    } else {
        generateItemList(0, numberOfItemsInOnePage)
        $(".btn-divide-page").css("display", "block")
        $(".prev").prop('disabled', true);
        $(".btn-divide-page > button:nth-child(2)").addClass("active");
    }


    $(".btn-divide-page .btn").click(function () {

        let pageIndex = currentPage + 1;
        $(".btn-divide-page > button:nth-child(" + pageIndex + ")").removeClass("active");

        var obj = $(this);
        var prev = $(".prev")
        var next = $(".next")

        $(".container-flexbox").empty();

        let begin, end;

        if (obj.is(prev)) {
            currentPage--;
        } else if (obj.is(next)) {
            currentPage++;
        } else {
            currentPage = parseInt(obj.text());
        }


        pageIndex = currentPage + 1;
        $(".btn-divide-page > button:nth-child(" + pageIndex + ")").addClass("active");


        if (numberOfPage > 5) {

            var midIndex;
            for (let i = 0; i < 5; i++) {
                if (five_pages[i] == currentPage) {
                    midIndex = i;
                    break;
                }
            }

            if (midIndex == 0 && five_pages[0] > 2) {
                hide_showExtraBtn_after(2)
            } else if (midIndex == 1 && five_pages[0] > 1) {
                hide_showExtraBtn_after(1)
            } else if (midIndex == 3 && currentPage < numberOfPage - 1) {
                hide_showExtraBtn_before(1)
            } else if (midIndex == 4 && currentPage < numberOfPage - 1) {
                hide_showExtraBtn_before(2)
            }

        }


        if (currentPage >= 2) $(".prev").prop('disabled', false);
        else $(".prev").prop('disabled', true);

        if (currentPage == numberOfPage) $(".next").prop('disabled', true);
        else $(".next").prop('disabled', false);


        end = currentPage * numberOfItemsInOnePage;
        begin = end - numberOfItemsInOnePage;

        if (end >= size) end = size;


        generateItemList(begin, end);

    });


    function hide_showExtraBtn_after(lvl) {
        for (let i = 0; i < lvl; i++) {
            for (let i = 0; i < 5; i++)
                five_pages[i]--;

            $(".btn-divide-page > button:nth-child(" + five_pages[0] + ")").next().css("display", "inline-block");
            $(".btn-divide-page > button:nth-child(" + five_pages[4] + ")").next().next().css("display", "none ");
        }
    }

    function hide_showExtraBtn_before(lvl) {
        for (let i = 0; i < lvl; i++) {
            for (let i = 0; i < 5; i++)
                five_pages[i]++;

            $(".btn-divide-page > button:nth-child(" + five_pages[0] + ")").css("display", "none");
            $(".btn-divide-page > button:nth-child(" + five_pages[4] + ")").next().css("display", "inline-block");
        }
    }

    function generateItemList(begin, end) {
        for (let i = begin; i < end; i++) {

            let image = "resources/imgs/small/" + arrProductImage[i][0];
            let title = arrProductImage[i][1].split("_");

            let imageTag = $('<span></span>').append($('<img src=' + image + ' ></img >')).addClass("image");
            let titleTag = $('<span></span>').text(title[0]).addClass("title");
            let priceTag = $('<h4></h4>').text("20.000 đ").css("color", "orange");
            let btnAdd_Checkout = $('<button></button>')
                .text("Thêm vào giỏ hàng")
                .css({
                    "display": "none",
                    "width": "100%"
                })
                .addClass("btn btn-warning");

            let aTag = $('<a></a>').append(imageTag, titleTag, priceTag, btnAdd_Checkout);

            let divTag = $('<div></div>').append(aTag).addClass("box")
                .css({
                    "background": "white",
                    "width": "23%",
                    "padding": "0px 10px"
                })
                .hover(function () {
                    $(this).css("box-shadow", "0 0 20px rgba(0,0,0,.3)");
                    $(this).children().children("button").css("display", "block");

                }, function () {
                    $(this).css("box-shadow", "initial");
                    $(this).children().children("button").css("display", "none");
                });
            $(".container-flexbox").append(divTag);
        }

    }


});