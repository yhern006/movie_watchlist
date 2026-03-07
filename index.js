const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const watchlistSection = document.getElementById('watchlist')
let userWatchlist = []
const watchlistLocalStorage = JSON.parse(localStorage.getItem('myWatchlist'))
console.log(watchlistLocalStorage)

if(watchlistLocalStorage){
    userWatchlist = watchlistLocalStorage
}

searchForm.addEventListener('submit', searchFilm)
watchlistSection.addEventListener('click', watchlistClicked)

function watchlistClicked(e) {
    const filmId = e.target.dataset.add
    console.log(e.target)
    if(filmId) {
        if(userWatchlist.includes(filmId)) {
            removeFromWatchlist(filmId)
        }
        else {
            addToWatchlist(filmId)
        }
        const liEl = e.target
        liEl.innerHTML = addCircleIcon(filmId)
        console.log(userWatchlist)
    }
}

function addToWatchlist(filmId) {
    userWatchlist.push(filmId)
    localStorage.setItem('myWatchlist', JSON.stringify(userWatchlist))
    console.log('Film Added!')
    //console.log(this.querySelector(`li[data-add=${filmId}]`))
    //const liEl = this.querySelector(`li[data-add=${filmId}]`)
    //liEl.innerHTML = addCircleIcon(filmId)
}

function removeFromWatchlist(filmId) {
    const index = userWatchlist.indexOf(filmId)
    userWatchlist.splice(index, 1)
    console.log('Removed Film!')
    localStorage.setItem('myWatchlist', JSON.stringify(userWatchlist))
}

function searchFilm(e) {
    e.preventDefault()
    console.log('clicked')
    fetchFilms(searchInput.value)
        .then(data => getFilmResultsInfo(data))
        .then(results => {
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
        
        tempFilmIds = dataArray.map(film => film.imdbID)
        console.log(tempFilmIds)
        return tempFilmIds
    } catch(err){
        console.log(`ERROR: ${err}`)
    }
}

async function getFilmResultsInfo(filmIdsArray) {
    let filmResultsInfoArray = []
    for (let filmId of filmIdsArray) {
        const response = await fetch(`http://www.omdbapi.com/?apikey=769e31a9&i=${filmId}`)
        const data = await response.json()
        
        filmResultsInfoArray.push(data)
    }
    
    return filmResultsInfoArray
}

function addCircleIcon(filmId) {
    if(userWatchlist.includes(filmId)) {
        return `<i class="fa-solid fa-circle-minus"
                    data-add='${filmId}'></i>Remove`
    }
    else {
        return `<i class="fa-solid fa-circle-plus"
                    data-add='${filmId}'></i>Watchlist`
    }
}

 function displayResults(resultsArray) {
    console.log('...')
    let combinedResults = resultsArray.map(result => {
        return `
            <li class='film' id='${result.imdbID}'>
                <img class='film-poster' src=${result.Poster}
                    alt='Poster for ${result.Title}'/>
                <div class='film-details'>
                    <div class='film-title-rating'>
                        <h3 class='film-title'>${result.Title}</h3>
                        <p class='film-rating'><span class='star-icon'>⭐</span>${result.imdbRating}</p>
                    </div>
                    <ul class='film-info'>
                        <li>${result.Runtime}</li>
                        <li>${result.Genre}</li>
                        <li class='plus-watchlist' data-add='${result.imdbID}'>
                            ${addCircleIcon(result.imdbID)}
                        </li>
                    </ul>
                    <p class='film-plot'>${result.Plot}</p>
                </div>
            </li>
        `
    }).join("")

    watchlistSection.innerHTML = `<ul>
                                    ${combinedResults}
                                </ul>`
    watchlistSection.classList.add('foundFilms')
 }