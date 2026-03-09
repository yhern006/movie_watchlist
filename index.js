import { getFromStorage, displayResults, addCircleIcon } from "./display.js"

const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const watchlistSection = document.getElementById('watchlist')
let userWatchlist = []
const watchlistLocalStorage = getFromStorage()
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
    }
}

function addToWatchlist(filmId) {
    userWatchlist.push(filmId)
    localStorage.setItem('myWatchlist', JSON.stringify(userWatchlist))
    console.log('Film Added!')
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
            console.log('displaying...')
            console.log(results)
            const display_html = displayResults(results)

            watchlistSection.innerHTML = 
                `<ul>
                    ${display_html}
                </ul>`
            watchlistSection.classList.add('foundFilms')
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