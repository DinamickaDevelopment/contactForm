function validate_2($scope) {
	$scope.add_req = function() {
		if ($scope.data.required[$scope.q]) { 
		
			 $('#inp' + $scope.num).attr('required', 'required'); 
			  $('#inp' + $scope.num).addClass('req'); 
			 $('#txt' + $scope.num).attr('required', 'required'); 
			 $('#txt' + $scope.num).addClass('req'); 
		} else {
			 $('#inp' + $scope.num).removeAttr('required'); 
			 $('#inp' + $scope.num).removeClass('req'); 
	
			 $('#txt' + $scope.num).removeAttr('required'); 
			  $('#txt' + $scope.num).removeClass('req'); 

		}
	}
	

	$scope.add_patterns = function(pattern, inp) { 

		switch (pattern) {
			case 'text' : {
			
				$('#txt' + $scope.num).removeAttr('pattern');  
				inp.attr('type', 'text');
				inp.removeAttr('pattern'); 
				
				break;
			}
		    case 'name': {

		        $('#txt' + $scope.num).removeAttr('pattern');
		        inp.attr('type', 'text');
		        inp.removeAttr('pattern');
		        break; 
		    }
			case '30': {
				inp.attr('type', 'text');  
				$scope.word_limit = 30; 
				$('#txt' + $scope.num).attr('title', '30 words limit'); 
				break;
			}
			case '50': {
				inp.attr('type', 'text');  
				$scope.word_limit = 50; 
				$('#txt' + $scope.num).attr('title', '50 words limit'); 
				break; 
			}
			case 'email': {
				inp.attr('type', 'email');  
				inp.removeAttr('pattern'); 
				break; 
			} 
			case 'phone': {
				inp.attr('type', 'text');  
				inp.inputmask({mask:"(999) 999-9999",
					showMaskOnHover: false,
					showMaskOnFocus: false
				}); 
				
				inp.attr('title', 'only digits allowed');  
				
				
				break;
			} 
		    case 'phone-ext': {
		        inp.attr('type', 'text');
		        inp.inputmask({
		            mask: "(999) 999-9999 ext 9999",
		            showMaskOnHover: false,
		            showMaskOnFocus: false
		        });

		        inp.attr('title', 'only digits allowed');


		        break;
		    }
		    case 'site': {
		        inp.attr('type', 'text');
		        inp.attr('pattern', '^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})$');
		        inp.attr('title', 'Valid format: www.yoursite.com or http://www.yoursite.com');
		        break; 
		    }
		    case 'date': {
		        inp.attr('type', 'text');
		        inp.inputmask("99/99/9999", { "placeholder": "dd/mm/yyyy" });
		        break; 
		    }
			case 'nums' : {
				inp.attr('type', 'text');  

				
				if ($scope.data.info[$scope.q] == 'format') {
					switch ($scope.data.formats[$scope.q]) {
						case '9': {
						    $('#inp' + $scope.num).inputmask({mask:"99-9999999",
							showMaskOnHover: false,
							showMaskOnFocus: false
						}); 
							
							break;
						}
						case 'year': {
							$('#inp' + $scope.num).inputmask({
							mask: "9999", 
							showMaskOnHover: false,
							showMaskOnFocus: false
							}); 
							break;
						}
						case 'month': {
							$('#inp' + $scope.num).inputmask({
								mask: "99", 
								showMaskOnHover: false,
								showMaskOnFocus: false
							}); 
							break; 
						}
						case 'zip': {
						inp.inputmask({
						    mask: "99999", 
								showMaskOnHover: false,
								showMaskOnFocus: false
						}); 
						break; 
						}
					    case 'zip-multi': {
					        inp.inputmask({
					            mask: "99999[ 99999[ 99999 [99999 [99999]]]]",
                                greedy: false, 
					            showMaskOnHover: false,
					            showMaskOnFocus: false
					        });
					        break;
					    }
						case 'dollar': {
						    $("#inp" + $scope.num).maskMoney({ prefix: '$ ', allowNegative: true, thousands: ',', decimal: '.', affixesStay: true });
							break;
						}
					}
				} else {
					
					inp.attr('pattern', '^[0-9-]{1,20}$'); 
				    inp.attr('title', 'only digits allowed'); 
			
				}

			}
			
		} 
		
		$('#inp' + $scope.num).css({'color': '#162a63'}); 
	}
	
	$scope.check_required = function (req){
		if (req) return false;
		else return true; 
	}  
	
	$scope.validate_drop = function(pat, i, req) {
		if (req) {
			i.addClass('req'); 
		}
		
		$('#txt' + $scope.num).attr('type', 'text'); 
		$('#txt' + $scope.num).removeClass('req'); 
		$('#txt' + $scope.num).removeAttr('required'); 
		$('#txt' + $scope.num).removeAttr('pattern'); 
		
		switch (pat) {
			case 'text': {
				i.attr('type', 'text'); 
				break; 
			} 
			case 'zip': {
				i.inputmask({
						mask: "99999", 
						showMaskOnHover: false,
						showMaskOnFocus: false
				}); 
				break; 
			}
			case 'nums': {
					i.attr('pattern', '^[0-9-]{1,20}$'); 
				    i.attr('title', 'only digits allowed'); 
			}
		}
	}
}

module.exports = validate_2; 