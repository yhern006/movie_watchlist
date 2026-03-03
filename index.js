const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const watchlistSection = document.getElementById('watchlist')

searchForm.addEventListener('submit', searchFilm)

function searchFilm(e) {
    e.preventDefault()
    fetchFilms(searchInput.value)
        .then(data => getFilmResultsInfo(data))
        .then(results => {
            console.log(':)')
            console.log(results)
            displayResults(results)
        })
}

async function fetchFilms(filmTitle) {
    let dataArray = []
    let tempFilmIds = []

    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=769e31a9&s=${filmTitle}&type=movie`)
        const data =  await response.json()
        dataArray = data.Search
        console.log(dataArray)
        tempFilmIds = dataArray.map(film => film.imdbID)
        console.log(tempFilmIds)
        return tempFilmIds
        //const filmResultsInfoArray = await getFilmResultsInfo(tempFilmIds)
    } catch(err){
        console.log(`ERROR: ${err}`)
    }
}

async function getFilmResultsInfo(filmIdsArray) {
    let filmResultsInfoArray = []
    for (let filmId of filmIdsArray) {
        const response = await fetch(`http://www.omdbapi.com/?apikey=769e31a9&i=${filmId}`)
        const data = await response.json()
        console.log('inside loop')
        filmResultsInfoArray.push(data)
    }
    console.log('here...')
    return filmResultsInfoArray
}

 function displayResults(resultsArray) {
    let combinedResults = resultsArray.map(result => {
        return `
            <li class='film'>
                <img class='film-poster' src=${result.Poster}/>
                <div class='film-details'>
                    <div class='film-title-rating'>
                        <h3 class='film-title'>${result.Title}</h3>
                        <p class='film-rating'><span class='star-icon'>⭐</span>${result.imdbRating}</p>
                    </div>
                    <ul class='film-info'>
                        <li>${result.Runtime}</li>
                        <li>${result.Genre}</li>
                        <li class='plus-watchlist'><i class="fa-solid fa-circle-plus"></i>Watchlist</li>
                    </ul>
                    <p class='film-plot'>${result.Plot}</p>
                </div>
            </li>
        `
    }).join("")
    console.log(combinedResults)
    watchlistSection.innerHTML = `<ul>
                                    ${combinedResults}
                                </ul>`
    watchlistSection.classList.add('foundFilms')
 }