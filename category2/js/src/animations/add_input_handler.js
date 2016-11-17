module.exports = function () {
    $('.add-btn').on('click', function (e) {
        var target_id = e.target.dataset.tid;

        $('#' + target_id).slideDown(300, function () {
            $(this).find('.map-input').removeClass('hidden-addition');
            $(this).find('.map-input').addClass('shown');
        });
    });
}