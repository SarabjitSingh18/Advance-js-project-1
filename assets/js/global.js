'use strict';



// add event listner to mutiple elements
const addEventOnElements = function(elements, eventType, callback){
    for(const elem of elements) elem.addEventListener(eventType, callback);
}

// toggle search in the mobile /small screen devices
const searchBox= document.querySelector("[search-box]")
const searchTogglers= document.querySelectorAll("[search-toggler]")
addEventOnElements(searchTogglers,"click", function(){
    searchBox.classList.toggle("active")
})

// store movieId in local storage when you click on movie-card 

const getMovieDetail = function(movieId) {
    window.localStorage.setItem("movieId", String(movieId))
 
}


const getMovieList = function(urlParam, genreName){
    window.localStorage.setItem("urlParam", urlParam)
    window.localStorage.setItem("genreName", genreName)
}