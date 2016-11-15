var prompt_handler = require('./prompt_handler'); 

module.exports = function () {
	$('.rad.y').on('click', function() {
	    $(this).addClass('checked-img'); 
		
		$(this).prev('input[type="radio"]').attr('checked', 'checked');
		var id = $(this).attr('id'); 
		
		$('#' + id + 'n').removeClass('checked-img'); 
		$('#' + id + 'n').addClass('unckecked-img'); 
		$('#' + id + 'n').prev('input[type="radio"]').removeAttr('checked')

	}); 
	
	$('.rad.n').on('click', function() {
	    $(this).addClass('checked-img');
			
		var id = $(this).attr('id'); 
		var new_id = id.replace('n', ''); 
		
		$(this).prev('input[type="radio"]').attr('checked', "checked");
		$('#' + new_id).removeClass('checked-img');
		$('#' + new_id).addClass('unchecked-img'); 
		$('#' + new_id).prev('input[type="radio"]').removeAttr('checked')
	});


	$('.radio-inp').on('click', function () {
	    var r = $(this).parent('form').parent('.active-wrap').parent('.input-wrap').find('.right');
	    var w = $(this).parent('form').parent('.active-wrap').parent('.input-wrap').find('.wrong');

	    prompt_handler($(this), r, w); 
	})
	
}