var end_form = require('./check_handler'); 
var small_progress = require('./progress_bar'); 

module.exports = function (flag) {

    $('.right').on('click', function () {
        
        var f = $(this).parent('.input-wrap').find('.active-wrap').find('.input-form').trigger('submit'); 
    })

    var input_forms = document.forms;

    for (var i = 0; i < input_forms.length; i++) {
        input_forms[i].onsubmit = function (e) {

            if ($('#' + e.target.id).find('.multi-zip').length > 0) {
                if ($('#' + e.target.id).find('.multi-zip').val().search('_') != -1) {
                    return false; 
                }
            }

            if (($('#' + e.target.id).find('.req').length > 0)) {
                if ($('#' + e.target.id).find('.req.invalid').length > 0) {
                    return false;
                }
                for (var i = 0; i < $('#' + e.target.id).find('.req').length; i++) {
                    if ($('#' + e.target.id).find('.req').eq(i).val() == '') {
                        return false;
                    }
                }
            }

            e.preventDefault();

            var curr_q = e.target.dataset.q;
            if (typeof curr_q == 'undefined') {
                curr_q = e.target.parentElement.dataset.q; 
            }

            var cat = e.target.dataset.category; 
            var sub = e.target.dataset.sub;
            var max = e.target.dataset.max; 

            try {
                if (e.target.id == cat.toString() + sub.toString() + curr_q.toString() && parseInt(curr_q) <= parseInt(max)) {

                        change_q.call($('#' + e.target.id).parent('.active-wrap').parent('.input-wrap').find('.right'));
                    
                } 
            } catch (err) {

            }
        }
    }

    if (!flag) {
        $('.expanded').css({
            'height': '156px'
        });

        $('.noexp').css({
            'height': '100px'
        });

        $('.expanded1').css({
            'height': '200px'
        });

        $('.exp-wrap').css({
            'height': '200px'
        })
    }


    function change_q() {

        var r = $(this);

        var w = $(this).parents('.input-wrap').find('.wrong');

        var curr = $(this).parents('.input-wrap').find('.active-wrap');
        var q = parseInt(curr.attr('data-q')) + 1; 
        var sub = parseInt(curr.attr('data-sub'));
        var max = parseInt(r.attr('data-max'));

        var next = $(this).parent('.input-wrap').find('.hidden-wrap[data-q="' + q + '"][data-sub="' + sub + '"]');

        next.css({
            'z-index': q + 1
        });

        curr.find('textarea').css({
            'color': '#c3cbe1',
            'background-color': '#c3cbe1'
        });
        curr.find('input').css({
            'color': '#c3cbe1',
            'background-color': '#c3cbe1'
        });

        if (curr.hasClass('final') && curr.find('.drop').length > 0) {
            curr.slideUp(400, function () {
                curr.parent('.input-wrap').find('.down').animate({
                    opacity: 0,
                    marginRight: '200px'
                }, 400); 
            });
        }

        if (curr.hasClass('prompt_shown')) {

            var n_q = parseInt(q) - 1; 
            var pr = curr.parent('.input-wrap').find('.prompt[data-q="' + n_q + '"]');
           
            pr.find('span').css({
                'display': 'none'
            });
            if (!curr.hasClass('showradio')) {
                counter = 0;
  
                    pr.slideUp({
                        duration: 200,
                        start: function () {

                            animate_q();

                        }
                    })
              


            } else {
    
                var counter = 0; 
                pr.find('span').fadeOut(100, function () {
                    pr.slideUp({
                        
                        duration: 400,
                        complete: function () {
                            if (counter == 0) {
                                counter++;
                                animate_q(); 
                            } else {
                                $(this).stop(true, true); 
                            }
                        }
                    })
                })
            }


        } else {
         
            animate_q();
        }
        
        function animate_q() {
            if (curr.hasClass('collapse')) {
 
            
                curr.parent('.input-wrap').find('.input-overlay').css({
                    display: 'block'
                })

                r.animate({
                    height: '100px',
                    marginTop: '-100px'
                }, {
                    duration: 300,
                    start: function () {

                        curr.parent('.input-wrap').find('.input-overlay').animate({
                            height: '100px',
                            marginTop: '-100px'
                        }, 300);
                        curr.animate({
                            'height': '100px'
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

                    }
                });

                w.css({
                    'width': '0px',
                    'height': '100px',
                    'margin-top': '-100px'
                });
                w.find('.icon').css({
                    'display': 'none'
                });


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

                            var stats = curr.parent('.input-wrap').find('.small-stats');
                            var bar = curr.parent('.input-wrap').find('.input-meter').find('.meter-span');


                            if (q > max) {


                                small_progress(q, max, bar, stats, end_form, curr);
                                return false;
                            }
                            curr.fadeOut({
                                duration: 300,
                                complete: function () {


                                    curr.prev('.mock-input').css({ 'display': 'none' });

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
                                    next.css({ 'opacity': '0' })


                                    next.animate({
                                        opacity: 1
                                    }, {
                                        duration: 200,
                                        complete: function () {
                                            r.attr('data-q', q); 
                                            curr.removeClass('active-wrap');

                                            if (!next.hasClass('nameexp')) {
                                                next.find('input').first().attr('required');
                                                next.find('textarea').attr('required');

                                                next.find('input').first().addClass('auto').trigger('focus');
                                                next.find('textarea').addClass('auto').trigger('focus');

                                                if (!next.find('input').first().hasClass('req')) {
                                                    next.find('input').removeAttr('required');
                                                }

                                                if (!next.find('textarea').hasClass('req')) {
                                                    next.find('textarea').removeAttr('required');
                                                }


                                            }
                                            small_progress(q, max, bar, stats);

                                            if (next.hasClass('showradio')) {
                                                next.find('.radio-inp').trigger('click'); 
                                            }
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
}