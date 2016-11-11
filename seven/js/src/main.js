require('../lib/jquery.router.js');
require('../lib/inputmask.js');
require('../lib/jquery.maskMoney.js'); 
require('../lib/vivus.min.js'); 

var radio_handler = require('./animations/radio_handler.js');
var inputmask_handler = require('./validation/inputmask_handler');
var focus_handler = require('./animations/focus_handler.js');
var question_change_handler = require('./animations/question_change_handler.js');
var file_handler = require('./animations/file_handler.js');
var add_input_handler = require('./animations/add_input_handler.js'); 

//var dropdown_handler = require('./animations/dropdown_handler.js');

window.onload = function () {
    radio_handler();
    inputmask_handler();
    focus_handler();
    question_change_handler();
    file_handler();
    add_input_handler(); 



}