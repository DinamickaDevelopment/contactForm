function handle_dropdown($scope) {
    

    $scope.show_sm_check = function (e) {
        
        console.log('sm check');
        var id = e.attr('id');

        var sm_check = new Vivus(id, {

            duration: 30,
            type: 'async',
            start: 'autostart',
            onReady: function () {
                $('#' + id).fadeIn(100);
            }
        }); 

    }

    $scope.show_big_check = function (e) {
        console.log('big check');

        var id = e.children[0].children[0].id;

        var big_check = new Vivus(id, {

            duration: 30,
            type: 'async',
            start: 'autostart',
            onReady: function () {
                $('#' + id).parent('.big-check-container').fadeIn(50); 
                $('#' + id).fadeIn(100);
            }
        });
    }

    $scope.sm_uncheck = function (e) {
        console.log('uncheck');
        var id = e.children[0].children[0].id; 

        $('#' + id).fadeOut(200, function () {
            $(this).find('svg').remove(); 
        })
    }

    $scope.big_uncheck = function (e) {
        console.log('big uncheck');
        var id = e.children[0].children[0].id;

        $('#' + id).fadeOut(200, function () {
            $(this).find('svg').remove();
        });
        $('#' + id).parent('.big-check-container').fadeOut(50); 
    }

}

module.exports = handle_dropdown; 