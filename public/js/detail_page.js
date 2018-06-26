//author: huudanh
// BEGIN ADD HUUDANH
var tmpQuantity = "";
var maxQuantity = 20;
$(document).ready(function () {


    $('.add_to_cart').click(function () {
          $.post("/checkout/add", {
                    amount: $("#quantity_input").val()
                   
              },
              function (data, status) {
                  alert("Data: " + data + "\nStatus: " + status);
              });
    });


    // BEGIN TAG HOVER EVENT
    var width_type = $('.product_type_info').outerWidth();
    width_type = width_type.toString() + "px";
    var width_producer = $('.product_producer_info').outerWidth();
    width_producer = width_producer.toString() + "px";
    var width_country = $('.product_country_info').outerWidth();
    width_country = width_country.toString() + "px";
    $('.product_type_info').hover(
        function () {
            $(this).css({ "background-color": "#159771", "width": "40%", "text-align": "center" });
            $('.product_producer_info').css({ "width": width_producer });
            $('.product_country_info').css({ "width": width_country });
            $('.product_origin_info').css({ "width": "90%" });
        },
        function () {
            var parentWitdh = $('.product_origin_info').width();
            $(this).css({ "background-color": "#1abc9c", "width": "30%", "text-align": "left" });
            $('.product_producer_info').css({ "width": "40%" });
            $('.product_country_info').css({ "width": "30%" });
            $('.product_origin_info').css({ "width": "70%" });
        });
    $('.product_producer_info').hover(
        function () {
            $(this).css({ "background-color": "#159771", "width": "50%", "text-align": "center" });
            $('.product_type_info').css({ "width": width_type });
            $('.product_country_info').css({ "width": width_country });
            $('.product_origin_info').css({ "width": "90%" });
        },
        function () {
            var parentWitdh = $('.product_origin_info').width();
            $(this).css({ "background-color": "#1abc9c", "width": "40%", "text-align": "left" });
            $('.product_type_info').css({ "width": "30%" });
            $('.product_country_info').css({ "width": "30%" });
            $('.product_origin_info').css({ "width": "70%" });
        });
    $('.product_country_info').hover(
        function () {
            $(this).css({ "width": "40%", "text-align": "center" });
            $('.product_producer_info').css({ "width": width_producer });
            $('.product_type_info').css({ "width": width_type });
            $('.product_origin_info').css({ "background-color": "#159771", "width": "90%" });
        },
        function () {
            $(this).css({ "width": "30%", "text-align": "left" });
            $('.product_type_info').css({ "width": "30%" });
            $('.product_producer_info').css({ "width": "40%" });
            $('.product_origin_info').css({ "background-color": "#1abc9c", "width": "70%" });
        });
    //END TAG HOVER EVENT
    //BEGIN QUANTITY INPUT EVENT
    inputQuantity();
    increaseQuantity();
    decreaseQuantity();
    $("#quantity_input").focusout(function(){
        var quantity = this.value;
        if(quantity === ""){
            this.value = 1;
        }
    });
    //END QUANTITY INPUT EVENT



});
// THIS BELOW FUNCTION MAKE INPUT FIELD ONLY TAKE NUMBERIC
function inputQuantity() {
    $("#quantity_input").on("input", function () {
        var quantity = this.value;
        var reg = new RegExp('[0-9]+$|^$');
        if (reg.test(quantity)) {
            if (parseInt(quantity) > maxQuantity) {
                tmpQuantity = maxQuantity;
                this.value = tmpQuantity;
            }
            else {

                tmpQuantity = this.value
            }
        }
        else {
            this.value = tmpQuantity;
        }
    });
}
///////////////////////////////////////////////////////////////
// THIS BELOW FUNCTION INCREASE QUANTITY BY 1
function increaseQuantity() {
    $('.increase_btn').click(function () {

        var quantity = $('#quantity_input').val();
        quantity = parseInt(quantity);
        if (quantity < maxQuantity) {
            $('#quantity_input').val(quantity + 1);
        }
    });
}
////////////////////////////////////////////////////////////////
// THIS BELOW FUNCTION DECREASE QUANTITY BY 1
function decreaseQuantity() {
    $('.decrease_btn').click(function () {
        var quantity = $('#quantity_input').val();
        quantity = parseInt(quantity);
        if (quantity > 1) {
            $('#quantity_input').val(quantity - 1);
        }
    });
}
////////////////////////////////////////////////////////////////
//END ADD HUUDANH