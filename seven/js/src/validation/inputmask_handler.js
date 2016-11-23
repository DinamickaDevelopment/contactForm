module.exports = function () {
    $('.addmask').on('click', function () {
        if ($(this).attr('data-masked') == '1') return false;
        var self = $(this); 

        var maskval = $(this).attr('data-maskval');
        var ct = $(this).parent('.form-input2').attr('data-category'); 

        $(this).attr('data-masked', '1'); 

        if (maskval != 'cash') {

            if (maskval != '99/99/9999') {
                $(this).inputmask({
                    mask: maskval,
                    showMaskOnHover: false,
                    showMaskOnFocus: false,
                    greedy: false,
                    onincomplete: invalidMask,
                    oncomplete: validMask
                });

                if (maskval == 'nums') {
                    $(this).inputmask({
                    mask: '9{1,100}',
                        showMaskOnHover: false,
                        showMaskOnFocus: false,
                        greedy: false,
                        removeMaskOnSubmit: true,
                        autoUnmask: true,
                        onincomplete: invalidMask,
                        oncomplete: validMask
                    });
                }
            }  
            else {
                $(this).inputmask({
                    mask: maskval,
                    showMaskOnHover: false,
                    showMaskOnFocus: false,
                    greedy: false,
                    placeholder: 'dd/mm/yyyy',
                    onincomplete: invalidMask,
                    oncomplete: validMask
                });
            } 


            function invalidMask() {
                self.addClass('invalid')
            } 
            function validMask() {
                self.removeClass('invalid');
                if (typeof ct != 'undefined') {
                    var err_p = $('.error[data-ct="' + ct + '"]');
                    err_p.html(''); 
                }
            }
     
            
        } else {
            $(this).maskMoney({ prefix: '$ ', allowNegative: true, thousands: ',', decimal: '.', affixesStay: true }); 
        }
    })
}