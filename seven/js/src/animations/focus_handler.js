module.exports = function () {
    $('.form-input').on('focus', handle_input);

    $('.form-input').on('input', handle_input);

    $('.form-textarea').on('focus', handle_textarea);

    $('.form-textarea').on('input', handle_textarea);

    //var isAnimating = false; 

    function handle_input() {

        $(this).css({
            'color': '#1f467d'
        })

        //if (isAnimating) return false;
        //else isAnimating = true; 

        var r = $(this).parents('.input-wrap').find('.right');
        var w = $(this).parents('.input-wrap').find('.wrong');
 
        if (r.attr('data-sub') != $(this).attr('data-sub')) return false; 

        if ($(this).hasClass('req')) {
                show(r);
        } else {
            if ($(this).val() == '') {

                hide(r);
                show(w)
            } else {

                show(r); 
            }
        }
    }

    function handle_textarea() {
        $(this).css({
            'color': '#1f467d'
        })

        //if (isAnimating) return false;
        //else isAnimating = true;

        var r = $(this).parents('.input-wrap').find('.right');
   
        var w = $(this).parents('.input-wrap').find('.wrong');

        if (r.attr('data-sub') != $(this).attr('data-sub')) return false;

        if (!$(this).attr('required')) {
               show(r, true);
        } else {
            if ($(this).val() == '') {

                hide(r, true); 
                show(w, true)
                
            } else {

                show(r, true);
            }
        }
    }

    function show(elem, isBig, cb) {
        elem.animate({
            width: 100 + 'px',
            height: function () {
                if (isBig) return '200px';
                else return false;
            }
        }, {
            duration: 200,
            complete: function () {
                elem.find('.icon').fadeIn(200, function () {
                    //isAnimating = false;
                    if (cb) cb();
                });
            }
        })
    }

    function hide(elem, isBig, cb) {
        elem.find('.icon').fadeOut(200, function () {
            elem.animate({
                width: '0px',
                height: function () {
                    if (isBig) return '200px';
                    else return false;
                }
            }, {
                duration: 200,
                complete: function () {
                    //isAnimating = false;
                    if (cb) cb();
                }
            })
        })
    }

 
}