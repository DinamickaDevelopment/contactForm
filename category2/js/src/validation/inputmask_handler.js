module.exports = function () {
    $('.addmask').on('click', function () {

        var maskval = $(this).attr('data-maskval');
        if (maskval != 'cash') {

            if (maskval != '99/99/9999') {
                $(this).inputmask({
                    mask: maskval,
                    showMaskOnHover: false,
                    showMaskOnFocus: false,
                    greedy: false
                });

                if (maskval == 'nums') {
                    $(this).inputmask({
                    mask: '9[9[9[9[9[9[9[9[9[9[9[9[9[9[9[9[9[9[9[9[9[' + 
                    '9[9[9[9[9[9[9[9[9[9[9[9]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]',
                        showMaskOnHover: false,
                        showMaskOnFocus: false,
                        greedy: false,
                        removeMaskOnSubmit: true,
                        autoUnmask: true
                    });
                }
            }  
            else {
                $(this).inputmask({
                    mask: maskval,
                    showMaskOnHover: false,
                    showMaskOnFocus: false,
                    greedy: false,
                    placeholder: 'dd/mm/yyyy'
                });
            }
     
            
        } else {
            $(this).maskMoney({ prefix: '$ ', allowNegative: true, thousands: ',', decimal: '.', affixesStay: true }); 
        }
    })
}