$(document).ready(function () {


    // var arrProductImage = ["one", "two", "three", "four", "five", "six"]
    // var arrProductColor = ["red", "green", "blue",
    //     "orange", "yellow", "pink"
    // ]



    // for (var i = 0; i < arrProductColor.length; i++) {
    //     var divTag = $('<div></div>').addClass("box")
    //         .css({
    //             "background": arrProductColor[i],
    //             "width": "25%",
    //             "padding": "0px 10px"
    //         })
    //         .hover(function () {
    //             $(this).css("box-shadow", "0 0 20px rgba(0,0,0,.5)");
    //         }, function () {
    //             $(this).css("box-shadow", "initial");
    //         });
    //     $(".flexbox-container").append(divTag);
    // }

    var slides = document.querySelectorAll('#slides .slide');
    var currentSlide = 0;
    var slideInterval = setInterval(nextSlide, 2000);

    function nextSlide() {
        slides[currentSlide].className = 'slide';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].className = 'slide showing';
    }

    var playing = true;
    var pauseButton = document.getElementById('pause');

    function pauseSlideshow() {
        pauseButton.innerHTML = 'Play';
        playing = false;
        clearInterval(slideInterval);
    }

    function playSlideshow() {
        pauseButton.innerHTML = 'Pause';
        playing = true;
        slideInterval = setInterval(nextSlide, 2000);
    }

    pauseButton.onclick = function () {
        if (playing) { pauseSlideshow(); }
        else { playSlideshow(); }
    };

    $(".img-thumbnail").on({
        click: function () {
          var img = $(this).data("img");
          console.log(img);
          pauseSlideshow();
          var thisSlide = $("#slides li[data-slide=" + img + "]");
          console.log(thisSlide);
          $(".showing").removeClass("showing");
          thisSlide.addClass("showing");
          currentSlide = img - 1;
        }
      });




});