'use strict';

// import all the components  and functions

import { sidebar } from "./sidebar.js";
import { api_key, imageBaseURL, fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./movie-card.js";
import { search } from "./search.js";

const pageContent = document.querySelector("[page-content]");

sidebar();



// home page sections (top Rated , upcoming , trending)
const homePageSections =[
    {
        title: "Upcoming Movies",
        path: "/movie/upcoming"

    },
    {
        title: "Weekly Trending Movies",
        path: "/trending/movie/week"
    },
    
    {
        title: "Top Rated Movies",
        path: "/movie/top_rated"
    }
  
]








const genreList = {
    //create genre string from genre _id eg-->>[23, 43] --> "action, romance"

    asString(genreIdList) {
        let newGenreList = [];
        for (const genreId of genreIdList) {
            this[genreId] && newGenreList.push(this[genreId]);//this == genreList

        }
        return newGenreList.join(", ");
    }
};
fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, function ({ genres }) {
    for (const { id, name } of genres) {
        genreList[id] = name;
        

    }
    fetchDataFromServer(`https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`, heroBanner);
});






const heroBanner = function ({ results: movieList }) {
    const banner = document.createElement("section")
    banner.classList.add("banner")
    banner.ariaLabel = "Popular Movies"

    banner.innerHTML = `
    <div class="banner-slider"> </div>


            <div class="slider-control">
                <div class="control-inner"> </div>


            </div>

    `;
    let controlItemIndex = 0;

    for (const [index, movie] of movieList.entries()) {
        const {
            backdrop_path,
            name,
            title,
            release_date,
            genre_ids,
            overview,
            poster_path,
            first_air_date,
            vote_average,
            id
        } = movie;

        const sliderItem = document.createElement("div")
        sliderItem.classList.add("slider-item")
        sliderItem.setAttribute("slider-item", "");

        sliderItem.innerHTML =`
        <img src="${imageBaseURL}w1280${backdrop_path}" alt="${name}" class="img-cover" loading=${index === 0 ? "eager" : "lazy"}>
        <div class="banner-content">
            <h2 class="heading">${name}</h2>
            <div class="meta-list">
                <div class="meta-item">${first_air_date}</div>
                <div class="meta-item card-badge">${vote_average.toFixed(1)} </div>
            </div>
            <p class="genre">${genreList.asString(genre_ids)}</p>
            <p class="banner-text">${overview}

            </p>

            <a href="./detail.html" class="btn" onclick="getMovieDetail(${id})">
                <img src="./assets/images/play_circle.png" width="24" height="24" aria-hidden="true" alt="play cirlce">
                <span class="span">Watch Now</span>
            </a>
        </div>

        `;

        banner.querySelector(".banner-slider").appendChild(sliderItem);

        const controlItem = document.createElement("button")
        controlItem.classList.add("poster-box", "slider-item")
        controlItem.setAttribute("slider-control", `${controlItemIndex}`);

        controlItemIndex++;

        controlItem.innerHTML = `
        <img src="${imageBaseURL}w154${poster_path}" alt="Slide to ${title}" loading="lazy" draggable="false" class="img-cover">
        `;
        banner.querySelector(".control-inner").appendChild(controlItem)
    }

    pageContent.appendChild(banner);

    addHeroSlide();


    // fetch data for homepage sections
    for (const { title , path } of homePageSections){   
        fetchDataFromServer(`https://api.themoviedb.org/3${path}?api_key=9031bdf765f54700dfa9f20d959534fb&page=1` , createMovieList , title);

}







}
 // hero slider functinality
const addHeroSlide = function (){
   const sliderItems = document.querySelectorAll("[slider-item]");
   const sliderControls = document.querySelectorAll("[slider-control]")
   let lastSliderItem = sliderItems[0];
   let lastsliderControl = sliderControls[0];

   lastSliderItem.classList.add("active")
   lastsliderControl.classList.add("active")

   const sliderStart = function(){
    lastSliderItem.classList.remove("active")
    lastsliderControl.classList.remove("active")


// this == sliderControls
    sliderItems[Number(this.getAttribute("slider-control"))].classList.add("active")
    this.classList.add("active")
    lastSliderItem = sliderItems[Number(this.getAttribute("slider-control"))];
    lastsliderControl = this;




   }

   addEventOnElements(sliderControls, "click", sliderStart);
   



}

const createMovieList = function({results: movieList}, title){
    const movieListElem = document.createElement("section")
    movieListElem.classList.add("movie-list");
    movieListElem.ariaLabel = `${title}`;

    movieListElem.innerHTML  = `

    <div class="title-wrapper">
    <h3 class="title-large">${title}</h3>
</div>

<div class="slider-list">
    <div class="slider-inner">
        <div class="movie-card">
            <figure class="poster-box card-banner">
                <img src="./assets/images/slider-control.jpg" alt="" class="img-cover">
            </figure>

            <h4 class="title"> Puss in Boots: The Last Wish</h4>

            <div class="meta-list">
                <div class="meta-item">
                    <img src="./assets/images/star.png" width="20" height="20" loading="lazy" alt="rating">
                    <span class="span">8.4</span>

                </div>

                <div class="card-badge">
                    2022
                </div>
            </div> 
            <a href="./detail.html" class="card-btn" title="Puss in Boots: The Last Wish"></a>
        </div>
       
    </div>
</div>
    `;


    for (const movie of movieList){
        const movieCard = createMovieCard(movie);

        movieListElem.querySelector(".slider-inner").appendChild(movieCard)

    }
pageContent.appendChild(movieListElem)
}


search()