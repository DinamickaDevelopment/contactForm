var input_ctrl = require('../controllers/input_ctrl'); 

function input_directive(app) {

    app.directive('prettyInput', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/input.html',
            scope: {
                num: '=',
                input: '@input'
            },
            replace: false,
            controller: function ($scope, $rootScope) { input_ctrl($scope, $rootScope) }
        }
    })
}

module.exports = input_directive; 