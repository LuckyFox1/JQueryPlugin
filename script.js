$(function () {
    var i, width, left, right;
    var boundaryWidth = 980;
    var isSlider = false;
    var gallery = $('#gallery');
    var images = gallery.children();
    var indexOfCurrSlide = 0;
    var arrPagination = [];
    var amountImages = images.length;

    if ($(window).innerWidth() < boundaryWidth) {
        isSlider = true;
        // buildSlider(gallery, galleryChildren);
        console.log($(window).innerWidth());
        gallery.slider({gallery: gallery});
    }
    else {
        isSlider = false;

    }

    $(window).resize(function () {
        width = $(window).innerWidth();

        if (width < boundaryWidth && !isSlider) {
            isSlider = true;
            gallery.slider({gallery: gallery});
            // buildSlider();
        }

        if (width >= boundaryWidth && images.length === amountImages) {
            isSlider = false;
            indexOfCurrSlide = 0;
            arrPagination = [];
            gallery.slider('reset');
            // destroySlider();
        }
    })

    // console.log(amountImages);
    // gallery.slider();
    // gallery.slider('color', '#666666');

});