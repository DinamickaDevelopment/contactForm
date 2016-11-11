module.exports = function () {
    $('.form-input').on('focus', handle_input);

    $('.form-input').on('input', handle_input);

    $('.form-textarea').on('focus', handle_textarea);

    $('.form-textarea').on('input', handle_textarea);

    var isAnimating = false; 

    function handle_input(e) {
    
        

        $(this).css({
            'color': '#1f467d'
        })

        var sub = $(this).attr('data-sub');


        if (isAnimating) return false;
        else isAnimating = true; 

        var r = $('#right' + sub);
        var w = $('#wrong' + sub);

        if (!$(this).hasClass('req')) {
                show(r);
        } else {
            if (e.type == 'input') {
                if ($(this).val() == '') {

                    hide(r);
                    show(w)
                } else {

                    show(r);
                }
            } else {
                if ($(this).hasClass('add')) {

                }

                if ($(this).hasClass('addmask')) {
                    if ($(this).inputmask('unmaskedvalue') != '') {
                        show(r);
                    } else {
                        hide(r);
                        show(w)
                    }
                } else if (!$(this).hasClass('req')) {
                    show(r);
                } else {
                    show(w);
                }
            }
        }
    }

    function handle_textarea(e) {
        var sub = $(this).attr('data-sub');


        var r = $('#right' + sub);
        var w = $('#wrong' + sub);

        if (e.type == 'input') {
            //var text = $(this).val(); 
            //text = text.replace(/[^a-zA-Z\s]/g, '');

            //var words = text.split(/[\s]+/);

            //// show word limit! 
            //console.log(words); 

            //if (words.length > parseInt($(this).attr('data-wordcount'))) {
                
            //    hide(r);
            //    show(w);

            //    return false;
            //} else {
            //    show(r); 
            //}
        } 

        $(this).css({
            'color': '#1f467d'
        })

     

        if (isAnimating) return false;
        else isAnimating = true;


        if (!$(this).hasClass('req')) {
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
                    isAnimating = false;
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
                    isAnimating = false;
                    if (cb) cb();
                }
            })
        })
    }

 
}