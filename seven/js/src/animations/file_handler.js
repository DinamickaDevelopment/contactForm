module.exports = function () {
    $('input[type=file]').on('click', function () {
        $(this).on('change', function () {

            var self = $(this); 
            $(this).parent('.label-wrap').prev('.skip-container').fadeOut(300, function () {
               self.parent('.label-wrap').css({ 'z-index': '90999999' });
               self.parent('.label-wrap').animate({
                    'width': '100%'
                }, {
                    duration: 700,
                    complete: function () {
                        self.find('span').animate({ opacity: 0 }, 100);
                        self.fadeOut(300);
                        var id = '#' + self.attr('data-category') + self.attr('data-sub') + self.attr('data-q');
                        $(id).submit();
                    }
                })
            })

        })
    });

    $('.skip-container').on('click', function () {
        var self = $(this); 
        $(this).find('span').fadeOut(100, function () {
            self.animate({
                width: '0px',
                padding: '0px',
                margin: '0px'
            }, {
                duration: 300,
                complete: function () {
                    self.parent('form').fadeOut(200, function () {
                        var id = '#' + self.attr('data-category') + self.attr('data-sub') + self.attr('data-q');
                        $(id).submit();
                    })

                }
            })
        })

    })


}