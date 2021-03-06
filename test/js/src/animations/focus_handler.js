﻿var dropdown_handler = require('./dropdown_handler.js'); 
var prompt_handler = require('./prompt_handler'); 

module.exports = function () {
    $('.form-input').on('focus', handle_input);

    $('.form-input').on('input', handle_input);

    $('.form-textarea').on('focus', handle_textarea);

    $('.form-textarea').on('input', handle_textarea);

    var handler_added = false;
    if (!handler_added) {
        handler_added = true; 
        $('.rad').on('click', function () {
            
            var sub = $(this).attr('data-sub');
            var cat = $(this).attr('data-category');

            var wrap = $('.category-wrap[data-category="' + cat + '"]').find('.input-wrap[data-sub="' + sub + '"]');

            var r = wrap.find('.right');

            show(r);
        });
    } 

    var isAnimating = false; 

    function handle_input(e) {
        
        var wrap = $(this).parent('form').parent('.active-wrap');
        if (wrap.length == 0) {
            wrap = $(this).parent('div').parent('form').parent('.active-wrap');
        }

        var s = wrap.find('.submit'); 

        if (e.target.classList.contains('exp-drop')) {
            dropdown_handler($(this));
            return false; 
        }


        $(this).css({
            'color': '#1f467d'
        })

        var sub = $(this).attr('data-sub');


        if (isAnimating) {
            setTimeout(function() {
                isAnimating = false; 
            }, 200)
            return false; 
        }
        else isAnimating = true; 

        var r = wrap.parent('.input-wrap').find('.right'); 
        var w = wrap.parent('.input-wrap').find('.wrong');

        if (r.width() > 0) {
            s.css({
                'display': 'block'
            })
        }

        if ($(this).hasClass('input-cell')) {
            isAnimating = false;
            return false; 
        }

        if (!$(this).hasClass('addshown') && $(this).hasClass('show-add')) {

         
            var wrap = $(this).parent('.mock-input').parent('.input-wrap');
            wrap.find('.hideadd').slideDown(300);


            isAnimating = false;

            if ($(this).hasClass('drop')) {

                dropdown_handler($(this));
                isAnimating = false; 
                return false; 
            } 

            $(this).addClass('addshown'); 
        } 

        if ($(this).hasClass('exp-name')) {
            var w = $(this).parent('div').parent('.input-wrap').find('.wrong');
            var r = $(this).parent('div').parent('.input-wrap').find('.right'); 

            var self = $(this);


            w.animate({
                marginTop: '-200px',
                height: '200px'
            })
            r.animate({
                marginTop: '-200px',
                height: '200px'
            })
            
            var next = $(this).parent('.mock-input').next('.exp');

            next.css({
                'margin-top': '-100px',
                'height': '200px'
            }); 
            next.slideDown(400, function () {

                next.find('input').eq(0).trigger('focus'); 
                self.css({'opacity': '0'})

                isAnimating = false;
         

            });
            $(this).removeClass('exp-name'); 
        }

        if ($(this).hasClass('showprompt')) {
            if (!$(this).hasClass('multiprompt')) {
                $(this).removeClass('showprompt');
            }
            prompt_handler($(this));
        } else if ($(this).parent('.name-wrap').hasClass('showprompt')) {
            prompt_handler($(this).parent('.name-wrap'));
        }

        if ($(this).parent('div').hasClass('name-wrap')) {
            var s = $(this).parent('.name-wrap').parent('form').find('.submit');

            s.css({
                'display': 'block'
            })
        }
        if (!$(this).hasClass('expanded') && $(this).parent('.name-wrap').hasClass('fullname')) {
             
            var s = $(this).parent('.name-wrap').parent('form').find('.submit'); 

            s.css({
                'display': 'block'
            })
            var self = $(this);

            $(this).parent('.name-wrap').parent('form').parent('.active-wrap').animate({
                height: '200px'
            }, 300);

            $('.input-overlay[data-sub="' + sub + '"]').animate({
                height: '200px',
                marginTop: '-200px'
            }, 300)

            $(this).parent('.name-wrap').next('.submit').css({
                'height': '200px',
                'margin-top': '-200px'
            }, 300)
            w.animate({
                marginTop: '-200px',
                height: '200px'
            })
            r.animate({
                marginTop: '-200px',
                height: '200px'
            }, {
                duration: 300,
                complete: function () {
                    isAnimating = false; 
                    self.addClass('expanded');
                }
            })


        }
    
        if ($(this).parent('form').parent('.active-wrap').hasClass('exp1') && !$(this).hasClass('expanded')) {
            var self = $(this);
            $('.input-overlay[data-sub="' + sub + '"]').animate({
                height: '200px',
                marginTop: '-200px'
            }, 300)

            $(this).parent('form').find('.submit').css({
                'height': '200px',
                'margin-top': '-200px'
            }, 300)

            $(this).parent('form').parent('.active-wrap').animate({
                height: '200px'
            }, 300)

            w.animate({
                marginTop: '-200px',
                height: '200px'
            })

            r.animate({
                marginTop: '-200px',
                height: '200px'
            }, {
                duration: 300,
                complete: function () {
                    isAnimating = false;
                    self.addClass('expanded');
                }
            })

        }

        if (!$(this).hasClass('req')) {
            s.css({ 'display': 'block' });
            show(r);
        } else {
            if (e.type == 'input') {
                if ($(this).val() == '') {

                    s.css({ 'display': 'none' }); 
                    hide(r);
                    show(w)
                } else {
                    s.css({ 'display': 'block' }); 
                    show(r);
                }
            } else {

                if ($(this).hasClass('addmask')) {
                    if ($(this).inputmask('unmaskedvalue') != '') {
                        s.css({ 'display': 'block' }); 
                        show(r);
                    } else {
                        s.css({ 'display': 'none' });
                        hide(r, null, show, w, null);
                    }
                } else if (!$(this).hasClass('req')) {
                    s.css({ 'display': 'block' }); 
                    show(r);
                } else {
                    s.css({ 'display': 'none' });
                    show(w);
                }
            }
        }
    }

    var right_shown = false;
    var wrong_shown = false;

    //$('textarea').on('paste', function () {
    //    var sub = $(this).attr('data-sub');
    //    var wrap = $(this).parent('form').parent('.active-wrap');
    //    var s = wrap.find('.submit');
    //    var q = wrap.attr('data-q');
    //    var all_wrap = wrap.parent('.input-wrap');


    //    var r = wrap.parent('.input-wrap').find('.right');
    //    var w = wrap.parent('.input-wrap').find('.wrong');

    //    if (typeof $(this).attr('data-wordcount') != 'undefined') {
    //        var prompt = all_wrap.find('.prompt[data-q="' + q + '"]');

    //        var text = $(this).val();
    //        text = text.replace(/[^a-zA-Z\s]/g, '');

    //        var words = text.split(/[\s]+/);

    //        prompt.find('span').html(words.length + ' words out out of ' + $(this).attr('data-wordcount') + ' used');

    //        if (words.length >= parseInt($(this).attr('data-wordcount'))) {

    //            s.css({ 'display': 'none' });

    //            w.css({
    //                'z-index': parseInt(r.css('z-index')) + 2
    //            })
    //            r.css({
    //                'z-index': parseInt(r.css('z-index')) - 1
    //            });
    //            show(w);

    //            return false;

    //        }
    //        else {

    //            w.css({
    //                'z-index': parseInt(r.css('z-index')) - 1
    //            })
    //            r.css({
    //                'z-index': parseInt(r.css('z-index')) + 2
    //            });
    //            s.css({ 'display': 'block' });
    //            show(r);
    //            return false;

    //        }
    //    }
    //})
    var flag1 = false;
    function handle_textarea(e) {
        var sub = $(this).attr('data-sub');
        var wrap = $(this).parent('form').parent('.active-wrap');
        var all_wrap = wrap.parent('.input-wrap'); 
        var q = wrap.attr('data-q');
        var s = wrap.find('.submit'); 

        var r = wrap.parent('.input-wrap').find('.right');
        var w = wrap.parent('.input-wrap').find('.wrong');


        if (r.width() > 0) {
            s.css({
                'display': 'block'
            })
        }


        if ($(this).hasClass('showprompt')) {
            $(this).removeClass('showprompt');
            prompt_handler($(this));
        }

        if (!$(this).hasClass('expanded')) {

            var self = $(this); 

            $(this).parent('form').parent('.active-wrap').animate({
                height: '200px'
            }, 300);
            $(this).animate({
                'height': '156px'
            }, 300)

            $(this).parent('form').parent('.active-wrap').parent('.input-wrap').find('.input-overlay').animate({
                height: '200px',
                marginTop: '-200px'
            }, 300)

            $(this).next('.submit').css({
                'height': '200px',
                'margin-top': '0px'
            }, 300) 

            w.animate({
                marginTop: '-200px',
                height: '200px'
            })

            r.animate({
                marginTop: '-200px',
                height: '200px'
            }, {
                duration: 300,
                complete: function () {
                    isAnimating = false;
                    self.addClass('expanded'); 
                }
            })
        }


  
    if (e.type == 'input') {

     
        $(this).css({
            'color': '#1f467d'
        })
        count_w.call(this);
     

        if (isAnimating) {
            setTimeout(function () {
                isAnimating = false;
            }, 100);
            return false; 
        }
        else isAnimating = true;


        if (!$(this).hasClass('req') && !flag1) {
            s.css({ 'display': 'block' });
            show(r, true);
        } else {
            if (!flag1) {
                if ($(this).val() == '') {
                    s.css({ 'display': 'none' });
                    hide(r, true, show, w, true);


                } else {
                    s.css({ 'display': 'block' });
                    show(r, true);
                }
            }
        }
    } else {

        count_w.call(this);
    }

    function count_w() {
        if (typeof $(this).attr('data-wordcount') != 'undefined') {
            flag1 = true;
            var prompt = all_wrap.find('.prompt[data-q="' + q + '"]');

            var text = $(this).val();
            text = text.replace(/[^a-zA-Z\s]/g, '');

            var words = text.split(/[\s]+/);

            prompt.find('span').html(words.length + ' words out out of ' + $(this).attr('data-wordcount') + ' used');

            if (words.length >= parseInt($(this).attr('data-wordcount'))) {

              

                if (w.width() == 0) {
                    s.css({ 'display': 'none' });
                    w.css({
                        'z-index': '100000'
                    })

                    r.css({
                        'z-index': '99999',
                        'width': '0px'
                    });
                    r.find('img').css({
                        'display': 'none'
                    }); 


                    show(w);
                }
               


                return false;

            }
            else {
              
                if (r.width() == 0) {
                    w.css({
                        'z-index': '99999',
                        'width': '0px'
                    })
                    w.find('img').css({
                        'display': 'none'
                    })
                    r.css({
                        'z-index': '100000'
                    });
                    s.css({ 'display': 'block' });
                    show(r);
                }

                return false;

            }
        } else {
            show(r); 
        }
    }
    }   

    var isAnimating2 = false;
    function show(elem, isBig, cb) {
        if (isAnimating2) {
            setTimeout(function () {
                isAnimating2 = false; 
            }, 100)
            return false }
        else isAnimating2 = true; 

        elem.animate({
            width: 100 + 'px',
            height: function () {
                if (isBig) return '200px';
                else {
                    isAnimating = false;
                    isAnimating2 = false; 
                    return false
                };
            }
        }, {
            duration: 200,
            complete: function () {
                elem.find('.icon').fadeIn(200, function () {
                    isAnimating = false;
                    isAnimating2 = false;
                    if (cb) cb();
                });
            }
        })
    }

    function hide(elem, isBig, cb, w, isBig2) {
        if (isAnimating2) return false;
        else isAnimating2 = true;

        elem.find('.icon').fadeOut(200, function () {
            elem.animate({
                width: '0px',
                height: function () {
                    if (isBig) return '200px';
                    else {
                        isAnimating = false;
                        isAnimating2 = false;
                        return false
                    };
                }
            }, {
                duration: 200,
                complete: function () {
                    isAnimating = false;
                    isAnimating2 = false;
                    if (cb) cb(w, isBig2);
                }
            })
        })
    }

}