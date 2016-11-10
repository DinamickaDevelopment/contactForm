var animate_form = require('./functions/animations');
var validate = require('./functions/validation');
var validate_2 = require('./functions/validation_2');
var multi_drop = require('./functions/dropdown'); 
var multi_inputs = require('./functions/multi_inputs');
var gather_data = require('./functions/data_handler');
var check_handler = require('./functions/dropdown_checks'); 


function input_ctrl($scope, $rootScope) {

    animate_form($scope);

    $scope.inputData = [];

    $scope.isAnimating = false;

    $scope.invalid = false;

    // form values
    $scope.all_form_data = new Array($scope.q);

    $scope.curr = '';
    $scope.q = 0;
    $scope.field_data = [];

    $scope.clicked_cells = [];

    // current input data
    $scope.all_data = JSON.parse($scope.input);
    $scope.data = $scope.all_data[$scope.num];

    $scope.values = $scope.data.values[$scope.q];

    // category title 
    $scope.title = $scope.data.title;

    // all questions 
    $scope.q_all = $scope.data.placeholders.length;
    $scope.small_step = 100 / $scope.q_all;

   
    $scope.placeholder = $scope.data.placeholders[$scope.q];
    if ($scope.data.style == 'multi') $scope.placeholder = $scope.title;


    

    $scope.prompt = $scope.data.prompts[$scope.q];

    $scope.get_prompt = function () {
        $scope.prompt = $scope.data.prompts[$scope.q];
        return $scope.data.prompts[$scope.q];
    }

    $scope.word_limit = 0;
    $scope.isMulti = false;
    $scope.multi_length = new Array();

    validate($scope, $rootScope);
    validate_2($scope);
    multi_inputs($scope);
    gather_data($scope, $rootScope);
    check_handler($scope); 

    $scope.subtitle = $scope.data.subtitle;

                
    $scope.view = $scope.data.view; 

    $scope.add = $scope.data.add;
    if (!$scope.add) $scope.addtext = $scope.data.addtext; 

    //input dropdown 
    if ($scope.data.style == 'drop') {
        $scope.items = $scope.data.drop_placeholders;
        $scope.drop_placeholders = $scope.data.drop_placeholders;

    } else {

        $scope.items = [];

    }

    $scope.drop_loaded = false;

    // show dropdowns  
    $scope.counter = 0;
    $scope.down = function () {

        
        $scope.add_req();
        $scope.add_patterns($scope.data.patterns[$scope.q], $('#inp' + $scope.num));

        if ($scope.data.info[$scope.q] == 'multidrop' ||
        $scope.data.info[$scope.q] == 'drop') {
             
          
            prepare_drop();

        } else if ($scope.data.style == 'drop') {

           
            $('#txt' + $scope.num).remove(); 
            prepare_drop();

            $('#wrong' + $scope.num).animate({
                opacity: 0
            }, 200);
            $('#inp' + $scope.num).val($scope.placeholder);
            $('#inp' + $scope.num).css({
                'background-color': 'rgb(157, 171, 208)'

            });
            if ($scope.counter > 0) return false;
            $('#right' + $scope.num).on('click', function () {
                $scope.counter++;
                $('#ad' + $scope.num).slideDown(500, function () {
                    if ($scope.data.detail == '01') {
                        
                        $('#switch' + $scope.num).find('.switch-container').css({
                            'margin-top': 0
                        })
                        $('#switch' + $scope.num).css({

                            'margin-top': '-64px',
                            'padding-bottom': '64px',
                            'z-index': 99999999999
                        });


                        $('#switch' + $scope.num).fadeIn(200);
                        $scope.handle_radio();
                    }
                });
                $('#right' + $scope.num).animate({
                    marginTop: '-' + ($scope.items.length + 1) * 100 + 'px'
                }, {
                    duration: 500,
                    complete: function () {

                        for (var i = 0; i < $('.repeat' + $scope.num).length; i++) {
                            if ($scope.data.types[i] == 'r') {

                                $('.repeat' + $scope.num).eq(i).attr('disabled', 'disabled'); 
                            }
                            $scope.validate_drop($scope.data.patterns[i], $('.repeat' + $scope.num).eq(i),
                            $scope.data.required[i]);
                        }
                    }
                })

            })

        } else if ($scope.data.style == 'multi') {
            $('#inp' + $scope.num).animate({
                opacity: 0
            }, {
                duration: 200,
                complete: function () {
                    $scope.show_multi();
                }
            })
        }

        function prepare_drop() {
            $scope.values = $scope.data.values[$scope.q]; 
            $('#inp' + $scope.num).addClass('nowrite');

            $('#right' + $scope.num + ' img').attr('src', 'img/down.png').fadeIn(500, function () {
                $(this).addClass('down');
            });
            $scope.drop = true;

            multi_drop($scope);
     


            $('#right' + $scope.num).css({
                'background-color': '#1f467d'
            });

            $('#right' + $scope.num).animate({
                width: 100 + 'px',

            }, {
                duration: 300,
                complete: function () {
                    $scope.$apply(); 
                    if ($scope.data.info[$scope.q] == 'multidrop') {
                        $scope.map_drop_vals();
                    }
                }
            });
        }
    }

    // show full name input 
    $scope.name_shown = false;


    $scope.exp_name = function () {
        
        if ($scope.data.patterns[$scope.q] != 'name') return false;
        $scope.name_shown = true;
        $('#inp' + $scope.num).attr('disabled', 'disabled'); 

        $('#ni' + $scope.num).slideDown(300);
        if ($scope.data.detail == '00') {

            $('#form0').find('.input-meter').animate({
                marginTop: '150px'
            }, 400);
        }


            
      
    }

    // change question 

    $scope.change_q = function ($event) {

        //show 2 inputs! 
        if ($scope.name_shown) {
            $('#right' + $scope.num).animate({
                height: '100px',
                marginTop: '-100px'
            }, 400);
            $('#ni' + $scope.num).slideUp(400, function () {

                $scope.add_name($scope.f_n, $scope.l_n);

                $scope.name_shown = false;
                $('#inp' + $scope.num).removeAttr('disabled'); 
            });
            if ($scope.data.detail == '00') {

                $('#form0').find('.input-meter').animate({
                    marginTop: '0px'
                }, 400);
            }

        }


        $scope.add_req();
        if ($scope.invalid) return false;

        if ($event) {
            if ($event.keyCode != '13') return false;
        }

        if ($scope.q + 1 < $scope.q_all) {

            if (($scope.data.types[$scope + 1] != 'r')) {
                $('#inp' + $scope.num).removeClass('nowrite');
                $('#txt' + $scope.num).removeClass('nowrite');
            } 

            if (!$scope.drop && $scope.curr.id != 'txt' + $scope.num &&
                $scope.data.info[$scope.q] != 'leadership-pic') {


                $scope.pretty_slide();
                $scope.switch_placeholder();


            } else if ($scope.drop) {


                $scope.show_drop();
            }
            else if ($scope.curr.id == 'txt' + $scope.num && $scope.data.types[$scope.q + 1] != 't' &&
                  $scope.data.info[$scope.q] != 'leadership-pic') {
                $scope.add_generic($('#txt' + $scope.num).val());
                $scope.collapse_textarea();
                $scope.pretty_slide();

            } else if ($scope.curr.id == 'txt' + $scope.num && $scope.data.types[$scope.q + 1] == 't' &&
                  $scope.data.info[$scope.q] != 'leadership-pic') {

                $scope.pretty_slide();
                $scope.switch_placeholder(true);

            }
        }

        else {

            $scope.finish();

        }

        if ($scope.data.types[$scope.q + 1] == 'f') {

            if ($scope.data.detail == '00' && $scope.q != 7) {
                $scope.add_generic($scope.curr.value)

            }

            if ($scope.data.types[$scope.q] == 'i') {
                $scope.show_file($('#inp' + $scope.num));
            } 
        }
    }



    // input progress bar animation 

    $scope.small_progress = function (cb, q) {

        if (!q) {
            q = $scope.q;
        }

        $('#span' + $scope.num).animate({
            width: $scope.small_step * q + '%'
        }, {
            duration: 500,
            complete: function () {

                if (cb) cb();

            }
        });
    }

    // form field is done  
    $scope.f_count = 0;
    $scope.multi_fin = false; 
    $scope.finish = function (flag) {
        if ($scope.data.style == 'multi' && $scope.multi_fin > 0) return false;
        if ($scope.data.style == 'multi') $scope.multi_fin++;

        if ($('#inp' + $scope.num).find('.rad-sel') && ($scope.data.detail == '01' || $scope.data.detail == '00')) {

            var radioval = $('#form' + $scope.num).find('.rad-sel');
            console.log(radioval)

            if (radioval.hasClass('y')) {
                console.log('true')
                $scope.add_radio(true);
            } else {
                console.log('false')
                $scope.add_radio(false);
            }
        }
        else {
            if ($scope.curr.value != 'Address') {
                $scope.add_generic($scope.curr.value)
            }
        }

        $('#wrap' + $scope.num).addClass('valid-cat');

        if ($scope.get_prompt()) {
            $scope.hide_pretty_prompt();
        }

        $scope.done = true;
        $scope.q++;

        if ($scope.drop) {
            if ($scope.q > $scope.q_all) $scope.q = $scope.q_all;

            $scope.small_progress(cb1);

        }
        else {
            $scope.q = $scope.q_all;
            $scope.$apply();
            $scope.small_progress(cb2);
        }
  
        function cb1() {

            $('#right' + $scope.num).fadeOut(100, function () {
                $('#wrong' + $scope.num).fadeOut(100, function () {
                    $('#drop' + $scope.num).slideUp(500, function () {
                                    
                        if ($scope.f_count < 1 && $scope.data.detail != '01') {
                            $scope.add_drop($scope.dropvals);
                        }
                        $scope.f_count++;
                        $('#meter' + $scope.num).animate({
                            width: 100 + '%'
                        }, {
                            duration: 500,
                            complete: function () {
                                //$scope.q++;
                                $scope.$apply(); 
                                $scope.say_thanx();
                            }
                        })
                    });
                })
            });
        }

        function cb2() {

            $('#right' + $scope.num + ' img').fadeOut(300, function () {

                if ($scope.isBig && $('#txt' + $scope.num).css('opacity') != '0') {

                    $scope.hide_pretty_prompt();

                    $('#wrong' + $scope.num).fadeOut(100, function () {
                        $('#right' + $scope.num).animate({
                            height: '100px',
                            marginTop: '-100px'
                        }, {
                            duration: 100,
                            start: function () {

                                $('#txt' + $scope.num).animate({
                                    height: 95 + 'px'
                                }, {
                                    duration: 100,
                                    duration: 100,
                                    start: function () {

                                        $('#meter' + $scope.num).animate({
                                            width: 100 + '%'
                                        }, {
                                            duration: 500,
                                            complete: function () {
                                                $scope.$apply();
                                                $scope.say_thanx();
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    })

                } else {

                    $('#meter' + $scope.num).animate({
                        width: 100 + '%'
                    }, {
                        duration: 500,
                        complete: function () {
                            $scope.q = $scope.q_all;
                            $scope.$apply();
                            $scope.say_thanx();
                        }
                    })
                }

            })
        }

        $scope.send_data();
    }

    //select items in dropdown 

    $scope.clicked = 0;
    $scope.listener = false;
    
    function drop_click_handler() {
        console.log('drop click!'); 

            $('#wrong' + $scope.num).fadeOut(200, function () {
                $('#colorchange' + $scope.num).animate({
                    marginRight: '300px',
                    opacity: 0
                }, {
                    duration: 500,
                    complete: function () {
                        $('#colorchange' + $scope.num).attr('id', 'right' + $scope.num);


                        if ($scope.data.detail == '05') {
                            $('#s4').css({ 'display': 'none' });
                        }
                        $scope.p_count++;
                                        

                        if ($scope.q == $scope.q_all) {
                            $scope.finish();
                        } else {
                            if ($scope.get_prompt()) {
                                $scope.hide_pretty_prompt();
                            }
                            $('#drop' + $scope.num).slideUp(400, function () {
                                if ($scope.data.info[$scope.q] == 'drop') {
                                    $scope.add_simple_drop($scope.clicked_cells);
                                }
                                else if ($scope.data.info[$scope.q] == 'multidrop') {
                                    console.log($scope.dropvals);

                                    $scope.add_drop($scope.dropvals); 
                                }
                                
                                
                                $('#inp' + $scope.num).fadeOut(300, function () {


                                    $scope.q++;

                                    
                                    $scope.placeholder = $scope.data.placeholders[1];
                                    $scope.val = $scope.placeholder;

                                    $scope.$apply();

                                    

                                    if ($scope.q == $scope.q_all) {

                                        $scope.finish()
                                    } else {

                                   

                                        $('#inp' + $scope.num).removeClass('nowrite');
                                        $('#inp' + $scope.num).val(''); 
                                       


                                        $scope.placeholder = $scope.data.placeholders[$scope.q];
                                        $scope.$apply();
                                        $scope.small_progress(null, $scope.q);
                                    }

                                    $('#right' + $scope.num + ' img').removeClass('rotate');
                                    $('#right' + $scope.num).css({
                                        'margin-top': -100 + 'px',
                                        'margin-right': '20px',
                                        'width': '0px',
                                        'opacity': 1

                                    });

                                    $('#right' + $scope.num + ' img').css({ 'display': 'none' });

                                    $scope.$apply();
                                    console.log(null, $scope.q)

                                    if ($scope.data.types[$scope.q] == 't') {
                             
                                        $('#right' + $scope.num + ' img').attr('src', 'img/arr.png'); 
                                        $('#inp' + $scope.num).css({
                                            'cursor': 'text'
                                        })
                                        $scope.drop = false;
                                        $scope.isMulti = false; 

                                        $scope.exp_textarea(true); 
                                    

                                    } else if ($scope.data.types[$scope.q] == 'i' || $scope.data.types[$scope.q] == 'r') {
                                        $('#right' + $scope.num + ' img').attr('src', 'img/arr.png');
                                        $('#inp' + $scope.num).css({
                                            'cursor': 'text'
                                        })

                                        if ($scope.data.types[$scope.q] == 'r') {
                                            $('#inp' + $scope.num).addClass('nowrite'); 
                                        }
                                         
                                        $scope.drop = false;
                                        $scope.isMulti = false;
                                        $scope.isBig = false;
                                       

                                        $(this).fadeIn(300, function () {

                                            $scope.isAnimating = false;

                                            $scope.$apply();
    
                                        });

                                    }
                                    else {
                                        $(this).fadeIn(300);
                                    }
                                })
                            })
                        }
                    }
                })
            })
        
    }
     
    $scope.drop_num = 0;
    $scope.select_items = function ($event) {
     
        if (!$scope.isMulti) {
           
            $('#right' + $scope.num).attr('id', 'colorchange' + $scope.num);
            $('#colorchange' + $scope.num).css({
                'background-color': '#28d68c'
            });

        } 
       
        function add_listener() {
           
            if ($scope.listener) return false;
            $('#right' + $scope.num).attr('id', 'colorchange' + $scope.num);
 
                $scope.listener = true;
            

            $('#colorchange' + $scope.num).on('click', drop_click_handler); 
            
        }

        add_listener();
        if ($event.target.classList.contains('big-check-container') || 
            $event.target.classList.contains('sm-check')) {

            $event.target.parentElement.dispatchEvent(new MouseEvent('click')); 
            return false; 
        }
        if ($event.target.classList.contains('selected') && !$event.target.classList.contains('drop-item')) {

            $event.target.style.backgroundColor = '#c3cbe1';
            $event.target.style.color = '#9dabd0';


            if ($event.target.classList.contains('small-cell')) {
               
                //hide small check!!! 
                $scope.sm_uncheck($event.target);

                console.log($scope.dropvals)
                $scope.dropvals.vals.pop(); 
                         
                            
                $event.target.style.backgroundColor = 'rgb(177, 189, 220)';
                $event.target.style.color = 'rgb(108, 124, 167)';


            }
            if (!$event.target.classList.contains('drop-item') && $event.target.classList.contains('cell')) {
                // hide big check!!! 
                $scope.big_uncheck($event.target);

                $scope.clicked_cells.pop();
                console.log($scope.clicked_cells)
            }


            $event.target.classList.remove('selected');

        } else {

            if ($event.target.classList.contains('arrow-up') ||
            $event.target.classList.contains('multi-arr') || $event.target.classList.contains('nowrite')) return false;

            $scope.curr.style.backgroundColor = '#c3cbe1';
            $scope.curr.style.color = '#8a97bb';

            $scope.drop = true;
            $event.target.style.backgroundColor = '#9dabd0';
            $event.target.style.color = '#162a63'
            $scope.show_right();


            $event.target.classList.add('selected');
            if (!$event.target.classList.contains('drop-item') && $event.target.classList.contains('cell')) {
                // show big check!!!  
                if (!$('#colorchange' + $scope.num).find('img').hasClass('rotate')) {
                    $('#colorchange' + $scope.num).find('img').addClass('rotate');
                }
               
                $scope.show_big_check($event.target);

                $scope.clicked_cells.push($event.target.innerText);
            }


            if ($event.target.classList.contains('small-cell')) {
                           
                $scope.drop_success();
                $('#right' + $scope.num).attr('id', 'colorchange' + $scope.num);
                $('#colorchange' + $scope.num).css({
                    'background-color': '#28d68c'
                })
            }
        }
    }
}

module.exports = input_ctrl;