'use strict'


const api_key= '9031bdf765f54700dfa9f20d959534fb'
const imageBaseURL= 'http://image.tmdb.org/t/p/'


// fetch data from the server
// and pass the result in the json file


const fetchDataFromServer = function(url, callback, optionalParam) {
    fetch(url).then(response => response.json()).then(data=> callback(data, optionalParam));

}

export{ imageBaseURL, api_key, fetchDataFromServer };



