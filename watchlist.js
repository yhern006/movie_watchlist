import { displayResults } from "./display.js"

const userWatchlistEl = document.getElementById('user-watchlist')
let userWatchlist = []
const watchlistLocalStorage = JSON.parse(localStorage.getItem('myWatchlist'))

function getLocalStorage() {
    userWatchlist = localStorage.getItem('myWatchlist') 
}

displayResults(userWatchlistEl, userWatchlist)
