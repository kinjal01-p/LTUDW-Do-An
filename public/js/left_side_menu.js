$(document).ready(function () {
    // BEGIN ADD CAM-SV
    // init màn hình cho phần left_side_menu
    $("#bookTypeMenuItem").hide();
    $("#writerMenuItem").hide();
    $("#nxbMenuItem").hide();
    $("#ratingMenuItem").hide();
    $("#pricingMenuItem").hide();

    // Xử lý thu gọn - xem thêm phần left_side_menu
    // EDIT NAME OF CLASS ON CLICK BY DANH-NH
    $(".btn_booktype").click(function () {
        console.log("aa");
        
        $("#bookTypeMenuItem").toggle("fast");
        $('#bookTypeExtend').toggleClass('fa fa-angle-down fa fa-angle-up ');
    });

    $(".btn_writer").click(function () {
        $("#writerMenuItem").toggle("fast");
        $('#writerExtend').toggleClass('fa fa-angle-up fa fa-angle-down');
    });

    $(".btn_nxb").click(function () {
        $("#nxbMenuItem").toggle("fast");
        $('#nxbExtend').toggleClass('fa fa-angle-up fa fa-angle-down');
    });

    $(".btn_rate").click(function () {
        $("#ratingMenuItem").toggle("fast");
        $('#ratingExtend').toggleClass('fa fa-angle-up fa fa-angle-down');
    });

    $(".btn_price").click(function () {
        $("#pricingMenuItem").toggle("fast");
        $('#pricingExtend').toggleClass('fa fa-angle-up fa fa-angle-down');
    });
    // END ADD CAM-SV
});