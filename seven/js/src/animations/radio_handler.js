var prompt_handler = require('./prompt_handler'); 

module.exports = function () {
    $('.rad.y').on('click', function () {
        $(this).prev('input').removeClass('unchecked');
        $(this).prev('input').addClass('checked');
        $(this).prev('input').attr('checked', true); 

		var id = $(this).attr('id'); 
		console.log($('#' + id + 'n').prev('input'))
		$('#' + id + 'n').prev('input').removeClass('checked'); 
		$('#' + id + 'n').prev('input').addClass('unchecked');
		$('#' + id + 'n').prev('input').removeAttr('checked');


	}); 
	
    $('.rad.n').on('click', function () {
        $(this).prev('input').removeClass('unchecked');
        $(this).prev('input').addClass('checked');
        $(this).prev('input').attr('checked', true);
			
		var id = $(this).attr('id'); 
		var new_id = id.replace('n', ''); 
		

		$('#' + new_id).prev('input').removeClass('checked');
		$('#' + new_id).prev('input').addClass('unchecked');
		$('#' + new_id).prev('input').removeAttr('checked');

	});


	$('.radio-inp').on('click', function () {
	    var r = $(this).parent('form').parent('.active-wrap').parent('.input-wrap').find('.right');
	    var w = $(this).parent('form').parent('.active-wrap').parent('.input-wrap').find('.wrong');

	    prompt_handler($(this), true); 
	})
	
}