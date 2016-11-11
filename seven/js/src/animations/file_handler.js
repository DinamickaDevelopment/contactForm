module.exports = function () {
    $('input[type=file]').on('click', function () {
        $(this).on('change', function () {
            $(this).parent('.label-wrap').css({ 'z-index': '90999999' }); 
            $(this).parent('.label-wrap').animate({
                'width': '100%'
            }, {
                duration: 500,
                start: function () {
                    $(this).find('span').animate({ opacity: 0 }, 100); 
                },
                complete: function () {
                    $(this).fadeOut(300, function () {
                        var id = '#' + $(this).attr('data-sub') + $(this).attr('data-q');
                        $(id).submit();
                        console.log($(id));
                    })
                }
            })
        })
    })
}