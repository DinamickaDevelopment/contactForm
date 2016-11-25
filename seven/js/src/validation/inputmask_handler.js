module.exports = function () {

    $('.addmask[data-maskval="cash"]').on('focus', function () {
        $(this).maskMoney({ prefix: '$ ', allowNegative: true, thousands: ',', decimal: '.', affixesStay: true });
    });

    $('.addmask').on('input', function (e) {
        

        if ($(this).attr('data-masked') == '1') {
            if ($(this).inputmask("isComplete")) {
                $(this).removeClass('invalid')
            } else {
                if (!$(this).hasClass('invalid')) {
                    $(this).addClass('invalid')
                }
            }
            return false;
        } 


        var self = $(this);
        e.preventDefault();
        
        
        self.addClass('invalid');

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
                        mask: '9[9]{1,100}',
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

                if (!self.hasClass('multi-zip')) {
                    self.removeClass('invalid');
                    if (typeof ct != 'undefined') {
                        var err_p = $('.error[data-ct="' + ct + '"]');
                        err_p.html('');
                    }
                }
            }


        } else {
            $(this).maskMoney({ prefix: '$ ', allowNegative: true, thousands: ',', decimal: '.', affixesStay: true });
        }

       
    });

    $('.multi-zip').on('input', function () {
        var v = $(this).val().split(' ');

        var ct = $(this).parent('.form-input2').attr('data-category');

        var isInvalid = false; 
        for (var i = 0; i < v.length; i++) {
            if (v[i].search('_') != -1) {
                $(this).addClass('invalid');
                isInvalid = true; 
            } else if (v[i].length < 5) {
                isInvalid = true;
                $(this).addClass('invalid');
            } 
        }

        var err_p = $('.error[data-ct="' + ct + '"]');
        if (!isInvalid) {
            $(this).removeClass('invalid');
            err_p.html('')
        } else {
            err_p.html('form contains invalid data')
        }
    })
}