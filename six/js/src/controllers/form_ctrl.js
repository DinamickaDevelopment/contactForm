var get_data = require('../data'); 

function form_ctrl($scope) {
    $scope.type = ''; 
                
    console.log('cat index' + $scope.cat_index)
    $scope.subs = get_data($scope)[$scope.cat_index];
    console.log($scope.subs);

    var clicked = 0;
     

    $scope.map_vals1 = function (a, i, c, p) {
        console.log(p);

        
        if (c.info[p] != 'multidrop') return false;
        var d = c.drops[0];

            if (c.data.length > 0) {
                var vals = c.data[p].vals;

                if (typeof vals != 'undefined') {

                  
                 
                    for (var j = 0; j < d.length; j++) {
                        for (var f = 0; f < vals.length; f++) {
                                if (a == vals[f]) {
                                    return true;
                                }
                        }
                    }
                }
            }
        
    } 
	
	$scope.map_vals2 = function(a, i, c, p) {
	    console.log(p);
        
	    if (c.info[p] != 'drop') return false; 
	    var d = c.values[p];
	    
	    if (c.data.length > 0 && d.length > 0) {
	        var vals = c.data[p].cats; 

	        for (var j = 0; j < d.length; j++) {
	            for (var f = 0; f < vals.length; f++) {
	                if (a == vals[f]) {
	                    return true;
	                }
	            }
	        }
	    }
	}

	window.subs = $scope.subs;
	$scope.upload = function (e, ct, i) {
	    e.target.onchange = function () {
	        var file = document.forms[0]['f' + i].files[0]; 
	        $('#f' + i).text('Current file: ' + file.name); 
	    }
	}

    $scope.switch_radio = function ($event) {
        clicked++;
        if (clicked % 2 == 0) return false; 

        var id = $event.currentTarget.id;

        var e = $('#' + id);

        var y = e.find('.y'); 
        var n = e.find('.n');

        if (y.hasClass('radsel2')) {
            y.removeClass('radsel2');
            n.addClass('radsel2'); 
        } else {
            n.removeClass('radsel2');
            y.addClass('radsel2');
        }
    }
}

module.exports = form_ctrl; 