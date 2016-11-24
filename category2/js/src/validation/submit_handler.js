var data_handler = require('../data_handler');
var json_handler = require('../json_handler'); 

module.exports = {

    add_submit_handlers: function () {
        var self = this; 

        $('#ct1').on('submit', function (e) {

            e.preventDefault();
            self.handle_submit.call($('#ct1'), e, '1');
        });

    }, 
    remove_submit_handlers: function() {
     
        $('#ct1').unbind();
        
    },

    handle_submit: function (e, ct) {

        if ($(this).find('.invalid').length > 0) {
            $(this).find('.error').html('form contains invalid data');
            return false; 
        } else {
            $(this).find('.error').html('');
        }        

        var txts = $(this).find('textarea');
        for (var i = 0; i < txts.length; i++) {
            if (typeof txts.eq(i).attr('data-wordcount') != 'undefined') {
                var textval = txts.eq(i).val();
                textval = textval.replace(/[^a-zA-Z\s]/g, '');

                var words = textval.split(/[\s]+/);

                if (words.length > parseInt(txts.eq(i).attr('data-wordcount'))) {
                    var err_container = $(this).find('.error').html('word limit exceeded'); 
                    return false;
                } else {
                    $(this).find('.error').html('');
                }
            }
        }

        data_handler.refresh_data();

        var wrap = $('.category-wrap[data-category="' + ct + '"]');
        var inputs = wrap.find('.map-input').not('.hidden-addition').not('.l').not('.a').not('.sel');

        var form_inputs = $(this).find('.map-input').not('.hidden-addition').not('.l').not('.a').not('.sel');

        var leadership_inputs = $(this).find('.map-input.l').not('.hidden-addition');
        var address_inputs = $(this).find('.map-input.a').not('.hidden-addition');
        var dropdowns = $(this).find('.map-input.sel').not('.hidden-addition');


        if (ct == "1") {
            var form_inputs = $(this).find('.map-input').not('.hidden-addition').not('.p').not('.sel').not('.o').not('.act'); 
            var p_inp = $(this).find('.map-input.p').not('.sel').not('.o').not('.act');
            var o_inp = $(this).find('.map-input.o').not('.sel').not('.p').not('.act');
            var a_inp = $(this).find('.map-input.act').not('.sel').not('.o').not('.p');

            for (var k = 0; k < p_inp.length; k++) {
                var ind = p_inp.eq(k).attr('data-index');
                var propname1 = p_inp.eq(k).attr('name');

                data_handler.set_multi(p_inp.eq(k), 'programs', propname1, ind);
            }


            for (var k = 0; k < o_inp.length; k++) {
                var ind = o_inp.eq(k).attr('data-index');
                var propname1 = o_inp.eq(k).attr('name');
                if (o_inp.eq(k).hasClass('yes') && o_inp.eq(k).prop('checked')) {

                    data_handler.set_multi(o_inp.eq(k), 'outcomes', propname1, ind, true);
                } else {
                    data_handler.set_multi(o_inp.eq(k), 'outcomes', propname1, ind);
                }
               
            }

            for (var k = 0; k < a_inp.length; k++) {
                var ind = a_inp.eq(k).attr('data-index');
                var propname1 = a_inp.eq(k).attr('name');

                data_handler.set_multi(a_inp.eq(k), 'activities', propname1, ind);
            }


            for (var i = 0; i < form_inputs.length; i++) {
                var propname = form_inputs.eq(i).attr('name'); 
                var ind = form_inputs.eq(i).attr('data-index');
         
                if (propname != 'regions') {
                    if (propname.split('.').length > 1) {
                        var nested_prop = propname.split('.')[1];
                        var propname = propname.split('.')[0];
                 
                        data_handler.set_field(form_inputs.eq(i), propname, nested_prop);
                    } else {
                        data_handler.set_field(form_inputs.eq(i), propname, null, inputs.eq(i));
                    }
                } else {
                    data_handler.set_regions(form_inputs.eq(i));
                }
            }

            for (var i = 0; i < dropdowns.length; i++) {
                var ind = dropdowns.eq(i).attr('data-index');
                if (dropdowns.eq(i).hasClass('p') || dropdowns.eq(i).hasClass('o')) {
                    data_handler.set_drop(dropdowns.eq(i), dropdowns.eq(i).attr('data-name'), true, ind);
                } else {
                    data_handler.set_drop(dropdowns.eq(i), dropdowns.eq(i).attr('data-name'));
                }
               
            }

        } 


        console.log('-------form data---------');
        console.log(data_handler.get_data());

        // send form data
        json_handler.send_data();


            try {
                $.router.go('/done');
            } catch (err) {
                done();
            }

            function done() {

                $('.stats').html('2/2');
                $('.meter-top span').animate({
                    width: '100%'
                }, {
                    duration: 500,
                    complete: function () {

                        $('.big-container').fadeOut(500, function () {
                            $('.thank-you-screen').css({
                                'height': '100%'
                            });
                            $('.thank-you-screen').animate({
                                opacity: 1
                            }, 700);
                        });
                    }
                })

            }
    }

}