require('../lib/jquery.router.js');
require('../lib/inputmask.js');
require('../lib/jquery.maskMoney.js'); 


var radio_handler = require('./animations/radio_handler.js');
var inputmask_handler = require('./validation/inputmask_handler');
var focus_handler = require('./animations/focus_handler.js');
var question_change_handler = require('./animations/question_change_handler.js');
var file_handler = require('./animations/file_handler.js');
var add_input_handler = require('./animations/add_input_handler.js'); 
var dropdown_select_handler = require('./animations/dropdown_select_handler.js');
var nested_dropdown_handler = require('./animations/nested_dropdown_handler.js');
var submit_handler = require('./validation/submit_handler');

var route_handler = require('./routes/route_handler'); 

var data_handler = require('./data_handler.js'); 
var json_handler = require('./json_handler.js'); 

window.onload = function () {
    
    var init_flag = false; 
	

    $('form').attr('tabindex', '-1');
    $('input').attr('tabindex', '-1');


    $('form').attr('autocomplete', 'off');
   
    $.router.addErrorHandler(function (url) {
        console.log(url);
    });

    $.router.add('/view/:ct', view);

    function view(data) {
        
      
        $('.form-preview-wrap').fadeOut(500, function () { 

            $('input[type="radio"]').css({
                'display': 'none'
            }); 

            $('.form-preview-wrap').find('.form-input2').remove();
            $('.form-wrap').find('.category-wrap[data-category="' + data.ct + '"]').css({ 'display': 'block' });
            $('.form-wrap').find('.category-wrap[data-category!="' + data.ct + '"]').css({ 'display': 'none' });

            $('.big-container').fadeIn(500);
            var max = 3;

            var step = 100 / max;
            var w = step * data.ct;

            $('.meter-top span').animate({
                width: w + '%'
            }, {
                duration: 500,
                complete: function () {
                    $('.stats').html(data.ct + '/3');
                }
            });
            $('.form-wrap').fadeIn(300);

        });

  

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

    try {
        $.router.go('/view/2');
    } catch (err) {
        var data = {
            ct: 2
        }
        view(data); 
    }
 


    $.router.add('/done', done)
    function done() {

        $('.stats').html('3/3');
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

    var handler_added = false; 


    $.router.add('/preview/:category', route_handler.preview) 

        
} 
