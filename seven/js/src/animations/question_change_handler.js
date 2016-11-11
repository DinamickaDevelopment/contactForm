require('../../lib/vivus.min.js'); 

module.exports = function () {

    var curr_q = 0;  
    var curr_sub = 0; 

    var input_forms = document.forms;
    console.log(input_forms); 
    for (var i = 0; i < input_forms.length; i++) {
        input_forms[i].onsubmit = function (e) {
    
            e.preventDefault();

            var sub = e.target.dataset.sub;

            if (e.target.id = sub + curr_q) {

                console.log($('#' + e.target.id));
                change_q.call($('#' + e.target.id).parents('.input-wrap').find('.right'));
            }
        }
    }


    $('.right').on('click', function () {
        curr_q = $(this).attr('data-q'); 
        curr_sub = $(this).attr('data-sub');

        var max = $(this).attr('data-max'); 

        console.log(curr_q);
        console.log(curr_sub); 

        if (curr_q < max) {
            var r = $(this).parents('.input-wrap').find('#' + curr_sub + curr_q).trigger('submit');
            $(this).attr('data-q', parseInt(curr_q) + 1);
        } else {
            end_form(); 
        }
    });

    function change_q() {

        var curr = $(this).parents('.input-wrap').find('.active-wrap');
        var q = parseInt(curr.attr('data-q')) + 1;
        var sub = parseInt(curr.attr('data-sub')); 

        var next = $(this).parent('.input-wrap').find('.hidden-wrap[data-q="' + q + '"][data-sub="' + sub + '"]');
        next.css({
            'margin-top': '-100px',
            'z-index': q + 1
        });


        var r = $(this).parents('.input-wrap').find('.right');
        var w = $(this).parents('.input-wrap').find('.wrong');

        console.log('q')
        w.fadeOut(100, function () {




            r.animate({
                marginRight: '170px',
                opacity: 0
            }, {
                duration: 500,
                complete: function () {
                    if (curr.attr('data-type') == 'file') {
                        curr.find('.label-wrap').css({
                            'display': 'none'
                        })
                    }

                    cb();
 
                    function cb() {
                        curr.animate({
                            opacity: 0
                        }, {
                            duration: 300,
                            complete: function () {



                                r.css({
                                    'margin-right': '-30px',
                                    'width': '0px',
                                    'opacity': 1
                                });

                                w.css({
                                    'margin-right': '-30px',
                                    'width': '0px',
                                    'opacity': 1,
                                    'display': 'block'
                                });

                                r.find('.icon').css({ 'display': 'none' });
                                w.find('.icon').css({ 'display': 'none' });

                                next.fadeIn(200, function () {
                                    next.addClass('active-wrap');
                                    curr.removeClass('active-wrap');

                                    if (next.attr('data-type') == 't') {

                                    }

                                });

                            }
                        })
                    }
                }
            })
        })
    }


    function end_form() {

    }


}