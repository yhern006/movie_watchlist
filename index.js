import { getFromStorage, displayResults, watchlistClicked } 
    from "./display.js"

const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const searchListSection = document.getElementById('search-list')
let userWatchlist = []
const watchlistLocalStorage = getFromStorage()
console.log(watchlistLocalStorage)

if(watchlistLocalStorage){
    userWatchlist = watchlistLocalStorage
}

searchForm.addEventListener('submit', searchFilm)
searchListSection.addEventListener('click', watchlistClicked)

function searchFilm(e) {
    e.preventDefault()
    fetchFilms(searchInput.value)
        .then(data => getFilmResultsInfo(data))
        .then(results => {
            console.log(results)
            const display_html = displayResults(results)

            searchListSection.innerHTML = 
                `<ul>
                    ${display_html}
                </ul>`
            searchListSection.classList.add('foundFilms')
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