// BEGIN ADD BAO-TQ
"use strict";

$(document).ready(function() {
  $('#btnPlaceOrder').click(function () {
    $("#modalPlaceOrder").modal('show');
  });

  $('#btnAddItem').click(function () {
    $("#modalAddItem").modal('show');
  });

  $('#btnEditOrder').click(function () {
    $("#modalEditOrder").modal('show');
  });
 

  // $('#btnEditItem').click(function () {
  //   var $row =  $(this).closest('tr');
  //   var $data = $row.find("td")
  //   $("#modalEditItem").modal('show');
  // });

  $('#btnEditItem2').click(function () {
    $("#modalEditItem").modal('show');
  });

  // $("#dashboard").show();
  // $("#itemManager").hide();
  // $("#orderManager").hide();

  // $("#linkDashboard").click(function() {
  //   $("#dashboard").show();
  //   $("#itemManager").hide();
  //   $("#orderManager").hide();
  // });

  // $("#linkItemManager").click(function() {
  //   $("#dashboard").hide();
  //   $("#itemManager").show();
  //   $("#orderManager").hide();
  // });

  // $("#linkOrderManager").click(function() {
  //   $("#dashboard").hide();
  //   $("#itemManager").hide();
  //   $("#orderManager").show();
  // });
});

// END ADD BAO-TQ
