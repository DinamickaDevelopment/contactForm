module.exports = function () {

    $('.exp-cell').on('click', function (e) {
        var wrap = $(this).parent('div');
        
        var curr = $(this).attr('data-cell'); 

        if (!$(this).hasClass('selected')) {
            $(this).css({
                'background-color': 'rgb(157, 171, 208)',
                'color': 'rgb(22, 42, 99)'
            })

            $(this).addClass('selected');
            $(this).find('.down-sm').animate({
                width: '100px'
            }, {
                duration: 200,
                complete: function () {
                    $(this).find('img').fadeIn(200); 
                }
            })

            var n_cells = wrap.find('.exp-cell[data-cell!="' + curr + '"]');
            n_cells.removeClass('selected');
            n_cells.css({
                'background-color': '#c3cbe1',
                'color': '#8a97bb'
            });

            n_cells.find('.multi-drop').slideUp(200, function () {

                n_cells.find('.down-sm img').removeClass('rotate2'); 
                n_cells.find('.down-sm img').css({ 'display': 'none' });
                n_cells.find('.down-sm').fadeOut(100, function () {
                    n_cells.find('.down-sm').css({
                        'width': '0px',
                        'display': 'block'
                    });
                });
            })
 

        } else {
            if (e.target.classList.contains('exp-cell')) {
                $(this).css({
                    'background-color': '#c3cbe1',
                    'color': '#8a97bb'
                })

                $(this).removeClass('selected');
            }
        }
    })


    $('.down-sm').on('click', function () {

        var flag = false; 
        var wrap = $(this).parent('div').parent('div').parent('.active-wrap');
        var d = parseInt($(this).attr('data-dropheight')); 
        var m = $(this).next('.multi-drop');
        var h = parseInt(m.attr('data-dropheight')); 

        if (wrap.length == 0) {
            wrap = $(this).parent('div').parent('div').parent('form').parent('.active-wrap');
            flag = true;
            var h = parseInt(m.attr('data-dropheight')) + 100;
        }

        if (!$(this).find('img').hasClass('rotate2')) {
            $(this).find('img').addClass('rotate2');
            wrap.animate({
                height: 100 + h + 'px'
            }, {
                duration: 300,
                start: function () {
                    m.slideDown(300);
                }
            });


        } else {
            $(this).find('img').removeClass('rotate2');
            wrap.animate({
                height: d + 'px'
            }, {
                duration: 300,
                start: function () {
                    m.slideUp(300);
                }
            });


        }

    })

    $('.small-cell').on('click', function () {
        if (!$(this).hasClass('selected')) {

            var wrap = $(this).parent('div').parent('.exp-cell');
            
            var all_wrap = wrap.parent('div').parent('.active-wrap').parent('.input-wrap');
            if (all_wrap.length == 0) {
                all_wrap = wrap.parent('div').parent('form').parent('.active-wrap'); 
            }

            var down = all_wrap.find('.down');


            if (!down.hasClass('colorchange')) {
                down.addClass('colorchange');
                down.find('.icon').addClass('rotate');
            }

            var d = wrap.find('.down-sm img');


            $(this).css({
                'background-color': 'rgb(157, 171, 208)',
                'color': 'rgb(22, 42, 99)'
            })

            var id = $(this).find('svg').attr('id');
            var sm_check1 = new Vivus(id, {

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
                'background-color': '#b1bddc',
                'color': '#6c7ca7'
            })
            $(this).removeClass('selected');
        }
    }); 

}