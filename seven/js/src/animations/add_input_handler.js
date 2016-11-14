module.exports = function () {
    $('.add-btn').on('click', function (e) {
        var target_id = e.target.dataset.tid;

        $('#' + target_id).slideDown(300, function () {
            $(this).find('input').addClass('shown');
        });
    });
}