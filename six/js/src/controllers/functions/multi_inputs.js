function multi_inputs($scope) {

    $scope.init_multi = function () {
        if ($scope.data.multi) {
            $scope.multi_inputs = $scope.data.multi[$scope.q];
            $scope.multi_length = new Array($scope.multi_inputs.placeholders.length);
            $scope.multi_placeholders = $scope.multi_inputs.placeholders;
            $scope.multi_patterns = $scope.multi_inputs.patterns;
            $scope.multi_prompts = $scope.multi_inputs.prompts;
            $scope.multi_formats = $scope.multi_inputs.formats;
        }
    }

    $scope.init_multi(); 
    function map_multi() {
        for (var i = 0; i < $scope.multi_length.length; i++) {
            $scope.validate_multi($scope.multi_patterns[i], $('#mi' + i), $scope.multi_formats[i]);
        }
    }

    $scope.show_multi = function () {

        $('#inp' + $scope.num).fadeOut(300, function () {
            $('#m' + $scope.num).css({
                'height': '100px',
                'display': 'block',
                'opacity': '0'
            });
            $('#right' + $scope.num).animate({
                marginTop: '-200px', 
                height: '200px'
  
            }, 300)
           // $('#m' + $scope.num).find('.form-input').trigger('focus');
            $('#m' + $scope.num).animate({
                height: '200px',
                opacity: 1
            }, {
                duration: 300,
                complete: function () {
                    map_multi();
                
                
                }
            })
        });
	}

    $scope.validate_multi = function (pattern, inp, format) {

        inp.inputmask('remove');
        inp.maskMoney('destroy'); 

        switch (pattern) {
            case 'text': {
                inp.attr('type', 'text');
      
                break; 
            }
            case 'nums': {
                switch (format) {
                    case 'dollar': {
                        inp.maskMoney({ prefix: '$ ', allowNegative: true, thousands: ',', decimal: '.', affixesStay: true });
                        break;
                    }
                    case 'year': {
                        inp.inputmask({
                            mask: "9999",
                            showMaskOnHover: false,
                            showMaskOnFocus: false
                        });
                        break; 
                    }
                    case 'month': {
                        inp.inputmask({
                            mask: "99",
                            showMaskOnHover: false,
                            showMaskOnFocus: false
                        });
                    }
     
                }
                break; 
            }
        }
    }

    var counter = 0;
    $scope.change_multi = function () {

        function fade_inp(cb) {

            $('#m' + $scope.num).fadeOut(300, function () {
        
                // handle formdata here!  
                

                counter++;


                if (counter % 2 != 0) {
                    $scope.add_multi($(this).find('input'));
                }
                if ($scope.q < $scope.q_all - 1) {
                    
                    if (counter % 2 == 0) return false;
                    cb();
                    $scope.q++;
                    $scope.init_multi();
                    $scope.$apply();
                    map_multi();

                    $(this).find('input').val('');


                    $(this).fadeIn(300);
                } else {
                    $scope.add_multi($(this).find('input'));
                    $('#m' + $scope.num).css({
                        'display': 'block',
                        'opacity': 0
                    });


                    cb(cb2);

                    function cb2() {

                        $('#m' + $scope.num).animate({
                            height: '100px'
                        },
                        {
                            duration: 300,
                            start: function () {
                                $('#meter' + $scope.num).css({
                                    'margin-top': 0
                                })
                            },
                            complete: function () {
                                $scope.finish(); 
                            }
                        })
                    }
                }
            })
        }

        function cb(cb) {
            $('#right' + $scope.num).animate({
                marginRight: '200px',
                opacity: 0
            }, {
                duration: 500,
                start: function () {
                    $('#span' + $scope.num).animate({
                        width:  $scope.small_step * ($scope.q+1) + '%'
                    })
                },
                complete: function () {

                    if (!cb) {
                        $(this).css({
                            'width': 0 + 'px',
                            'margin-right': '20px',
                            'opacity': 1
                        });
                    } 

                    $(this).find('img').css({'display': 'none'})
                    
                    if (cb) cb(); 
                }
            })
        }

        if ($scope.prompt_id != '') {
            $scope.hide_multi_prompt(fade_inp, cb);
        } else {
 
            fade_inp(cb);
        }
    
    }

    $scope.handle_input = function ($event) {
        
        $scope.show_multi_prompt($event.target.dataset.index, $event.target.dataset.num);

        $event.target.style.color = 'rgb(31, 70, 125)';

        $('#right' + $scope.num).animate({
            'width': '100px'
        }, {
            duration: 300,
            complete: function () {
                $(this).find('img').fadeIn(300);
            }
        })
    }

    $scope.prompt_id = '';
    $scope.prompts_shown = [0,0]

    $scope.curr_m = 0;
    $scope.show_multi_prompt = function (i, index) {
        if ($scope.multi_fin > 0) return false;

        if ($scope.multi_prompts[index]) {
            if ($scope.prompts_shown[index] >= 1) return false;
            $scope.prompts_shown[index]++; 
            $scope.prompt_id = i;
            $('#right' + $scope.num).animate({
                height: $('#right' + $scope.num).height() + 60 + 'px'
            }, 200);

            $('#form' + $scope.num).find('.input-meter').animate({
                marginTop:  $scope.curr_m + 60 + 'px'
            }, {
                duration: 200,
                complete: function () {
                    //$('#form' + $scope.num).animate({
                    //    height: $('#right' + $scope.num).height() + 100 + 'px'
                    //})
                    $scope.curr_m = 60; 
                }
            });

            $('#' + i).slideDown(200, function () {
                $(this).find('span').fadeIn(200); 
            })
        }
    }

    $scope.hide_multi_prompt = function (cb, cb2) {

            var h1 = 60 * $scope.prompts_shown;
            var h2 = 100 * $scope.prompts_shown;

            $('#right' + $scope.num).animate({
                height: 200 + 'px'
            }, 200);
            $('#form' + $scope.num).find('.input-meter').animate({
                marginTop: 0 + 'px'
            }, 200);

             $scope.prompts_shown = [0,0];
             $scope.curr_m = 0; 

            $scope.prompt_id = '';
            $('#m' + $scope.num).find('.multi-prompt').slideUp(200, function () {
                cb(cb2);
            })
       
    }
    
}

module.exports = multi_inputs; 