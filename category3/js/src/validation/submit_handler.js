var data_handler = require('../data_handler');
var json_handler = require('../json_handler'); 

module.exports = {

    add_submit_handlers: function () {
        var self = this; 
        $('#ct0').on('submit', function (e) {

            e.preventDefault();
            self.handle_submit.call($('#ct0'), e, '0');
        });
        $('#ct1').on('submit', function (e) {

            e.preventDefault();
            self.handle_submit.call($('#ct1'), e, '1');
        });
        $('#ct2').on('submit', function (e) {
            e.preventDefault();
            self.handle_submit.call($('#ct2'), e, '2');

        });
    }, 
    remove_submit_handlers: function() {
        $('#ct0').unbind();
        $('#ct1').unbind();
        $('#ct2').unbind();
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

        if (ct == "2") {
            for (var i = 0; i < form_inputs.length; i++) {
                var propname = form_inputs.eq(i).attr('name');
                if (typeof propname != 'undefined') {
                    if (propname.split('.').length > 1) {
                        var nested_prop = propname.split('.')[1];
                        var propname = propname.split('.')[0];
                      
                        data_handler.set_field(form_inputs.eq(i), propname, nested_prop);
                    } else {
                        data_handler.set_field(form_inputs.eq(i), propname, null, inputs.eq(i));
                    }
                }
            }

            for (var i = 0; i < dropdowns.length; i++) {
                var ind = form_inputs.eq(i).attr('data-index');
                data_handler.set_drop(dropdowns.eq(i), dropdowns.eq(i).attr('data-name'));
            }
        }


        console.log('-------form data---------');
        console.log(data_handler.get_data());

        // send form data
        json_handler.send_data();

        if (ct < 2) {
            var next_cat = parseInt(ct) + 1;
            try {
                $.router.go('/view/' + next_cat);
            } catch (err) {
                var dt = {
                    ct: next_cat
                }
                view(dt);
            }
        } else {
            try {
                $.router.go('/done');
            } catch (err) {
                done();
            }


        }
    }

}