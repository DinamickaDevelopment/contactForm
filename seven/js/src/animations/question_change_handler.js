module.exports = function () { 

    var curr_q = 0;  
    var curr_sub = 0; 

    $('.input-form').on('submit', function (e) {
        e.preventDefault();
        var cat = e.target.dataset.category;
        if (e.target.id = cat + curr_q) {
            console.log($(this));
            change_q.call($(this).parents('.input-wrap').find('.right'));
        }


        //change_q.call()
    })
    $('.right').on('click', function () {
        curr_q = $(this).attr('data-q'); 
        curr_sub = $(this).attr('data-sub');

        var r = $(this).parents('.input-wrap').find('.input-form[data-category="'+ curr_sub + '"]').trigger('submit'); 
        $(this).attr('data-q', curr_q++); 
    });

    function change_q() {

        var curr = $(this).parents('.input-wrap').find('.active-wrap');
        var q = parseInt(curr.attr('data-q')) + 1;

        var next = $(this).parent('.input-wrap').find('.hidden-wrap[data-q="' + q + '"]');
        next.css({
            'margin-top': '-100px',
            'z-index': q + 1
        });


        var r = $(this).parents('.input-wrap').find('.right');
        var w = $(this).parents('.input-wrap').find('.wrong');

        console.log('q')
        w.fadeOut(100, function () {
            r.animate({
                marginRight: '170px',
                opacity: 0
            }, {
                duration: 500,
                complete: function () {

                    curr.animate({
                        opacity: 0
                    }, {
                        duration: 300,
                        complete: function () {
                            r.css({
                                'margin-right': '-30px',
                                'width': '0px',
                                'opacity': 1
                            });
                            r.find('.icon').css({ 'display': 'none' });

                            w.css({
                                'margin-right': '-30px',
                                'width': '0px',
                                'opacity': 1
                            });
                            next.fadeIn(200, function () {
                                next.addClass('active-wrap');
                                curr.removeClass('active-wrap');
                            });
                        }
                    })
                }
            })
        })
    }
}