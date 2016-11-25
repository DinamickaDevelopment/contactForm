module.exports = function (elem, flag) {

    if (elem.hasClass('prompt_shown') && !elem.hasClass('multiprompt')) return false;

    var wrap = elem.parent('form').parent('.active-wrap').parent('.input-wrap');
    var container = elem.parent('form').parent('.active-wrap'); 
    var q = container.attr('data-q'); 
    var p = wrap.find('.prompt[data-q="' + q + '"]');

    if (elem.hasClass('multiprompt')) {
        p.find('span').html(elem.attr('data-prompt')); 
    }

    if (p.hasClass('radioprompt')) {
        p.find('.y').trigger('click'); 
    }

    var ln = 200;
    if (flag) {
        ln = 400;
    }

        p.slideDown(ln, function () {
            $(this).css({
                'display': 'table'
            });

            $(this).find('span').animate({
                opacity: 1
            }, 200);
        });
    

    
    container.addClass('prompt_shown'); 

}