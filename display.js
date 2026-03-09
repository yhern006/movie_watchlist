export function getFromStorage() {
    return JSON.parse(localStorage.getItem('myWatchlist'))
}

export function displayResults(resultsArray) {
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

    return combinedResults
}

export function addCircleIcon(filmId) {
    const currentWatchlist = getFromStorage()
    if(currentWatchlist.includes(filmId)) {
        return `<i class="fa-solid fa-circle-minus"
                    data-add='${filmId}'></i>Remove`
    }
    else {
        return `<i class="fa-solid fa-circle-plus"
                    data-add='${filmId}'></i>Watchlist`
    }
}