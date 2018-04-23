// author: cam-sv
// common.js sẽ chứa các xử lý js chung cho toàn màn hình

$(document).ready(function () {
    // BEIN ADD CAM-SV
    // ví dụ như: hiện modal button Đăng Nhập
    $("#btnLogIn").click(function () {
        $('#modalLogin').modal('show');
    });

    // thay đổi label của modal khi click vào tab Đăng Nhập
    $("#tabLogIn").click(function () {
        $('#myModalLabel').text('Đăng nhập');
    }); 

    // thay đổi label của modal khi click vào tab Đăng Ký
    $("#tabSignUp").click(function () {
        $('#myModalLabel').text('Đăng ký');
    }); 

    // END ADD CAM-SV
    // BEGIN ADD BAO-TQ
    $("#refMyAccount").click(function () {
        $('#modalInformation').modal('show');
    }); 
    // END ADD BAO-TQ
});

