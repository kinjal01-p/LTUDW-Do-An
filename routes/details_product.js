var express = require('express');
var router = express.Router();

/* GET users listing. */


let product = {
    name: "Thám Tử Lừng Danh Conan (Tập 93)",
    price: "10.000đ",
    viewCount: "2000",
    manufacturer: {
        NXB: "Kim đồng",
        country:"Nhật Bản"
    },
    type: "Truyện tranh",
    Description: "Thi thể đã biến đi đâu!? “Vụ án xác chết biến mất trong bể bơi” sẽ được làm sáng tỏ! Bên cạnh đó, bóng dáng “Rum”, nhân vật quyền lực thứ 2 của tổ chức Áo Đen sẽ theo sát Conan và Haibara!? Cũng trong tập này, “vụ án người cô thân thiết”, vụ án mạng quái vật “Kamaitachi” với sự tham gia của Heiji... và sự mở đầu của “án mạng Kawanakajima” nơi máu của các cảnh sát hình sự sẽ đổ xuống chiến trường xưa ở tỉnh Nagano... hứa hẹn sẽ mang tới nhiều điều bất ngờ!"
}

router.get('/', function (req, res, next) {

    // var userName = req.session.passport.user;
    res.render('details_product', {
        title: 'Product',
        product
    });

});

module.exports = router;