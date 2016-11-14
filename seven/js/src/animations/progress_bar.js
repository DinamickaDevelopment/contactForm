module.exports = function (q, max, bar, s, cb, elem) {

    q--;

    var step = 100 / max;
    var width = step * q + '%';

    bar.animate({
        width: width
    }, {
        duration: 300,
        complete: function () {
            if (cb) cb(elem);
        }
    });

    s.html(q + '/' + max);

}