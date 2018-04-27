//author: huudanh
// BEGIN ADD HUUDANH
var tmpQuantity = "";
var maxQuantity = 20;
$(document).ready(function () {
    //BEGIN QUANTITY INPUT EVENT
    removeItemFromCart();
    calTotalPrice();
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

        var quantity = $(this).closest('.cart_product_quantity_row').children('#quantity_input').val();
        quantity = parseInt(quantity);
        if (quantity < maxQuantity) {
            $(this).closest('.cart_product_quantity_row').children('#quantity_input').val(quantity + 1);
        }
        calTotalPrice();        
    });
}
////////////////////////////////////////////////////////////////
// THIS BELOW FUNCTION DECREASE QUANTITY BY 1
function decreaseQuantity() {
    $('.decrease_btn').click(function () {
        var quantity = $(this).closest('.cart_product_quantity_row').children('#quantity_input').val();
        quantity = parseInt(quantity);
        if (quantity > 1) {
            $(this).closest('.cart_product_quantity_row').children('#quantity_input').val(quantity - 1);
        }
        calTotalPrice();    
    });
}
////////////////////////////////////////////////////////////////
//THIS BELOW FUNCTION CALCULATE TOTAL PRICE AND QUANTITY OF PRODUDCT IN CART PAGE
function calTotalPrice(){
    var sum = 0;
    var totalQuan = 0;
    $('.cart_product_row').each(function(){
        var tmpPrice = $(this).find('.cart_product_price').attr('data-price');
        var tmpQuantity = $(this).find('#quantity_input').val();   
        totalQuan = totalQuan + parseInt(tmpQuantity);
        sum = sum + (parseInt(tmpPrice) * parseInt(tmpQuantity));
    });
    $('.total_price').text(sum); 
    var quanText = "(" + totalQuan.toString() + " sản phẩm)"
    $('.cart_quantity_label').text(quanText);
    $('.count').text(totalQuan);
}
/////////////////////////////////////////////////////////////////
// THIS BELOW FUNCTIOM REMOVE PROUCT FROM CART
function removeItemFromCart(){
    $('.cart_product_remove').click(function(){
        $(this).closest('.cart_product_row').remove();
        calTotalPrice();
    })
}
/////////////////////////////////////////////////////////////////
//END ADD HUUDANH