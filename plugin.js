(function ($) {
    var defaults = {color: 'green'};
    var indexOfCurrSlide = 0;

    var methods = {
        init: function (params) {
            var options = $.extend({}, defaults, params);
            if (!this.data('slider')) {
                this.data('slider', options);
                // console.log($(this).children()[0]);
                console.log('init');
                indexOfCurrSlide = 0;
                var images = $(options.gallery.children());
                images.css({position: 'absolute'});
                $(images[0]).addClass('active-slide');
                var arrows = createArrow(images);
                var pagination = createPagination(images, options.gallery);
                console.log(pagination);

                arrows.leftArrow.click(function () {
                    if (indexOfCurrSlide !== 0) {
                        $(images[indexOfCurrSlide]).removeClass();
                        $(pagination[indexOfCurrSlide]).removeClass();
                        // console.log(pagination);
                        $(images[indexOfCurrSlide - 1]).addClass('active-slide');
                        $(pagination[indexOfCurrSlide - 1]).addClass('active');
                        --indexOfCurrSlide;
                        if (indexOfCurrSlide === 0) {
                            $(this).removeClass().addClass('left-arrow');
                        }
                        if (indexOfCurrSlide !== images.length - 1) {
                            arrows.rightArrow.removeClass().addClass('right-arrow enabled');
                        }
                    }
                });

                arrows.rightArrow.click(function () {
                    if (indexOfCurrSlide !== images.length - 1) {
                        $(images[indexOfCurrSlide]).removeClass();
                        $(pagination[indexOfCurrSlide]).removeClass();
                        $(images[indexOfCurrSlide + 1]).addClass('active-slide');
                        $(pagination[indexOfCurrSlide + 1]).addClass('active');
                        ++indexOfCurrSlide;
                        if (indexOfCurrSlide === images.length - 1) {
                            $(this).removeClass().addClass('right-arrow');
                        }

                        if (indexOfCurrSlide !== 0) {
                            arrows.leftArrow.removeClass().addClass('left-arrow enabled');
                        }
                    }
                });

                pagination.click(function (e) {
                    var id;
                    // var arrPagination = $(pagination.children());

                    if ((+e.target.id !== indexOfCurrSlide && e.target.id) || e.target.id === '0') {
                        id = +e.target.id;
                        $(images[indexOfCurrSlide]).removeClass();
                        $(pagination[indexOfCurrSlide]).removeClass();
                        $(images[id]).addClass('active-slide');
                        $(pagination[id]).addClass('active');
                        indexOfCurrSlide = id;

                        if (indexOfCurrSlide === images.length - 1) {
                            $('.right-arrow').removeClass('enabled');
                            $('.left-arrow').removeClass().addClass('left-arrow enabled');
                        } else if (indexOfCurrSlide === 0) {
                            $('.right-arrow').removeClass().addClass('right-arrow enabled');
                            $('.left-arrow').removeClass('enabled');
                        } else {
                            $('.right-arrow').removeClass().addClass('right-arrow enabled');
                            $('.left-arrow').removeClass().addClass('left-arrow enabled');
                        }
                    }
                });
            }
            return this;
        },
        arrow: function (color) {
            var options = $(this).data('slider');
            options.color = color;
            $(this).data('slider', options);
            console.log('arrow');
        },
        reset: function () {
            $(this).removeData('slider');
            console.log('reset');
        }
    };

    function createArrow(images) {
        var leftArrow = $('<span></span>').text('<').addClass('left-arrow');
        var rightArrow = $('<span></span>').text('>').addClass('right-arrow enabled');
        images.last().after(leftArrow, rightArrow);
        return {leftArrow: leftArrow, rightArrow: rightArrow};
    }

    function createPagination(images, gallery) {
        var pagination = $('<ul></ul>').addClass('pagination');
        var li;

        for (var i = 0; i < images.length; i++) {
            li = $('<li></li>').text('\u25CF').attr('id', i + '');
            pagination.append(li);

            if (i === 0) {
                li.addClass('active');
            }

            if (i === indexOfCurrSlide) {
                li.addClass('active');
            } else {
                li.removeClass();
            }

            li.mouseover(function () {
                $(this).addClass('temp');
            });

            li.mouseout(function (e) {
                if ($(e.target).attr('class').indexOf('active') < 0) {
                    $(this).removeClass();
                } else {
                    $(this).removeClass().addClass('active');
                }
            })
        }

        $(gallery).append(pagination);
        return $('.pagination').children();
    }

    $.fn.slider = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method "' + method + '" in slider not found!');
        }
    }
})(jQuery);
