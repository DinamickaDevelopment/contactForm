﻿var dropdown_handler = require('./dropdown_handler.js'); 
var prompt_handler = require('./prompt_handler');


module.exports = function () {
    $('.form-input').on('focus', handle_input);

    $('.form-input').on('input', handle_input);

    $('.form-textarea').on('focus', handle_textarea);

    $('.form-textarea').on('input', handle_textarea); 

  
 
    $('*').attr('tabindex', -1); 
    $('form').on('click', function () {

        var id = $(this).attr('id'); 
        $(this).find('.map-input').attr('tabindex', 1);

        if (typeof id != 'undefined') {
            $('form[id != "'+ id +'"]').attr('tabindex', -1); 
        }
    }) 

    $('.name-wrap').find('input').attr('tabindex', '1');



    function add_input() {

        if (!$(this).hasClass('addshown') && $(this).hasClass('show-add')) {


            var wrap = $(this).parent('.mock-input').parent('.input-wrap');
            if (wrap.length == 0) {
                wrap = $(this).parent('form').parent('.active-wrap').parent('.input-wrap');
            }

            var index = wrap.find('.hideadd').find('.add-btn').attr('data-index'); 
            var lim = wrap.find('.hideadd').find('.add-btn').attr('data-lim'); 
            if (typeof lim != 'undefined' && parseInt(index) < parseInt(lim)) {
                wrap.find('.hideadd').slideDown(300);
            } else if (typeof lim == 'undefined') {
                wrap.find('.hideadd').slideDown(300);
            } 
            isAnimating = false;

            $(this).addClass('addshown');
            if ($(this).hasClass('drop')) {

                dropdown_handler($(this));
                isAnimating = false;
                return true;
            }
        }
    }

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

        var sub = $(this).attr('data-sub');

        var r = wrap.parent('.input-wrap').find('.right');
        var w = wrap.parent('.input-wrap').find('.wrong');

        if ($(this).hasClass('auto')) {
            isAnimating2 = false;
            $(this).removeClass('auto'); 
        }

        $(this).css({
            'color': '#1f467d'
        })

        if (e.target.classList.contains('exp-drop')) {
            dropdown_handler($(this));
            return true;
        }

        if ($(this).hasClass('showprompt')) {
            if (!$(this).hasClass('multiprompt')) {
                $(this).removeClass('showprompt');
            }
            prompt_handler($(this));
        } else if ($(this).parent('.name-wrap').hasClass('showprompt')) {
            prompt_handler($(this).parent('.name-wrap'));
        }

        if ($(this).hasClass('exp-name')) {
            isAnimating = false; 
        }
        if ($(this).hasClass('invalid')) {
            isAnimating = false;
        }

        if (isAnimating) {
            setTimeout(function() {
                isAnimating = false; 
            }, 100)
            return true; 
        }
        else isAnimating = true; 


        if ($(this).hasClass('input-cell')) {
            isAnimating = false;
            return true; 
        }

        add_input.call(this); 

        if ($(this).hasClass('exp-name')) {
            var w = $(this).parent('div').parent('.input-wrap').find('.wrong');
            var r = $(this).parent('div').parent('.input-wrap').find('.right');

            if (w.length == 0) {
                w = $(this).parent('div').parent('form').parent('.active-wrap').parent('.input-wrap').find('.wrong');
                r = $(this).parent('div').parent('form').parent('.active-wrap').parent('.input-wrap').find('.right');
            }

            var self = $(this);


            var next = $(this).parent('.mock-input').next('.exp');
            if (next.length == 0) {
                next = $(this).parent('.mock-input').parent('form').find('.fullname');
                next.css({
                    'display': 'none'
                })
                next.slideDown(300, function () {

                    next.find('input').eq(0).trigger('focus');
                    self.css({ 'opacity': '0' })

                    isAnimating = false;


                });

                self.parent('.mock-input').animate({
                    height: '0px'
                    
                }, {
                    duration: 300,
                    complete: function () {
                        w.animate({
                            marginTop: '-200px',
                            height: '200px'
                        }, 300)
                        r.animate({
                            marginTop: '-200px',
                            height: '200px'
                        }, 300)
                    }
                })

            

            }
            else {

                next.css({
                    'margin-top': '-100px',
                    'height': '200px'
                });

                next.slideDown(400, function () {

                    next.find('input').eq(0).trigger('focus');
                    self.css({ 'opacity': '0' })

                    isAnimating = false;


                });

                w.animate({
                    marginTop: '-200px',
                    height: '200px'
                }, 300)
                r.animate({
                    marginTop: '-200px',
                    height: '200px'
                }, 300)
            }




            $(this).removeClass('exp-name'); 
        }

        if (!$(this).hasClass('expanded') && $(this).parent('.name-wrap').hasClass('fullname')) {
             
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
            var expheight = $(this).parent('form').parent('.active-wrap').attr('data-expheight');
            $('.input-overlay[data-sub="' + sub + '"]').css({
                'display': 'block'
            })
            $('.input-overlay[data-sub="' + sub + '"]').animate({
                height: expheight + 'px',
                marginTop: '-' + expheight +'px'
            }, 300)

            $(this).parent('form').find('.submit').css({
                height: expheight + 'px',
                marginTop: '-' + expheight + 'px'
            }, 300)

            $(this).parent('form').parent('.active-wrap').animate({
                height: expheight + 'px',
            }, 300)

            w.animate({
                height: expheight + 'px',
                marginTop: '-' + expheight + 'px'
            })

            r.animate({
                height: expheight + 'px',
                marginTop: '-' + expheight + 'px'
            }, {
                duration: 300,
                complete: function () {
                    isAnimating = false;
                    self.addClass('expanded');
                }
            })

        }

        if (!$(this).hasClass('req')) {
            if (r.width() == 0) {

                show(r);
            }
        } else {
            if (e.type == 'input') {
                if ($(this).val() == '') {
                    hide(r);
                    show(w);
                } else if ($(this).hasClass('invalid')) {
                    hide(r);
                    show(w);
                } else {
                    if (r.width() == 0) {
                       show(r);
                    } 
                }
            }
            else {
                if ($(this).hasClass('addmask')) {
                    if ($(this).inputmask('unmaskedvalue') != '' && !$(this).hasClass('invalid')) {
                        show(r);
                    } else {
                        hide(r, null, show, w, null);
                    } 
                }

                if (!$(this).hasClass('req') && (!$(this).hasClass('invalid'))) {
                    show(r); 
                } else {
                    show(w);
                }
            }
        }

    }

    var right_shown = false;
    var wrong_shown = false;

    var flag1 = false;

    function handle_textarea(e) {

        if ($(this).hasClass('auto')) {
            isAnimating2 = false;
            $(this).removeClass('auto');
        }

        var sub = $(this).attr('data-sub');
        var wrap = $(this).parent('form').parent('.active-wrap');
        var all_wrap = wrap.parent('.input-wrap'); 
        var q = wrap.attr('data-q');

        var r = wrap.parent('.input-wrap').find('.right');
        var w = wrap.parent('.input-wrap').find('.wrong');

        add_input.call(this);

        if ($(this).hasClass('showprompt')) {
            $(this).removeClass('showprompt');
            prompt_handler($(this));
        }

        if (!$(this).hasClass('expanded') && !$(this).hasClass('huge') && !$(this).hasClass('noexp')) {

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
        if (!$(this).hasClass('expanded') && $(this).hasClass('huge') && !$(this).hasClass('noexp')) {
            var self = $(this);

   
            $(this).parent('form').parent('.active-wrap').animate({
                height: '500px'
            }, 300);
            $(this).animate({
                'height': '456px'
            }, 300)

            $(this).parent('form').parent('.active-wrap').parent('.input-wrap').find('.input-overlay').animate({
                height: '500px',
                marginTop: '-500px'
            }, 300)

            $(this).next('.submit').css({
                'height': '500px',
                'margin-top': '0px'
            }, 300)

            w.animate({
                marginTop: '-500px',
                height: '500px'
            })

            r.animate({
                marginTop: '-500px',
                height: '500px'
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
            return true; 
        }
        else isAnimating = true;


        if (!$(this).hasClass('req') && !flag1 ) {
         
            show(r, true);
        } else {
            if (!flag1) {
                if ($(this).val() == '' || $(this).hasClass('invalid')) {
               
                    hide(r, true, show, w, true);


                } else {
                    hide(w);
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

            if (prompt.find('span').find('span').length == 0) {
                prompt.find('span').append('<span></span>');
            }
            prompt.find('span').find('span').html(' ' + words.length + ' words out out of ' + $(this).attr('data-wordcount') + ' used. Click arrow to go to next field.');

            if (words.length >= parseInt($(this).attr('data-wordcount'))) {

              

                if (w.width() == 0) {
                 
                    w.css({
                        'z-index': '100000'
                    })

                    r.css({
                        'z-index': '99999',
                        'width': '0px'
                    });
                    r.find('.icon').css({
                        'display': 'none'
                    }); 

                    show(w);
                }
               
                return true;

            }
            else {
              
                if (r.width() == 0) {
                    w.css({
                        'z-index': '99999',
                        'width': '0px'
                    })
                    w.find('.icon').css({
                        'display': 'none'
                    })
                    r.css({
                        'z-index': '100000'
                    });

                    show(r);
                }

                return true;

            }
        } else {
            if (!$(this).hasClass('req') && !$(this).hasClass('invalid')) {
                show(r);
            } else if ($(this).hasClass('req') && !$(this).hasClass('invalid') && $(this).val() != '') { 
                hide(w, true, show, r, true);
            } else {
                    show(w); 
                }
            }
        }
    }   

    var isAnimating2 = false;
    function show(elem, isBig, cb, isAuto) {
        if (isAnimating2) {
            setTimeout(function () {
                isAnimating2 = false; 
            }, 100)
            return true }
        else isAnimating2 = true; 

        elem.animate({
            width: 100 + 'px',
            complete: function () {
                if (isBig) return '200px';
                else {
                    isAnimating = false;
                    isAnimating2 = false; 
                    return true
                };
            }
        }, {
            duration: 200,
            complete: function () {
                elem.find('.icon').fadeIn(100, function () {
                    isAnimating = false;
                    isAnimating2 = false;
                    if (cb) cb();
                });
            }
        })
    }

    function hide(elem, isBig, cb, w, isBig2) {
        if (isAnimating2) return true;
        else isAnimating2 = true;


        
        elem.find('.icon').css({
            'display': 'none'
        })
        elem.animate({
            width: '0px',
            height: function () {
                if (isBig) return '200px';
                else {

                    return true
                };
            }
        }, {
            duration: 200,
            complete: function () {
                isAnimating = false;
                isAnimating2 = false;
                //if (cb) cb(w, isBig2);
            }
        });

        isAnimating = false;
        isAnimating2 = false;
        if (cb) cb(w, isBig2);
        
    }
}