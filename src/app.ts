const loadingText = document.querySelector(".loading") as HTMLElement;
const wrapper = document.querySelector(".movie-wrapper") as HTMLElement;

async function getAllMovies() {
    const response = await fetch("https://swapi.dev/api/films/");
    const listOfMovies = await response.json();
    return listOfMovies.results
}

function showAllMovies() {
    console.log("Loading");

    getAllMovies().then((listOfMovies)=>{
        loadingText.style.display = "none";

        let movieObj = listOfMovies;
        movieObj.forEach((entries: any) => {

            const movieCard = document.createElement('div');
            movieCard.className = "movieCard";
            wrapper.append(movieCard);

            let property: keyof typeof entries;
            for(property in entries){
                if(property === "title"){     
                    const movieHeader = document.createElement('h3');
                    movieHeader.innerHTML = `${entries[property]}`;
                    movieCard.append(movieHeader);
                }
                else if(property === "director"){
                    const director = document.createElement('p');
                    director.innerHTML = `Director: ${entries[property]}`;
                    movieCard.append(director);
                }
                else if(property === "release_date"){
                    const releaseDate = document.createElement('p');
                    releaseDate.innerHTML = `Release date: ${entries[property]}`;
                    movieCard.append(releaseDate);
                }
                else if(property === "opening_crawl"){
                    const openingCrawl = document.createElement('p');
                    openingCrawl.innerHTML = `Opening Crawl: ${entries[property]}`;
                    movieCard.append(openingCrawl);
                }
            };
        });
    });
};

showAllMovies();