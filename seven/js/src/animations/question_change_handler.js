require('../../lib/vivus.min.js'); 

module.exports = function () {

    var curr_q = 0;  
    var curr_sub = 0; 

    var input_forms = document.forms;
    console.log(input_forms); 
    for (var i = 0; i < input_forms.length; i++) {
        input_forms[i].onsubmit = function (e) {
           
            e.preventDefault();

            var curr_q = e.target.dataset.q;
            if (typeof curr_q == 'undefined') {
                curr_q = e.target.parentElement.dataset.q; 
            }
            var sub = e.target.dataset.sub;
            var max = e.target.dataset.max; 

            if (e.target.id == sub.toString() + curr_q.toString() && parseInt(curr_q) <= parseInt(max)) {

                console.log($('#' + e.target.id));
                change_q.call($('#' + e.target.id).parents('.input-wrap').find('.right'));
            } 
        }
    }



    $('.expanded').css({
        'height': '156px'
    });
     

    $('.expanded1').css({
        'height': '200px'
    });

    $('.exp-wrap').css({
        'height': '200px'
    })

    function change_q() {

        var r = $(this).parents('.input-wrap').find('.right');
        var w = $(this).parents('.input-wrap').find('.wrong');

        var curr = $(this).parents('.input-wrap').find('.active-wrap');
        var q = parseInt(curr.attr('data-q')) + 1;
        var sub = parseInt(curr.attr('data-sub'));  
        var max = parseInt(r.attr('data-max'));


        var next = $(this).parent('.input-wrap').find('.hidden-wrap[data-q="' + q + '"][data-sub="' + sub + '"]');
        next.css({
            'z-index': q + 1
        });

        if (curr.hasClass('prompt_shown')) {

            if (curr.attr('data-type') == 't') {
                animate_q();
            } else {
                curr.animate({
                    height: '100px'
                }, {
                    duration: 300,
                    complete: function () {
                       
                    }
                })

                r.animate({
                    marginTop: '-110px'

                }, 300)

                w.animate({
                    marginTop: '-110px'
                }, 300)
                animate_q();
            }

        } else {
            animate_q(); 
        }

        function animate_q() {
            if (curr.hasClass('collapse')) {
                curr.animate({
                    'height': curr.height() - 100 + 'px'
                }, 300)

                if (curr.attr('data-type') == 't') {
                    curr.find('textarea').animate({
                        'height': '100px'
                    }, {
                        duration: 300,
                        complete: function () {
                            animate_transition();
                        }
                    })
                } else {
                    animate_transition();
                }

                r.animate({
                    height: '100px',
                    marginTop: '-110px'
                }, 300);

                w.css({
                    'width': '0px',
                    'height': '100px',
                    'margin-top': '-110px'
                });
                w.find('.icon').css({
                    'display': 'none'
                });

                $('.input-overlay[data-sub="' + sub + '"]').animate({
                    height: '100px',
                    marginTop: '-100px'
                }, 300);
            } else {
                animate_transition();
            }
        }

        function animate_transition() {
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

                            if (q > max) {

                                end_form(curr); 
                                return false; 
                            }
                            curr.fadeOut({
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

                                    next.addClass('active-wrap');
                                    next.removeClass('hidden-wrap');
                                    next.css({'opacity': '0'})


                                    next.animate({
                                        opacity: 1
                                    }, {
                                        duration: 200,
                                        complete: function () {
                                            
                                            curr.removeClass('active-wrap');

                                            var stats = next.parent('.input-wrap').find('.small-stats'); 
                                            var bar = next.parent('.input-wrap').find('.input-meter').find('.meter-span'); 
                                            small_progress(q, max, bar, stats); 
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            })
        }
    }


    function end_form(elem) {
        var thanx = elem.parent('.input-wrap').find('.thanx');


    }

    function small_progress(q, max, bar, s) {
        
        q--;
        var step = 100 / max;
        var width = step * q + '%';
        console.log(width)

        bar.animate({
            width: width
        }, 300);

        s.html(q + '/' + max); 

    }

}