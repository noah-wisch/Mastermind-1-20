
module.exports = {
    get(url, callBack) {
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.addEventListener('load', () => {
            let response = JSON.parse(request.responseText);
            callBack(response);
        });
        request.send();
    },
    post() {
        // use when needed
    },
};

/* Export Tag: */
// let ajax = require('./ajax');

/* Put this in your window: */
// ajax.get('url', showPlaceholder);

