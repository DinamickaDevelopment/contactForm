var radio_handler = require('./radio_handler.js');
var inputmask_handler = require('../validation/inputmask_handler');
var focus_handler = require('./focus_handler.js');
var question_change_handler = require('./question_change_handler.js');
var file_handler = require('./file_handler.js');
var dropdown_select_handler = require('./dropdown_select_handler.js');
var nested_dropdown_handler = require('./nested_dropdown_handler.js');
var route_handler = require('../routes/route_handler'); 

var counter = 0;


module.exports = function () {
    var all_clones = $('.category-wrap').clone();
    $('.add-btn').on('click', add_inp_handler); 

    function add_inp_handler(e) {

        var index = parseInt($(this).attr('data-index'));

        index++;

        $(this).attr('data-index', index); 

        var ct_clone = all_clones.eq(parseInt($(this).attr('data-category'))); 
        var ct = parseInt($(this).attr('data-category'));

        var wrap = $(this).parent('div').parent('.input-wrap'); 
        if (wrap.length == 0) {
            wrap = $(this).parent('div').parent('div').parent('.input-wrap');
        }
        var sub = ct_clone.find('.input-wrap[data-sub="' + $(this).attr('data-sub') + '"]');

        sub.css({
            'display': 'none'
        });
        sub.find('.add-btn').attr('data-index', index); 

        var curr_sub = parseInt(wrap.attr('data-sub')); 
        var new_sub = parseInt(wrap.attr('data-sub')) + 1;

      
        sub.attr('data-sub', new_sub);
        sub.children().attr('data-sub', new_sub);
        sub.find('input').attr('data-sub', new_sub);
        sub.find('textarea').attr('data-sub', new_sub);
        sub.find('div').attr('data-sub', new_sub);
        sub.find('.map-input').attr('data-index', index);
        sub.find('.rad').attr('data-sub', new_sub);
        sub.find('.label-wrap').attr('data-sub', new_sub);

        for (var k = 0; k < sub.find('svg').length; k++) {
            var old_id = sub.find('svg').eq(k).attr('id');
            sub.find('svg').eq(k).attr('id', old_id + 'add' + counter); 
        }
        var sub_arr = sub.find('.input-form');

        var rads = sub.find('input[type="radio"]');
        var r2 = sub.find('.rad'); 

       
        for (var i = 0; i < rads.length; i++) {

            var oldname = rads.eq(i).attr('name');
            var oldindex = parseInt(oldname.substr(oldname.length - 1));
            if (!isNaN(oldindex)) {
                oldindex++;
                var new_name = oldname.substr(0, oldname.length - 1) + oldindex;
            } else {
                var new_name = oldname.substr(0, oldname.length - 1) + index;
            }
        
            var n_id = index.toString() + new_name; 
            if (rads.eq(i).hasClass('yes')) {

                r2.eq(i).attr('id', 'check' + n_id); 
            } else {
                r2.eq(i).attr('id', 'check' + n_id + 'n');
            }
            rads.eq(i).attr('name', new_name);

        }

        var category = wrap.parent('.category-wrap');
        if (category.length == 0) {
            category = wrap.parent('div').parent('.category-wrap');
        }

        var subs = category.find('.input-wrap[data-sub!="' + curr_sub + '"]');
        counter++;
    
        for (var i = 0; i < subs.length; i++) {
            if (parseInt(subs.eq(i).attr('data-sub')) >= new_sub) {
                
                subs.eq(i).find('drop').attr('data-sub', parseInt(subs.eq(i).attr('data-sub')) + 1); 
                subs.eq(i).find('input[type="radio"]').attr('name', n2); 
                subs.eq(i).children().attr('data-sub', parseInt(subs.eq(i).attr('data-sub')) + 1);
                subs.eq(i).find('input').attr('data-sub', parseInt(subs.eq(i).attr('data-sub')) + 1);
                subs.eq(i).find('textarea').attr('data-sub', parseInt(subs.eq(i).attr('data-sub')) + 1);
                subs.eq(i).find('div').attr('data-sub', parseInt(subs.eq(i).attr('data-sub')) + 1);
                subs.eq(i).attr('data-sub', parseInt(subs.eq(i).attr('data-sub')) + 1);
                subs.eq(i).find('.switch').attr('id', subs.eq(i).find('.switch').attr('id') + 'n' + index); 
                subs.eq(i).find('.rad').attr('data-sub', parseInt(subs.eq(i).attr('data-sub')) + 1);
                subs.eq(i).find('.label-wrap').attr('data-sub', parseInt(subs.eq(i).attr('data-sub')) + 1);
                
                var radios = subs.eq(i).find('.rad');
                
                if (radios.length > 0) {
                    for (var x = 0; x < radios.length; x++) {
                        if (typeof radios.eq(x).attr('name') != 'undefined') {
                            var name1 = radios.eq(x).attr('name').substr(0, radios.eq(x).attr('name').length - 1);
                            var n2 = name1 + index.toString();

                            radios.eq(x).attr('name', n2);
                            var id = Math.random();
                            if (radios.eq(i).hasClass('y')) {
                                radios.eq(i).attr('id', id);

                            } else {
                                radios.eq(i).attr('id', id + 'n');
                            }
                        }
                    }
                }

                var old_sub_arr = subs.eq(i).find('.input-form');

                for (var x = 0; x < old_sub_arr.length; x++) {
                    var n_s = parseInt(old_sub_arr.eq(x).attr('data-sub')) + 1;
                    old_sub_arr.eq(x).attr('id', ct_clone.attr('data-category') + n_s + old_sub_arr.eq(x).attr('data-q'));
                    old_sub_arr.eq(x).attr('data-sub', n_s); 
                }
            }
        } 

        if (subs.length == 0) {

        }

        for (var j = 0; j < sub_arr.length; j++) {


            sub_arr.eq(j).attr('id', ct_clone.attr('data-category') + sub.attr('data-sub') + sub_arr.eq(j).attr('data-q'));
            sub_arr.eq(j).attr('data-sub', new_sub);

           
        }



        var statstext = sub.find('.stats-wrap').find('.form-label').html();
        var show_index = index + 1;
        if (index > 1) {
            statstext = statstext.substr(0, statstext.length - 2);
           
        }
        statstext = statstext + ' ' + show_index.toString();
        
        
        sub.find('.stats-wrap').find('.form-label').html(statstext); 


        wrap.after(sub);
        $('*').unbind(); 

        radio_handler();
        inputmask_handler();
        focus_handler();
        question_change_handler(true);
        file_handler();
        dropdown_select_handler();
        nested_dropdown_handler();
        $('.add-btn').on('click', add_inp_handler);
        refresh_clones(ct);
        route_handler.preview_handler();

        var self = $(this);
        self.parent('.add-inp').find('span').fadeOut(100, function () {
            self.parent('.add-inp').slideUp(300, function () {
                sub.slideDown(300);
            })
        })

    }

    function refresh_clones(ct) {
        var clone_counter = parseInt($('.category-wrap[data-category="'+ ct + '"]').attr('data-subs'));
        clone_counter++; 
        $('.category-wrap').attr('data-subs', clone_counter); 
        all_clones = $('.category-wrap').clone(); 
    }
}