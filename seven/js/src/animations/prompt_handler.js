module.exports = function (elem) {

    if (elem.hasClass('prompt_shown') && !elem.hasClass('multiprompt')) return false;

    var wrap = elem.parent('form').parent('.active-wrap').parent('.input-wrap');
    var container = elem.parent('form').parent('.active-wrap'); 
    var q = container.attr('data-q'); 
    var p = wrap.find('.prompt[data-q="'+ q + '"]');
    console.log(q);
    console.log(p)

    if (elem.hasClass('multiprompt')) {
        p.find('span').html(elem.attr('data-prompt')); 
    }

    p.slideDown(200, function () {
        $(this).css({
            'display': 'table'
        });

        $(this).find('span').animate({
            opacity: 1
        }, 200); 
    });

    
    container.addClass('prompt_shown'); 

}