module.exports = function () {


    $('input[type=file]').on('click', function () {
        $(this).on('change', function () {

            var self = $(this);
            //if (self.hasClass('multi-file')) {
            //    var sp = self.parent('.label-wrap').next('.file-span-wrap').find('span');
            //    console.log(self.prop('files'))
            //    sp.html(self.prop('files').length);

            //    var r = self.parent('.label-wrap').parent('form').parent('.active-wrap').parent('.input-wrap').find('.right');

            //    var s = self.parent('.label-wrap').parent('form').parent('.active-wrap').find('.submit');

            //    $(this).parent('.label-wrap').prev('.skip-container').find('span').fadeOut(100, function () {
            //        self.parent('.label-wrap').prev('.skip-container').animate({
            //            width: '0px',
            //            padding: '0px',
            //            margin: '0px'
            //        }, {
            //            duration: 300,
            //            complete: function () {
            //                s.css({
            //                    'display': 'block'
            //                });
            //                r.animate({
            //                    width: 100 + 'px'
            //                }, {
            //                    duration: 200,
            //                    complete: function () {
            //                        r.find('img').fadeIn(100);
            //                    }
            //                });
            //            }
            //        })
            //    })

            //} else {
            $(this).parent('.label-wrap').prev('.skip-container').find('span').fadeOut(100, function () {
                self.parent('.label-wrap').prev('.skip-container').animate({
                    width: '0px',
                    padding: '0px',
                    margin: '0px'
                }, {
                    duration: 300,
                    complete: function () {
                        self.parent('.label-wrap').css({ 'z-index': '90999999' });
                        self.parent('.label-wrap').animate({
                            'width': '100%'
                        }, {
                            duration: 700,
                            complete: function () {
                               
                                $(this).find('span').animate({ opacity: 0 }, 100);
                                $(this).fadeOut(500);
                                var id = '#' + $(this).attr('data-category') + $(this).attr('data-sub') + $(this).attr('data-q');
                                $(id).submit();
                                
                            }
                        })
                    }
                })
             })
          //}
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
                    self.next('.label-wrap').find('span').animate({ opacity: 0 }, 100);
                    self.next('.label-wrap').animate({
                        width: 100 + '%'
                    }, {
                        duration: 500,
                        complete: function () {
                            self.parent('form').fadeOut(500, function () {
                                var id = '#' + self.attr('data-category') + self.attr('data-sub') + self.attr('data-q');
                                $(id).submit();
                            })
                        }
                    })


                }
            })
        })

    })


}