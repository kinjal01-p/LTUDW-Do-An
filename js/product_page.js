$(document).ready(function () {


    var arrProductImage = ["one", "two", "three", "four", "five", "six"]
    var arrProductColor = ["red", "green", "blue",
        "orange", "yellow", "pink"
    ]

    

    for (var i = 0; i < arrProductColor.length; i++) {
        var divTag = $('<div></div>').addClass("box")
            .css({
                "background": arrProductColor[i],
                "width": "25%",
                "padding": "0px 10px"
            })
            .hover(function () {
                $(this).css("box-shadow", "0 0 20px rgba(0,0,0,.5)");
            }, function () {
                $(this).css("box-shadow", "initial");
            });
        $(".flexbox-container").append(divTag);
    }

});