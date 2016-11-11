module.exports = function () {
    $('.addmask').on('click', function () {

        var maskval = $(this).attr('data-maskval');
        if (maskval != 'cash') {

            $(this).inputmask({
                mask: maskval,
                showMaskOnHover: false,
                showMaskOnFocus: false,
                greedy: false
            });

        } else {
            $(this).maskMoney({ prefix: '$ ', allowNegative: true, thousands: ',', decimal: '.', affixesStay: true }); 
        }
    })
}