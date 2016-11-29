var data_handler = require('../data_handler');
var json_handler = require('../json_handler');
var submit_handler = require('../validation/submit_handler');
var inputmask_handler = require('../validation/inputmask_handler'); 

module.exports = {



    preview_handler: function (data) {
        var self = this; 
        $('.view-preview').on('click', function (e) {
        var ct = e.target.dataset.category;
        try {
            $.router.go('/preview/' + ct);
        } catch (err) {

            var data = {
                category: ct
            }
            self.preview(data);
        }
    });
    },


    preview: function(data) {

        $('.map-input').removeAttr('data-masked');

        data_handler.set_category(data.category);

        $('.big-container').fadeIn(500);


        $('.thank-you-screen').css({
            'height': '0px',
            'opacity': '0'
        });

        var max = 3;

        var step = 100 / max;
        var w = step * data.category;

        $('.meter-top span').animate({
            width: w + '%'
        }, {
            duration: 500,
            complete: function () {
                $('.stats').html(data.category + '/3');
            }
        });

        submit_handler.remove_submit_handlers();
        submit_handler.add_submit_handlers();

        var btn = $('#continue-btn' + data.category);

        var preview = $('.form-preview-wrap');
        preview.find('#ct' + data.category).find('.form-sub').remove();
        map_inputs.call(btn);

        


        $('.form-wrap').fadeOut(500, function () {
            preview.fadeIn(500);
        });

        $('input[type="radio"]').css({
            'display': 'block',
            'opacity': '0'
        });

        
        function map_inputs() {


            var cat = parseInt($(this).attr('data-view'));
            var max = parseInt($(this).attr('data-max'));


            $('.form-wrap').fadeOut(500, function () {

                var wrap = $('.category-wrap[data-category="' + data.category + '"]');

                var all_subs = parseInt(wrap.attr('data-subs'));
                var sub_arr = new Array(all_subs);

                for (var i = 0; i < sub_arr.length; i++) {
                    var wr = wrap.find('.input-wrap[data-sub="'+ i + '"]'); 

                    var htext = wr.find('.stats-wrap').find('.form-label').html();
                    var subtext = wr.find('.stats-wrap').find('p.sub').html(); 

                    if (typeof htext != 'undefined') {
                        if (htext.toLowerCase() != 'mock') {
                            sub_arr[i] = '<div data-sub="' + i + '" class="form-sub">' +
                               '<h2>' + htext + '</h2>' +
                               '<p>' + subtext + '</p>' + '</div>';
                        } else {
                            sub_arr[i] = '<div data-sub="' + i + '" class="form-sub"></div>';
                        }
                    } else {
                        sub_arr[i] = '<div data-sub="' + i + '" class="form-sub"></div>';
                    }


                }

                var sub_html = sub_arr.join(' ');
                $('.ct-form[data-category="' + data.category + '"]').find('.inner-form').append(sub_html); 

                var inputs = wrap.find('.map-input');
                var fl_inputs = wrap.find('input[type="file"]');

                inputs.css({
                    'color': '#1f467d'
                })
                var new_inputs = inputs.clone();


                new_inputs.removeAttr('disabled');

                var preview = $('.form-preview-wrap');
                preview.find('form[data-category!="' + data.category + '"]').css({
                    'display': 'none'
                });

                var ln = new_inputs.length;

                for (var i = 0; i < ln; i++) {

                    if (!new_inputs.eq(i).hasClass('mock')) {

                        var sub = new_inputs.eq(i).attr('data-sub');
                        var placeholder = new_inputs.eq(i).attr('placeholder');
                        var prompt = new_inputs.eq(i).attr('data-prompt');
                        
                 
                        if (new_inputs.eq(i).hasClass('huge')) {
                            new_inputs.eq(i).removeClass('form-textarea');
                            new_inputs.eq(i).addClass('form-textarea-huge'); 
                        }

                        var html = '<div class="form-input2" data-category="' + data.category + '" data-q="' + (i + 1) + '">' +
                            '<h3>' + (typeof placeholder == "undefined" ? '' : placeholder) + '</h3>' +
                            '<p>' + (typeof prompt == "undefined" ? '' : prompt) + '</p>'
                          + '</div> '

                        if (new_inputs.eq(i).attr('data-type') == 'radio') {

                            new_inputs.eq(i).addClass('rad2');
             
                            if (new_inputs.eq(i).hasClass('checked')) {
                                new_inputs.eq(i).attr('checked', true); 
                            }
                            if (new_inputs.eq(i).hasClass('unchecked')) {
                                new_inputs.eq(i).removeAttr('checked');
                            }

                            var html = '<div class="form-input2" data-q="' + (i + 1) + '">' +
                            '<h3>' + (typeof placeholder == "undefined" ? '' : placeholder) + '</h3>' +
                            '<p>' + (typeof prompt == "undefined" ? '' : prompt) + '</p>' +
                            '<label class="radioli radiowrap">' + new_inputs.eq(i).prop('outerHTML')
                            + '<div></div><span>' + new_inputs.eq(i).attr('data-caption') + '</span></label>'
                            '</div> '


                        } else if (new_inputs.eq(i).attr('data-type') == 'file') {

                            var filename = inputs.eq(i).prop('files').length > 0 ? inputs.eq(i).prop('files')[0].name : '';

                            var html = '<div class="form-input2" data-q="' + (i + 1) + '">' +
                            '<h3>' + (typeof placeholder == "undefined" ? '' : placeholder) + '</h3>' +
                            '<p>' + (typeof prompt == "undefined" ? '' : prompt) + '</p>' +
                            '<label class="add-file plus">'
                            + '<div class="icon-plus plus-fin"></div></label>' + '<span class="file-span">' + filename + '</span>'
                            '</div> '

                        }

                        if (typeof new_inputs.eq(i) != 'undefined') {
                            preview.find('div[data-sub="' + sub + '"]').append(html);
                        }
                    

                        if (new_inputs.eq(i).attr('data-type') == 'file') {

                            var span_id = 'span' + new_inputs.eq(i).attr('id');
                            new_inputs.eq(i).removeAttr('id');

                            preview.find('div[data-sub="' + sub + '"]').find('.add-file').append(new_inputs.eq(i));

                        } else if (new_inputs.eq(i).attr('data-type') != 'radio') {
                            preview.find('div[data-sub="' + sub + '"]').find('.form-input2[data-q="' + (i + 1) + '"]').append(new_inputs.eq(i));
                        } 
                    }

                    $('.add-file').on('click', function (e) {

                        var id = e.target.id;
                        var self = $(this);

                        e.target.onchange = function (e) {

                            self.next('span').html(e.target.files[0].name);

                        }
                    });


                    if (preview.find('.hidden[data-sub="' + sub + '"]').find('.shown').length == 0) {

                        preview.find('.hidden[data-sub="' + sub + '"]').css({ 'display': 'none' });
                    } else {
                        preview.find('.hidden[data-sub="' + sub + '"]').css({ 'display': 'block' });
                    }
                }


                map_dropdowns(preview)

                function map_dropdowns(wrap) {
                    var bigwrap = $('.category-wrap[data-category="' + data.category + '"]');
                    var drops = bigwrap.find('.drop');
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

                        mapped_drops[i] = '<div class="form-input2 clear"><h3>' + drops.eq(i).attr('data-placeholder') + '</h3>'
                            + '<select data-index="' + drops.eq(i).attr('data-index') + '" data-name="' + drops.eq(i).attr('data-name')
                            + '" class="form-control map-input sel ' + (drops.eq(i).hasClass('one-dimension') ? 'one-dimension' : '') + (drops.eq(i).hasClass('p') ? 'p' : '')
                            + (drops.eq(i).hasClass('o') ? 'o' : '') + '" multiple style="height: ' + drops.eq(i).attr('data-height') + '">' + cells.join('') + '</select></div>';

                        var sub = drops.eq(i).attr('data-sub');
                        var curr = wrap.find('.form-sub[data-sub="' + sub + '"]');
                        var q = drops.eq(i).attr('data-q');
                        var p = curr.find('.drop-follow'); 
                            
                        if (p.length > 0) {
                            p.after(mapped_drops[i]); 
                        } else {
                            if (typeof drops.eq(i).attr('data-placeholder') != 'undefined') {
                                curr.append(mapped_drops[i])
                            }
                        }
                        

                    }
                }
                preview.find('form[data-category!="' + data.category + '"]').css({
                    'display': 'none'
                })
                preview.find('form[data-category="' + data.category + '"]').css({
                    'display': 'block'
                })
                preview.fadeIn(500, function () {
                    inputmask_handler();
                    $('.form-input2').find('.addmask[data-maskval!="cash"]').addClass('mask2'); 
                    $('.form-input2').find('.addmask[data-maskval!="cash"]').trigger('input'); 
                });
            });
        }
    }

}