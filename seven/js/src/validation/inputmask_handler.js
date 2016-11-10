module.exports = function () {
    $('.addmask').on('click', function () {
        var maskval = $(this).attr('data-maskval');
        $(this).inputmask({
            mask: maskval,
            showMaskOnHover: false,
            showMaskOnFocus: false
        });
    })
}