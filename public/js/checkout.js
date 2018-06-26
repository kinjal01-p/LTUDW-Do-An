$(document).ready(function () {

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