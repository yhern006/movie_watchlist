let userWatchlist = []
const watchlistLocalStorage = JSON.parse(localStorage.getItem('myWatchlist'))

function getLocalStorage() {
    userWatchlist = localStorage.getItem('myWatchlist') 
}