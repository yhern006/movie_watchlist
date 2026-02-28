const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const watchlistSection = document.getElementById('watchlist')
let dataArray = []
let tempFilmIds = []

searchForm.addEventListener('submit', searchFilm)

async function searchFilm(e) {
    e.preventDefault()
    const filmTitle = searchInput.value
    
    const response = await fetch(`http://www.omdbapi.com/?apikey=769e31a9&s=${filmTitle}&type=movie`)
    const data =  await response.json()
    dataArray = data.Search
    console.log(dataArray)
    tempFilmIds = dataArray.map(film => film.imdbID)
    console.log(tempFilmIds)

    getFilmResultsInfo(tempFilmIds)
}

async function getFilmResultsInfo(filmIdsArray) {
    let filmResultsInfoArray = []
    for(let filmId of filmIdsArray) {
        const response = await(fetch(`http://www.omdbapi.com/?apikey=769e31a9&i=${filmId}`))
        const data = await response.json()
        
        filmResultsInfoArray.push(data)
    }
    
}

// function displayResults(resultsArray) {
//     let watchlist_html = ""

//     let combinedResults = resultsArray.map(result => {
//         return `
        
//         `
//     })    
// }