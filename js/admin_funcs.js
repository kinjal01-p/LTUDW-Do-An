// BEGIN ADD BAO-TQ
"use strict";

$(document).ready(function() {
  $("#linkDashboard").click(function() {
    $("#dashboard").show();
    $("#itemManager").hide();
    $("#orderManager").hide();
  });

  $("#linkItemManager").click(function() {
    $("#dashboard").hide();
    $("#itemManager").show();
    $("#orderManager").hide();
  });

  $("#linkOrderManager").click(function() {
    $("#dashboard").hide();
    $("#itemManager").hide();
    $("#orderManager").show();
  });
});

// END ADD BAO-TQ
