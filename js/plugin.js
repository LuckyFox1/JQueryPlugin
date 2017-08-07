(function ($) {
    var defaults = {
        isArrows: true,
        isPagination: true,
        indexOfCurrSlide: 0
    };

    var methods = {
        init: function (params) {
            var options = $.extend({}, defaults, params);
            if (options.isArrows === false && options.isPagination === false) {
                console.warn('Plugin initialized with default options');
                options.isArrows = true;
                options.isPagination = true;
            }

            if (options.isArrows !== true && options.isArrows !== false ||
                options.isPagination !== true && options.isPagination !== false) {
                console.error('Wrong parameters');
            }

            if (!options.gallery) console.error('gallery is undefined');
            var arrows, pagination;
            var indexOfCurrSlide = 0;
            var images = $(options.gallery.children());
            images.css({position: 'absolute'});
            $(images[0]).addClass('active-slide');

            if (options.isArrows === true) arrows = createArrow(images);

            if (options.isPagination === true) pagination = createPagination(images, options.gallery);

            if (options.isArrows === true) {
                arrows.leftArrow.click(function () {
                    if (indexOfCurrSlide !== 0) {
                        var pagination = $(this).siblings('.pagination').children();
                        var images = $(this).siblings('img');
                        $(images[indexOfCurrSlide]).removeClass();
                        $(images[indexOfCurrSlide - 1]).addClass('active-slide');

                        if (options.isPagination === true) {
                            $(pagination[indexOfCurrSlide]).removeClass();
                            $(pagination[indexOfCurrSlide - 1]).addClass('active');
                        }

                        --indexOfCurrSlide;
                        if (indexOfCurrSlide === 0) {
                            $(this).removeClass('enabled');
                        }

                        if (indexOfCurrSlide !== images.length - 1) {
                            $(this).siblings('.right-arrow').addClass('enabled');
                        }
                    }
                });
                arrows.rightArrow.click(function () {
                    if (indexOfCurrSlide !== $(this).siblings('img').length - 1) {
                        var pagination = $(this).siblings('.pagination').children();
                        var images = $(this).siblings('img');
                        $(images[indexOfCurrSlide]).removeClass();
                        console.log(images[indexOfCurrSlide]);
                        $(images[indexOfCurrSlide + 1]).addClass('active-slide');

                        if (options.isPagination === true) {
                            $(pagination[indexOfCurrSlide]).removeClass();
                            $(pagination[indexOfCurrSlide + 1]).addClass('active');
                        }

                        ++indexOfCurrSlide;
                        if (indexOfCurrSlide === images.length - 1) {
                            $(this).removeClass('enabled');
                        }

                        if (indexOfCurrSlide !== 0) {
                            $(this).siblings('.left-arrow').addClass('enabled');
                        }
                    }
                });
            }

            if (options.isPagination === true) {
                pagination.click(function (e) {
                    var id;


                    if ((+e.target.id !== indexOfCurrSlide && e.target.id) || e.target.id === '0') {
                        var leftArrow = $(this).parent().siblings('.left-arrow');
                        var rightArrow = $(this).parent().siblings('.right-arrow');
                        var images = $(this).parent().siblings('img');
                        console.log(indexOfCurrSlide);

                        id = +e.target.id;
                        console.log(indexOfCurrSlide + ' current');
                        $(images[indexOfCurrSlide]).removeClass();
                        $($(this).parent().children()[indexOfCurrSlide]).removeClass();
                        $(images[id]).addClass('active-slide');
                        $($(this)).addClass('active');
                        indexOfCurrSlide = id;
                        console.log(id + ' next');

                        if (indexOfCurrSlide === images.length - 1 && options.isArrows === true) {
                            rightArrow.removeClass('enabled');
                            leftArrow.addClass('enabled');
                        } else if (indexOfCurrSlide === 0 && options.isArrows === true) {
                            rightArrow.addClass('enabled');
                            leftArrow.removeClass('enabled');
                        } else if (options.isArrows === true) {
                            rightArrow.addClass('enabled');
                            leftArrow.addClass('enabled');
                        }
                    }
                });
            }
            return this;
        },
        destroy: function () {
            console.log('destroy');
            $(this).children('.left-arrow').remove();
            $(this).children('.right-arrow').remove();
            $(this).children('.pagination').remove();
            $(this).children('img').removeAttr('style');
            $(this).children('img').removeAttr('class');
            return this;
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
        return pagination.children();
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
