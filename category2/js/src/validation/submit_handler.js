﻿var data_handler = require('../data_handler');
var json_handler = require('../json_handler'); 
var radio_handler = require('../animations/radio_handler.js');
var inputmask_handler = require('.//inputmask_handler');
var focus_handler = require('../animations/focus_handler.js');
var question_change_handler = require('../animations/question_change_handler.js');
var file_handler = require('../animations/file_handler.js');
var add_input_handler = require('../animations/add_input_handler.js');
var dropdown_select_handler = require('../animations/dropdown_select_handler.js');
var nested_dropdown_handler = require('../animations/nested_dropdown_handler.js');
var route_handler = require('../routes/route_handler');

module.exports = {

    add_submit_handlers: function () {
        var self = this; 

        $('#ct1').on('submit', function (e) {
           
            if ($('.add-program-btn').hasClass('clicked')) {
                $('.add-program-btn').removeClass('clicked');
                e.preventDefault();
                self.handle_submit.call($('#ct1'), e, '1', true);
            } else {
                e.preventDefault();
                self.handle_submit.call($('#ct1'), e, '1');
            }

        }); 
		
        $('.add-program-btn').on('click', function () {
            $(this).addClass('clicked'); 
        }); 
    }, 
    remove_submit_handlers: function() {

        $('#ct1').unbind();
        $('.add-program-btn').unbind(); 
    },

    handle_submit: function (e, ct, flag) {

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
            var form_inputs = $(this).find('.map-input').not('.hidden-addition').not('.sel');

            for (var i = 0; i < form_inputs.length; i++) {
                var propname = form_inputs.eq(i).attr('name'); 
                var ind = form_inputs.eq(i).attr('data-index');

                if (propname != 'regions') {
                    if (propname.split('.').length > 1) {
                        var nested_prop = propname.split('.')[1];
                        var propname = propname.split('.')[0];

                        data_handler.set_field(form_inputs.eq(i), propname, nested_prop, null, ind);
                    } else {

                        if (form_inputs.eq(i).attr('data-type') == 'file') {

                            var old_inp = wrap.find('.map-input[name="' + form_inputs.eq(i).attr('name') + '"][data-index="' + form_inputs.eq(i).attr('data-index') + '"]');

                            if (form_inputs.eq(i + 1).attr('name') != 'recent990') {
                                data_handler.set_field(form_inputs.eq(i), propname, null, old_inp, ind);
                            }
							if (form_inputs.eq(i).attr('name') == 'programDocument') {
                                data_handler.set_field(form_inputs.eq(i), propname, null, old_inp, ind);
                            }

                    
                        } else {
                            data_handler.set_field(form_inputs.eq(i), propname, null, inputs.eq(i), ind);
                        }
                          
                        
                    }
                } else {
                    data_handler.set_regions(form_inputs.eq(i), true);
                }
            }

            for (var i = 0; i < dropdowns.length; i++) {

                data_handler.set_drop(dropdowns.eq(i), dropdowns.eq(i).attr('data-name'));
            }

        }

        console.log('-------form data---------');
        console.log(data_handler.get_data());

        // send form data
        json_handler.send_data();

        function view (data, init_flag, add_flag) {

           
            $('.form-preview-wrap').fadeOut(500, function () {

                $('input[type="radio"]').css({
                    'display': 'none'
                });

                $('.form-preview-wrap').find('.form-input2').remove();
                $('.form-wrap').find('.category-wrap[data-category="' + data.ct + '"]').css({ 'display': 'block' });
                $('.form-wrap').find('.category-wrap[data-category!="' + data.ct + '"]').css({ 'display': 'none' });

                $('.big-container').fadeIn(500);
                var max = 2;

                var step = 100 / max;
                var w = step * data.ct;

                $('.meter-top span').animate({
                    width: w + '%'
                }, {
                    duration: 500,
                    complete: function () {
                        $('.stats').html(data.ct + '/2');
                    }
                });
                $('.form-wrap').fadeIn(300);

            });

            if (add_flag) {
                var data_handler = require('../data_handler');
                var json_handler = require('../json_handler');
                var radio_handler = require('../animations/radio_handler.js');
                var inputmask_handler = require('.//inputmask_handler');
                var focus_handler = require('../animations/focus_handler.js');
                var question_change_handler = require('../animations/question_change_handler.js');
                var file_handler = require('../animations/file_handler.js');
                var add_input_handler = require('../animations/add_input_handler.js');
                var dropdown_select_handler = require('../animations/dropdown_select_handler.js');
                var nested_dropdown_handler = require('../animations/nested_dropdown_handler.js');
                var route_handler = require('../routes/route_handler.js');;

                var ct1 = route_handler.ct;
                ct2 = ct1.clone();
                $('.form-wrap').find('.category-wrap[data-category="1"]').remove();
                if ($('.form-wrap').find('.category-wrap[data-category="0"]').length > 0) {
                    $('.form-wrap').find('.category-wrap[data-category="0"]').after(ct2);
                } else {
                    $('.form-wrap').append(ct2); 
                }
                init_flag = false; 
            }

            if (!init_flag) {

                init_flag = true;

                radio_handler();
                inputmask_handler();
                focus_handler();
                question_change_handler();
                file_handler();
                add_input_handler();
                dropdown_select_handler();
                nested_dropdown_handler();
                route_handler.preview_handler(data)

            }



            $('.category-wrap[data-category="' + data.ct + '"]').find('.autofocus').trigger('focus');

        }

			if (!flag) {
				try {
					$.router.go('/done');
				} catch (err) {
					done();
				}
			} else {
				
			
				$('#ct1').unbind();
				$('.add-program-btn').unbind();

				$('*').unbind();
			
				view({ ct: 1 }, true, true);
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