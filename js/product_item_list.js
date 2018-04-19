$(document).ready(function () {


    var arrProductImage = [
        ["1.jpg", "7 Thói Quen Của Bạn Trẻ Thành Đạt (Tái Bản)_Nhà Xuất Bản Tổng hợp TP.HCM_Nhà Sách Tiki Sách tiếng Việt Sách kỹ năng - Sống đẹp Sách tư duy - Kỹ năng sống_small"],
        ["2.jpg", "Dám Nghĩ Lớn! (Tái Bản 2016)_Nhà Xuất Bản Tổng hợp TP.HCM_Nhà Sách Tiki Sách tiếng Việt Sách kinh tế_small"],
        ["3.jpg", "Thám Tử Lừng Danh Conan (Tập 93)_Nhà Xuất Bản Kim Đồng_Nhà Sách Tiki Sách tiếng Việt Truyện Tranh, Manga, Comic_small"],
        ["4.jpg", "Bạn Đỡ Ngu Ngơ Rồi Đấy_Nhà Xuất Bản Thế Giới_Nhà Sách Tiki Sách tiếng Việt Sách kỹ năng - Sống đẹp Sách tư duy - Kỹ năng sống_small"],
        ["5.jpg", "Cẩm Nang Tự Học IELTS_Nhà Xuất Bản Thế Giới_Nhà Sách Tiki Sách tiếng Việt Sách Học Ngoại Ngữ_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"]
    ];

    for (let i = 0; i < arrProductImage.length; i++) {

        let image = "resources/imgs/small/" + arrProductImage[i][0];
        let title = arrProductImage[i][1].split("_");

        let imageTag = $('<span></span>').append($('<img src=' + image + ' ></img >')).addClass("image");
        let titleTag = $('<span></span>').text(title[0]).addClass("title");
        let priceTag = $('<h4></h4>').text("20.000 đ").css("color","orange");
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
                "width": "25%",
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

});