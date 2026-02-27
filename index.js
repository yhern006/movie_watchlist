
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')

searchForm.addEventListener('submit', searchFilm)

function searchFilm(e) {
    e.preventDefault()
    console.log('clicked')
    const filmTitle = searchInput.value
    console.log(filmTitle)
    
    fetch(`http://www.omdbapi.com/?apikey=769e31a9&t=${filmTitle}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
     })
}