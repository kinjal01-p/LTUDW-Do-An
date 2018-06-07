$(document).ready(function () {

    var arrProductImage = [
        ["1.jpg", "7 Thói Quen Của Bạn Trẻ Thành Đạt (Tái Bản)_Nhà Xuất Bản Tổng hợp TP.HCM_Nhà Sách Tiki Sách tiếng Việt Sách kỹ năng - Sống đẹp Sách tư duy - Kỹ năng sống_small"],
        ["2.jpg", "Dám Nghĩ Lớn! (Tái Bản 2016)_Nhà Xuất Bản Tổng hợp TP.HCM_Nhà Sách Tiki Sách tiếng Việt Sách kinh tế_small"],
        ["3.jpg", "Thám Tử Lừng Danh Conan (Tập 93)_Nhà Xuất Bản Kim Đồng_Nhà Sách Tiki Sách tiếng Việt Truyện Tranh, Manga, Comic_small"],
        ["4.jpg", "Bạn Đỡ Ngu Ngơ Rồi Đấy_Nhà Xuất Bản Thế Giới_Nhà Sách Tiki Sách tiếng Việt Sách kỹ năng - Sống đẹp Sách tư duy - Kỹ năng sống_small"],
        ["5.jpg", "Cẩm Nang Tự Học IELTS_Nhà Xuất Bản Thế Giới_Nhà Sách Tiki Sách tiếng Việt Sách Học Ngoại Ngữ_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"]
    ];



    // client's info

    var clientName = $('<h6></h6>').text("Ân Mộc");
    var clientInfo = $('<p></p>').html("Chung cư 450 NTMK, P5, Q3, TPHCM" + "<br><br>" + "SĐT: 01699999999");

    $(".information").append(clientName, clientInfo);
    // item
    var title = arrProductImage[0][1].split("_");
    var numberOfItems = $('<strong></strong>').text("1 x");

    var itemName = $('<p></p>').text(title[0]).css("float", "right");
    var itemTag = $('<div></div>').append(numberOfItems, itemName);


    $(".product").append(itemTag);

    $(".update").click(function () {

        $(".information").empty();
        let name = $("#name").val();
        let address = $("#adress").val();
        let number = $("#numberPhone").val();
       
        var clientName = $('<h6></h6>').text(name);
        var clientInfo = $('<p></p>').html(address + "<br><br>" + "SĐT: " + number);

        $(".information").append(clientName, clientInfo);
        $('#repairInfo').click();

        $("#name").val("");
        $("#adress").val("");
        $("#numberPhone").val("");
    });
    $(".cancel").click(function () {
        $('#repairInfo').click();
        $("#name").val("");
        $("#adress").val("");
        $("#numberPhone").val("");
    });

});