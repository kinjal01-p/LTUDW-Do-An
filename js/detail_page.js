
$(document).ready(function () {
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
            $(this).css({ "background-color": "#1abc9c", "width": "40%", "text-align": "left"});
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
});