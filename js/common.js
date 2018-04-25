// author: cam-sv
// common.js sẽ chứa các xử lý js chung cho toàn màn hình guest và register

$(document).ready(function () {
  // BEGIN ADD CAM-SV
  // thay đổi label của modal khi click vào tab Đăng Nhập
  $('#btnLogin').click(function () {
    $("#modalLogin").modal('show');
  });

  $("#tabLogIn").click(function () {
    $("#myModalLoginTitle").text("Đăng nhập");
  });

  // thay đổi label của modal khi click vào tab Đăng Ký
  $("#tabSignUp").click(function () {
    $("#myModalLoginTitle").text("Đăng ký");
  });

  //testing checkbox 
  // $(':checkbox').change(function () {
  //   if (this.checked) {
  //     alert("Hế nhô");
  //   }
  // });

  // END ADD CAM-SV

  // BEGIN ADD BAO-TQ
  $('#btnAdvanceSearch').click(function () {
    $("#modalAdvanceSearch").modal('show');
  });

  $("#refMyAccount").click(function () {
    $("#isChangePassword").prop("checked", false);
    if ($("#isChangePassword").checked) {
      $("#areaChangePassword").show();
    } else {
      $("#areaChangePassword").hide();
    }

    $("#modalInformation").modal('show');
  })

  $("#isChangePassword").change(function () {
    if (this.checked) {
      $("#areaChangePassword").show();
    } else {
      $("#areaChangePassword").hide();
    }
  });
  // END ADD BAO-TQ
});