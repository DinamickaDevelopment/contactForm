var form_ctrl = require('../controllers/form_ctrl');

function form_directive(app) {
    app.directive('categoryForm', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/category_form.html',
            scope: true,
            controller: function ($scope) { form_ctrl($scope) }
        }
    })
}

module.exports = form_directive; 