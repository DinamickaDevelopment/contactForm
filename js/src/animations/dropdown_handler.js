module.exports = function (elem, wrap) {

    elem.attr('disabled', 'disabled');
    
    if (elem.hasClass('form-input') || elem.hasClass('form-textarea')) { 
            drop(elem);
    } 

    function drop(elem) {

        var wrap = elem.parent('div').parent('.input-wrap');

        var down = wrap.find('.down');
        if (down.length == 0) {
            var wrap = elem.parent('div'); 
            down = wrap.find('.down');
  
        } else if (down.length > 1) {
            var wrap = elem.parent('div');
            down = wrap.find('.down');
        }


        elem.css({
            'background-color': 'rgb(172, 185, 218)',
            'color': 'rgb(22, 42, 99)'
        });
        elem.val(elem.attr('placeholder')); 

        down.animate({
            width: '100px'
        }, {
            duration: 200,
            complete: function () {
                $(this).find('.icon').fadeIn(300); 
            }
        })
    }
}