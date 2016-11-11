module.exports = function (elem, r , w) {

    if (elem.hasClass('prompt_shown')) return false;

    var container = elem.parent('form').parent('.active-wrap');
    var p = container.find('.prompt'); 
    

    var h = container.height(); 

    container.animate({
        height: h + 75 + 'px',
    }, 200);
    elem.animate({
        marginTop: '0px'
    }, {
        duration: 200,
        complete: function () {
            elem.find('span').fadeIn(100);
            elem.addClass('prompt_shown'); 
        }
    });

    p.slideDown(200);
    container.find('.submit').css({
        marginTop: -(r.height() + 85) + 'px'
    })

    r.animate({
        marginTop: -(r.height() + 85) + 'px'
    })
    w.animate({
        marginTop: -(w.height() + 85) + 'px'
    });

    container.addClass('prompt_shown'); 

}