var end_form = require('./check_handler');
var dropdown_handler = require('./dropdown_handler'); 
var small_progress = require('./progress_bar'); 

module.exports = function () {
    $('.down').on('click', function () {

        var dropwrap = $(this).parent('.input-wrap').find('.active-wrap');

        if (!$(this).hasClass('colorchange')) {

            var h = dropwrap.attr('data-dropheight');

            dropwrap.css({
                'height': h + 'px'
            });
            $(this).parent('.input-wrap').find('.input-overlay').css({
                'display': 'none'
            })
            dropwrap.slideDown(500);
        } else {

            var self = $(this);

    
     
            dropwrap.slideUp(500, function () {
                self.animate({
                    marginRight: '200px',
                    opacity: '0'
                }, {
                    duration: 500,
                    complete: function () {
                         
                        var s = dropwrap.parent('.input-wrap').find('.small-stats')
                        var bar = dropwrap.parent('.input-wrap').find('.meter-span');

                     
                        if (dropwrap.hasClass('final')) {
                            bar.animate({
                                width: '100%'
                            }, {
                                dutration: 300,
                                complete: function () {
                                    end_form(dropwrap, true); 
                                }
                            });

                         
                            s.html(s.attr('data-max') + '/' + s.attr('data-max')); 
                        } else {
                            var q = parseInt($(this).attr('data-q'));
                            q++;

                            $(this).attr('data-q', q); 

                            small_progress(q, parseInt(s.attr('data-max')), bar, s);

                            $(this).removeClass('colorchange');
                            $(this).find('.icon').css({ 'display': 'none' }); 
                            $(this).find('.icon').removeClass('rotate'); 
                            $(this).css({
                                'margin-right': '-30px',
                                'width': '0px',
                                'opacity': '1'
                            });

                            var mock = dropwrap.parent('.input-wrap').find('.mock-input');

                            var n = dropwrap.next('.hidden-wrap');

                            mock.css({
                                'z-index': '-1'
                            })
                            dropwrap.removeClass('active-wrap');
                            n.addClass('active-wrap'); 
                            n.css({
                                'display': 'none'
                            });

                            dropwrap.parent('.input-wrap').find('.input-overlay').css({
                                'display': 'block'
                            })
                            mock.find('input').fadeOut(300, function () {
                                var c = mock.find('.curr-inp');
                                c.removeClass('curr-inp');
                                c.next('input').addClass('curr-inp').fadeIn(300, function () {
                                    dropwrap.parent('.input-wrap').find('.input-overlay').css({
                                        'display': 'none'
                                    })
                                });

                            })
                            
                        }
                    }
                })
            })
        }

    })

    $('.big-option').on('click', function () {
        if (!$(this).hasClass('selected')) {

            var wrap = $(this).parent('div').parent('.active-wrap').parent('.input-wrap');
            var d = wrap.find('.down');

            if (!d.hasClass('colorchange')) {
                d.addClass('colorchange');
                d.find('.icon').addClass('rotate');
            }

            $(this).css({
                'background-color': 'rgb(157, 171, 208)',
                'color': 'rgb(22, 42, 99)'
            })

            var id = $(this).find('svg').attr('id');
            var sm_check = new Vivus(id, {

                duration: 30,
                type: 'async',
                start: 'autostart',
                onReady: function () {
                    $('#' + id).fadeIn(100);
                }
            });


            $(this).addClass('selected');
        } else {


            $(this).find('svg').fadeOut(200);
            $(this).css({
                'background-color': '#c3cbe1',
                'color': '#8a97bb'
            })
            $(this).removeClass('selected');
        }
    })

    $('.input-cell').on('click', function () {
        var wrap = $(this).parent('div').parent('form').parent('.active-wrap').parent('.input-wrap');
        var d = wrap.find('.down');

        if (!d.hasClass('colorchange')) {
            d.addClass('colorchange');
            d.find('.icon').addClass('rotate');
        }
    })

}