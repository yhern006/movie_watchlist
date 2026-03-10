import { getFromStorage, displayResults, watchlistClicked } from "./display.js"

const userWatchlistEl = document.getElementById('user-watchlist')
let userWatchlist = []
const watchlistLocalStorage = getFromStorage()

if(watchlistLocalStorage)
    userWatchlist = watchlistLocalStorage

try {
    if(userWatchlist.length > 0) {
        fetchFilmsByIds()
            .then(data => {
                let films_html = `
                    <ul>
                        ${displayResults(data)}
                    </ul>
                `
                userWatchlistEl.innerHTML = films_html
                userWatchlistEl.classList.add('foundFilms')
            })
    }
} catch(err) {
    console.log(`ERROR: ${err}`)
}

async function fetchFilmsByIds() {
    let films = []

    for(let id of userWatchlist) {
        const response = await fetch(`http://www.omdbapi.com/?apikey=769e31a9&i=${id}`)
        const data = await response.json()
        films.push(data)
    }
    return films
}

userWatchlistEl.addEventListener('click', function(e) {
    if(e.target.dataset.add) {
        watchlistClicked(e)
        updateDisplay()
    }
})

function loadEmptyWatchlist() {
    const emptySection_html = `
        <h3 class="empty-user-watchlist">Your watchlist is looking a little empty...</h3>
        <a class="empty-user-watchlist"
            href="index.html">
            <i class="fa-solid fa-circle-plus"></i>
            <p>Let's add some movies!</p>
        </a>`
    document.getElementById('user-watchlist').innerHTML = emptySection_html
}

function updateDisplay() {
    if(getFromStorage().length === 0) {
        loadEmptyWatchlist()
    }
    else {
        const iEl = document.querySelector("i.fa-circle-plus")
        const elementToRemove = document.querySelector(`li#${iEl.dataset.add}`)
        elementToRemove.remove()
    }
}
