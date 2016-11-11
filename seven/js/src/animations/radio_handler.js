var prompt_handler = require('./prompt_handler'); 

module.exports = function () {
	$('.rad.y').on('click', function() {
		$(this).css({
			'background-image': 'url(img/checked.png)'
		}) 
		
		var id = $(this).attr('id'); 
		
		$('#' + id + 'n').css({
		    'background-image': 'url(img/unchecked.png)'
		});

	}); 
	
	$('.rad.n').on('click', function() {
		$(this).css({
			'background-image': 'url(img/checked.png)'  
		})
			
		var id = $(this).attr('id'); 
		var new_id = id.replace('n', ''); 
		
		$('#' + new_id).css({
			'background-image': 'url(img/unchecked.png)'
		})

	});


	$('.radio-inp').on('click', function () {
	    var r = $(this).parent('form').parent('.active-wrap').find('.right');
	    var w = $(this).parent('form').parent('.active-wrap').find('.wrong');

	    prompt_handler($(this), r, w); 
	})
	
}