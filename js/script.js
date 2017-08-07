$(function () {
    var width;
    var boundaryWidth = 980;
    var isSlider = false;
    var gallery = $('#gallery');
    var images = gallery.children();
    var amountImages = images.length;

    if ($(window).innerWidth() < boundaryWidth) {
        isSlider = true;
        gallery.slider({gallery: gallery, isPagination: true, isArrows: true});
    }
    else {
        isSlider = false;
    }

    $(window).resize(function () {
        width = $(window).innerWidth();

        if (width < boundaryWidth && !isSlider) {
            isSlider = true;
            gallery.slider({gallery: gallery, isPagination: true, isArrows: true});
        }

        if (width >= boundaryWidth && gallery.children().length > amountImages) {
            isSlider = false;
            gallery.slider('destroy');
        }
    });

    var width2;
    var boundaryWidth2 = 980;
    var isSlider2 = false;
    var gallery2 = $('#gallery2');
    var images2 = gallery2.children();
    var amountImages2 = images2.length;

    if ($(window).innerWidth() < boundaryWidth2) {
        isSlider2 = true;
        gallery2.slider({gallery: gallery2, isPagination: true, isArrows: true});
    }
    else {
        isSlider2 = false;
    }

    $(window).resize(function () {
        width2 = $(window).innerWidth();

        if (width2 < boundaryWidth2 && !isSlider2) {
            isSlider2 = true;
            gallery2.slider({gallery: gallery2, isPagination: true, isArrows: true});
        }

        if (width2 >= boundaryWidth2 && gallery2.children().length > amountImages2) {
            isSlider2 = false;
            gallery2.slider('destroy');
        }
    });
});