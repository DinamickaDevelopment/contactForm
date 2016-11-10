function multi_drop($scope) {
	$scope.drop_open = false; 
	
	$scope.dropvals = {
	    cat: '',
        vals: []
	};
	$scope.map_drop_vals = function() {

		    $scope.isMulti = true; 
		    var cells = $('#drop' + $scope.num).children('.cell'); 
		
		    var drops = $('.multi'); 

		    $scope.curr_drop = false; 
	        
		    for (var i = 0; i < cells.length; i++) { 
		
			    cells.eq(i).addClass('drop-item'); 
			
			    for (var j = 0; j < $scope.data.drops[i].length; j++) {
                    
			        var small_cell = '<div class="small-cell">' + $scope.data.drops[i][j] +
                       '<span class="small-check">' + 
                        `<svg class="sm-check" version="1.1" id="sm${i}${j}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="75px" height="75px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                        <path fill="none" stroke="#fff" stroke-linecap="round" stroke-width="5" stroke-miterlimit="5" id="checkmark" d="M41.8,18.4L24.061,35.045l-1.838,1.524c-1,1-2.049,0.238-3.049-0.762L8.8,26.9
                                    c-0.925-1.495-0.477-2.571,0.106-3.109l0.583-0.045c0.135-0.224,0.852,0.045,1.659,0.493l10.223,8.519l17.486-16.096
                                    c0.763-0.717,2.152-1.435,2.646-1.166L42.04,15.9C42.398,16.528,42.8,17.4,41.8,18.4z"></path>
				        </svg>`
                      + '</span>' + '</div>';

				    drops.eq(i).append(small_cell);   
				    drops.eq(i).children().eq(j).on('click', function (e) {
				        //if ($scope.dropvals.cat != e.target.parentElement.id) {
				        //    $scope.dropvals.vals = []; 
				        //}
				        if (!e.target.classList.contains('selected')) {
				            if (e. target.classList.contains('small-cell')) {
				                $scope.show_sm_check($(this).find('svg'));

				                if (!$('#colorchange' + $scope.num).find('img').hasClass('rotate')) {
				                    $('#colorchange' + $scope.num).find('img').addClass('rotate');
				                }
				            }
				            $scope.dropvals.cat = e.target.parentElement.id;
				            $scope.dropvals.vals.push(e.target.innerText)
				        }

				    })

			    }
			
			    cells.eq(i).attr('data-bound', '0'); 
			
                
			    cells.eq(i).on('click', function (e) {
			      
			        var bound = e.target.dataset.bound;

			        if (e.target.classList.contains('selected') && $scope.drop_open && 
				    !e.target.classList.contains('small-cell')) {
					
			            $scope.drop_open = false; 
			            $(this).find('.multi-arr').find('img').removeClass('rotate2'); 
			            $('.multi').fadeOut(100); 
					
			        }
			        if (!$(this).hasClass('selected2')) {
			            $(this).find('.multi-arr').find('img').removeClass('rotate2'); 
			            $(this).find('.multi-arr').removeClass('open2');
			            //$(this).find('.multi').css({ 'display': 'block' });
			        }

			        $('.selected2').removeClass('selected2'); 
			        $(this).addClass('selected2');
			        $(this).addClass('sel');  

			        $scope.deselect(e); 

			        var self = $(this); 

			        self.css({
			            'background-color': '#9dabd0',
			            'color': '#162a63'
			        })
			        var small_drop = $(this).find('.multi'); 
			        var arr = $(this).find('.multi-arr');
				
			        
			        arr.fadeIn(200, function() { 
					
			            $scope.curr_drop = e.target;
				  
			            $scope.drop_open = true;
				    
			             if (bound < 1) { 
			            $(this).on('click', handler);  
			            e.target.dataset.bound++; 
			            function handler(e) {
						
	
			                if ($(this).hasClass('open') && !$(this).hasClass('closedrop')) { 
						     
			                    small_drop.css({ 'display': 'block' });
			                    arr.find('.arrow-up').addClass('rotate2');

			                    arr.addClass('closedrop');
			                    arr.removeClass('open');
						
			                }
			                else if ($(this).hasClass('closedrop') && !$(this).hasClass('open')) {
                                
			                    small_drop.fadeOut(100, function() { 
		
			                        self.find('.closedrop').find('img').removeClass('rotate2'); 
			                        self.find('.closedrop').addClass('open'); 
			              
										
			                        self.find('.multi-arr').fadeOut(300); 

			                        //self.find('.small-cell').css({
			                        //    'background-color': '#b1bddc',
			                        //    'color': '#6c7ca7' 
			                        //}); 
										 
			                        self.find('.small-cell').removeClass('selected');
			                        $scope.drop_open = false; 
			             
			                    });
			                }
	
			                if ($(this).hasClass('closedrop') && $(this).hasClass('open') && !$(this).hasClass('open2')) {
			                    self.find('.closedrop').find('img').addClass('rotate2');
			                    $(this).addClass('open2'); 
			                    small_drop.css({ 'display': 'block' });
			    
			                    
			                }

			                else if ($(this).hasClass('open2')) {
                               
			                    small_drop.fadeOut(200);
			                    self.find('.multi-arr').find('img').removeClass('rotate2');
			                    $(this).removeClass('open2');
			                }
			            }
			        }
			     })
		    })
	    }
    }
	
	$scope.deselect = function(e) {

	    var drop = $('#drop' + $scope.num);

		drop.children('.cell').not('.sel').css({
					 'background-color': '#c3cbe1', 
					 'color': '#9dabd0'
		})
 
		
		drop.children('.sel').removeClass('sel');
		if (!e.target.classList.contains('arrow-up') && !e.target.classList.contains('small-cell') && !e.target.classList.contains('multi-arr')) {
		 

		    drop.children('.cell').not('.sel').find('.multi-arr').fadeOut(200);
		   
		    //drop.children('.cell').not('.sel').removeClass('open2'); 
		}
		
		drop.children('.selected').removeClass('selected'); 
		
	}
}

module.exports = multi_drop; 