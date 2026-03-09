import { getFromStorage, displayResults } from "./display.js"

const userWatchlistEl = document.getElementById('user-watchlist')
let userWatchlist = []
const watchlistLocalStorage = getFromStorage()

if(watchlistLocalStorage)
    userWatchlist = watchlistLocalStorage

console.log(userWatchlist)

fetchFilmsByIds()
    .then(data => {
        console.log(data)
        
        userWatchlistEl.innerHTML = `
            <ul>
                ${displayResults(data)}
            </ul>
        `
    })

async function fetchFilmsByIds() {
    let films = []

    for(let id of userWatchlist) {
        const response = await fetch(`http://www.omdbapi.com/?apikey=769e31a9&i=${id}`)
        const data = await response.json()
        films.push(data)
    }
    return films
}
