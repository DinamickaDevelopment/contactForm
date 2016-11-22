module.exports = function (elem, flag) {

    var thanx = elem.parent('.input-wrap').find('.thanx');
    if (thanx.hasClass('done')) return false;

    thanx.addClass('done'); 

    var id = thanx.find('svg').attr('id');

        thanx.find('.big-input-meter').css({ 'margin-top': '-100px' });
        cb(); 
    

        function cb () {
        thanx.fadeIn(200, function () {

            thanx.find('.big-input-meter').animate({
                width: '100%'
            }, {
                duration: 700,
                complete: function () {
                    $('.hideadd').slideUp(300);

                    thanx.find('.big-input-meter').css({ 'margin-top': '-108px' });
              
                    var cool_check = new Vivus(id, {

                        duration: 50,
                        type: 'async',
                        start: 'autostart',
                        onReady: function () {
                            thanx.find('svg').fadeIn(100);
                        }
                    });

                    thanx.find('.thanx-p').fadeIn(200);
                }
            })
        })
    }
}