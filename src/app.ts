const loadingText = document.querySelector(".loading") as HTMLElement;
const wrapper = document.querySelector(".movie-wrapper") as HTMLElement;

async function getAllMovies() {
    const response = await fetch("https://swapi.dev/api/films/");
    const listOfMovies = await response.json();
    return listOfMovies
}

async function getRndImg(){
    const response = await fetch ("https://api.thecatapi.com/v1/images/search?limit=6")
    const data = await response.json();
    return data
}

function showAllMovies() {
    console.log("Loading");

    getAllMovies().then((listOfMovies)=>{
        loadingText.style.display = "none";

        for (let i = 0; i< listOfMovies.results.length; i++){          
 
            const imgElem = document.createElement("img") as HTMLImageElement;
            imgElem.className = "rndImg";
            getRndImg().then((data)=>{
                imgElem.src = data[i].url;
            })

            const movieCard = document.createElement('div');
            movieCard.className = "movieCard";
            const movieHeader = document.createElement('h3');
            const director = document.createElement('p');
            const releaseDate = document.createElement('p');
            const openingCrawl = document.createElement('p');

            movieHeader.innerHTML = `${listOfMovies.results[i].title}`;
            director.innerHTML = `Director: ${listOfMovies.results[i].director}`;
            releaseDate.innerHTML = `Release date: ${listOfMovies.results[i].release_date}`;
            openingCrawl.innerHTML = `Opening Crawl: ${listOfMovies.results[i].opening_crawl}`;

            wrapper.append(movieCard);
            movieCard.append(imgElem, movieHeader, director, releaseDate, openingCrawl);
        }
    });
};

showAllMovies();