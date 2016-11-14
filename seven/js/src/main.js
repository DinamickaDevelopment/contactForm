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

var data_handler = require('./data_handler.js'); 


window.onload = function () {
    var flag = false;
    var init_flag = false; 

    $.router.add('/view', function () { 
        if (flag) {
            flag = false;
            data_handler.refresh_data();
            $('.form-preview-wrap').find('.form-input2').remove(); 
        }

        $('.big-container').fadeIn(500);
        $('.meter-top span').animate({
            width: '0%'
        }, 500);
        $('.stats').html('0/2'); 

        $('.content-wrap').fadeIn(300);
        $('.form-preview-wrap').fadeOut(300);

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
        }

    });
    $.router.go('/view');
 
    $('#continue-btn').on('click', function () {
        $.router.go('/preview');
    })

    $.router.add('/done', function () {
        $('.meter-top span').animate({
            width: '100%'
        }, {
            duration: 500,
            complete: function () {
                $('.stats').html('2/2');
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

    })

    var handler_added = false; 

    $.router.add('/preview', function () {
       
        $('.big-container').fadeIn(500);
        $('.thank-you-screen').css({
            'height': '0px',
            'opacity': '0'
        });
        var btn = $('#continue-btn');
        var cat = parseInt(btn.attr('data-view'));
        var max = parseInt(btn.attr('data-max'));

        var step = 100 / max;
        var w = step * cat;

        $('.meter-top span').animate({
            width: w + '%'
        }, {
            duration: 500,
            complete: function () {
                $('.stats').html('1/2');
            }
        });

        if (!flag) {
            flag = true;

            var isMapped = false; 
  
            
            var btn = $('#continue-btn');
            map_inputs.call(btn);

            if (!handler_added) {
                $('#ct0').on('submit', function (e) {

                    e.preventDefault();

                    var form_inputs = $(this).find('.map-input').not('.hidden-addition').not('.l').not('.a').not('.sel');
                    var leadership_inputs = $(this).find('.map-input.l').not('.hidden-addition');
                    var address_inputs = $(this).find('.map-input.a').not('.hidden-addition');
                    var dropdowns = $(this).find('.map-input.sel').not('.hidden-addition');

                    for (var i = 0 ; i < form_inputs.length; i++) {
                        var propname = form_inputs.eq(i).attr('name');

                        if (propname != 'regions') {
                            if (propname.split('.').length > 1) {
                                var propname = propname.split('.')[0];
                                var nested_prop = propname.split('.')[1];
                                data_handler.set_field(form_inputs.eq(i), propname, nested_prop);
                            } else {
                                data_handler.set_field(form_inputs.eq(i), propname);
                            }
                        } else {
                            data_handler.set_regions(form_inputs.eq(i));
                        }

                    }

                    for (var i = 0; i < leadership_inputs.length; i++) {
                        var l_propname = leadership_inputs.eq(i).attr('name').substr(0, leadership_inputs.eq(i).attr('name').length - 1);
                        data_handler.set_multi(leadership_inputs.eq(i), 'leadership', l_propname, leadership_inputs.eq(i).attr('data-index'));
                    }

                    for (var i = 0; i < address_inputs.length; i++) {
                        var a_propname = address_inputs.eq(i).attr('name').substr(0, address_inputs.eq(i).attr('name').length - 1);
                        if (address_inputs.eq(i).hasClass('yes') && address_inputs.eq(i).prop('checked')) {

                            data_handler.set_multi(address_inputs.eq(i), 'physicaladdresses', a_propname, address_inputs.eq(i).attr('data-index'), true);
                        } else {
                            data_handler.set_multi(address_inputs.eq(i), 'physicaladdresses', a_propname, address_inputs.eq(i).attr('data-index'));
                        }

                    }
                    for (var i = 0; i < dropdowns.length; i++) {

                        data_handler.set_drop(dropdowns.eq(i), dropdowns.eq(i).attr('data-name'));
                    }

                    console.log('-------form data---------');
                    console.log(data_handler.get_data());
                    console.log('-------form data json------');
                    console.log(data_handler.get_json_data());
                    $.router.go('/done');
                })
            }

            
        } else {

            data_handler.refresh_data();

            var preview = $('.form-preview-wrap');
            $('.content-wrap').fadeOut(500, function () {
                preview.fadeIn(500);
            });

        }

        function map_inputs() {
            var cat = parseInt($(this).attr('data-view'));
            var max = parseInt($(this).attr('data-max'));

            $('.content-wrap').fadeOut(500, function () {

                var inputs = $('.map-input');

                var new_inputs = inputs.clone();
              

                new_inputs.removeAttr('disabled');

                var preview = $('.form-preview-wrap');

                for (var i = 0; i < new_inputs.length; i++) {
                  
                    if (!new_inputs.eq(i).hasClass('mock')) {

                        var sub = new_inputs.eq(i).attr('data-sub');
                        var placeholder = new_inputs.eq(i).attr('placeholder');
                        var prompt = new_inputs.eq(i).attr('data-prompt');

                        var html = '<div class="form-input2" data-q="' + (i + 1) + '">' +
                            '<h3>' + (typeof placeholder == "undefined" ? '' : placeholder) + '</h3>' +
                            '<p>' + (typeof prompt == "undefined" ? '' : prompt) + '</p>'
                          + '</div> '
                        if (new_inputs.eq(i).attr('data-type') == 'radio') {

                            new_inputs.eq(i).addClass('rad2');
                            var html = '<div class="form-input2" data-q="' + (i + 1) + '">' +
                            '<h3>' + (typeof placeholder == "undefined" ? '' : placeholder) + '</h3>' +
                            '<p>' + (typeof prompt == "undefined" ? '' : prompt) + '</p>' +
                            '<label class="radioli">' + new_inputs.eq(i).prop('outerHTML')
                            + '<div></div><span>' + new_inputs.eq(i).attr('data-caption') + '</span></label>'
                            '</div> '


                        } else if (new_inputs.eq(i).attr('data-type') == 'file') {

                            var html = '<div class="form-input2" data-q="' + (i + 1) + '">' +
                            '<h3>' + (typeof placeholder == "undefined" ? '' : placeholder) + '</h3>' +
                            '<p>' + (typeof prompt == "undefined" ? '' : prompt) + '</p>' +
                            '<label class="add-file plus">'
                            + '<div class="icon-plus"></div></label>' + '<span class="file-span"></span>'
                            '</div> '

                        }

                      

                        preview.find('div[data-sub="' + sub + '"]').append(html);

                        if (new_inputs.eq(i).attr('data-type') == 'file') {
                            preview.find('div[data-sub="' + sub + '"]').find('.add-file').append(new_inputs.eq(i));

                            try {
                               
                                var files = inputs.eq(i).prop('files');
                                new_inputs.eq(i).prop('files', files);
                                preview.find('div[data-sub="' + sub + '"]').find('.file-span').html(files[0].name);
                              
                            } catch (err) {
                                
                                preview.find('div[data-sub="' + sub + '"]').find('.file-span').html(''); 
                            }

                        } else if (new_inputs.eq(i).attr('data-type') != 'radio') {
                            preview.find('div[data-sub="' + sub + '"]').find('.form-input2[data-q="' + (i + 1) + '"]').append(new_inputs.eq(i)); 
                         
                        }
                    }


                    if (preview.find('.hidden[data-sub="' + sub + '"]').find('.shown').length == 0) {

                        preview.find('.hidden[data-sub="' + sub + '"]').css({ 'display': 'none' });
                    } else {
                        preview.find('.hidden[data-sub="' + sub + '"]').css({ 'display': 'block' });
                    }
                }

                $('.add-file').on('click', function (e) {

                    var id = e.target.id;
                    var self = $(this);

                    e.target.onchange = function (e) {
                        
                        self.next('span').html(e.target.files[0].name);

                    }
                });


                $('input[type="radio"]').css({
                    'display': 'block',
                    'opacity': '0'
                })

                map_dropdowns(preview)

                function map_dropdowns(wrap) {
                    var drops = $('.drop'); 
                    var mapped_drops = [];

                    for (var i = 0; i < drops.length; i++) {

                        if (drops.eq(i).hasClass('mock')) continue;

                        var cells = [];
                        for (var j = 0; j < drops.eq(i).find('.cell').length; j++) {


                            var inner_cells = [];
                            if (drops.eq(i).find('.exp-cell').eq(j).length > 0) {

                                for (var k = 0; k < drops.eq(i).find('.exp-cell').eq(j).find('.small-cell').length; k++) {
                                    if (drops.eq(i).find('.exp-cell').eq(j).find('.small-cell').eq(k).hasClass('selected')) {
                                        inner_cells.push('<option selected>' + drops.eq(i).find('.exp-cell').eq(j).find('.small-cell').eq(k).attr('data-text') + '</option>')
                                    } else {
                                        inner_cells.push('<option data-cat="' + drops.eq(i).find('.cell').eq(j).attr('data-text') 
                                            + '" value="' + drops.eq(i).find('.exp-cell').eq(j).find('.small-cell').eq(k).attr('data-text')
                                            + '">' + drops.eq(i).find('.exp-cell').eq(j).find('.small-cell').eq(k).attr('data-text') + '</option>')
                                    }

                                }
                                cells.push('<optgroup label="' + drops.eq(i).find('.cell').eq(j).attr('data-text') + '">' +
                                   inner_cells.join('') + '</optgroup>')

                            } else {
                                if (drops.eq(i).find('.cell').eq(j).hasClass('selected')) {
                                    cells.push('<option selected>' + drops.eq(i).find('.cell').eq(j).attr('data-text') + '</option>')
                                } else {
                                    cells.push('<option value="' + drops.eq(i).find('.cell').eq(j).attr('data-text') + '">' + drops.eq(i).find('.cell').eq(j).attr('data-text') + '</option>')
                                }

                            }

                        }

                        mapped_drops[i] = '<div class="form-input2"><h3>' + drops.eq(i).attr('data-placeholder') + '</h3>'
                            + '<select data-name="' + drops.eq(i).attr('data-name') + '" class="form-control map-input sel" multiple style="height: ' + drops.eq(i).attr('data-height') + '">' + cells.join('') + '</select></div>';

                        var sub = drops.eq(i).attr('data-sub');
                        var curr = wrap.find('.form-sub[data-sub="' + sub + '"]');
                        var q = drops.eq(i).attr('data-q');

                        var p = curr.find('.form-input2[data-q="' + q + '"]');

                        if (p.length > 0) {
                            p.after(mapped_drops[i]);
                        } else {
                            curr.append(mapped_drops[i])
                        }

                    }
                }

                preview.fadeIn(500, function () {
                    inputmask_handler();
                });
            });
        }
    })
}