$(document).ready(function () {


    var arrProductImage = [
        ["1.jpg", "7 Thói Quen Của Bạn Trẻ Thành Đạt (Tái Bản)_Nhà Xuất Bản Tổng hợp TP.HCM_Nhà Sách Tiki Sách tiếng Việt Sách kỹ năng - Sống đẹp Sách tư duy - Kỹ năng sống_small"],
        ["2.jpg", "Dám Nghĩ Lớn! (Tái Bản 2016)_Nhà Xuất Bản Tổng hợp TP.HCM_Nhà Sách Tiki Sách tiếng Việt Sách kinh tế_small"],
        ["3.jpg", "Thám Tử Lừng Danh Conan (Tập 93)_Nhà Xuất Bản Kim Đồng_Nhà Sách Tiki Sách tiếng Việt Truyện Tranh, Manga, Comic_small"],
        ["4.jpg", "Bạn Đỡ Ngu Ngơ Rồi Đấy_Nhà Xuất Bản Thế Giới_Nhà Sách Tiki Sách tiếng Việt Sách kỹ năng - Sống đẹp Sách tư duy - Kỹ năng sống_small"],
        ["5.jpg", "Cẩm Nang Tự Học IELTS_Nhà Xuất Bản Thế Giới_Nhà Sách Tiki Sách tiếng Việt Sách Học Ngoại Ngữ_small"],
        ["6.jpg", "Nhà Giả Kim_Nhà Xuất Bản Văn Học_Nhà Sách Tiki Sách tiếng Việt Sách văn học_small"]
    ];


    createTable(0, 2, '123123');
    createTable(1, 4, '123123');
    createTable(2, 5, '445880');

    function createTable(begin, end, code) {
        var table = $('<table></table>').addClass("table table-hover");

        var thead = $('<thead></thead>').addClass("thead-light");

        var trHead = $('<tr></tr>');

        var thheadTitle = $('<th colspan = "2"></th>').text('#Đơn hàng ' + code );
         var random = Math.floor((Math.random() * 3) + 1);
         var spanState;

         if (random == 1) {
             spanState = $('<span></span>').text("Chưa giao hàng").addClass("p-2 mb-2 bg-danger text-white");
         } else if (random == 2) {
             spanState = $('<span></span>').text("Đang giao hàng").addClass("p-2 mb-2 bg-warning text-white");
         } else {
             spanState = $('<span></span>').text("Đã giao hàng").addClass("p-2 mb-2 bg-success text-white");
         }
     
        var statusHead = $('<th></th>').append(spanState);

        trHead.append(thheadTitle, statusHead);
        thead.append(trHead);
      
        table.append(thead);

        var tbody = $('<tbody></tbody >');
        for (var i = begin; i < end; i++) {


            let imagePath = "resources/imgs/small/" + arrProductImage[i][0];

            var title = arrProductImage[i][1].split("_");

            let imageName = $("<span>" + title[0] + "</span>").addClass("col-9 titleItem");
            var img = $('<img src=' + imagePath + '></img >').addClass("col-3 imgItem");

            var divItem = $('<div></div>').append(img, imageName).addClass("item row");

            var thTag = $('<th scope="row"></th>').append(divItem);
            var tdQty = $('<td></td>').text("Qty: 1").css("width", "20%");

            var random = Math.floor((Math.random() * 3) + 1);
            var spanState;

            if(random == 1){
                spanState = $('<span></span>').text("Chưa giao hàng").addClass("p-2 mb-2 bg-danger text-white");
            }
            else if(random == 2){
                spanState = $('<span></span>').text("Đang giao hàng").addClass("p-2 mb-2 bg-warning text-white");
            }
            else {
                spanState = $('<span></span>').text("Đã giao hàng").addClass("p-2 mb-2 bg-success text-white");
            }
           
           // var tdState = $('<td></td>').append(spanState);
            var tdDate = $('<td></td>').text("Đã được giao vào 14 thg 4 2018");


            var content = $('<tr></tr>').append(thTag, tdQty, tdDate);

            tbody.append(content);

        }

        table.append(tbody);
        var wrap_table =   $("<div></div>").append(table).addClass("wrap-table");
        $(".wrap").append(wrap_table);
    }

});