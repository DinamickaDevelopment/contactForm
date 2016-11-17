var data_handler = require('./data_handler'); 

module.exports = {

    send_data: function() {
        // get form data in json format
        var data = data_handler.get_json_data();
        console.log('-------form data json------');
        console.log(data);

        // send data
        var xhr = new XMLHttpRequest();

        xhr.open('POST', '/');

        xhr.send(data);
        xhr.onload = function () {
            console.log('request successful');
        }
        xhr.onerror = function () {
            console.log('request error');
        }
    }

}