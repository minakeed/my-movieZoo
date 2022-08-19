const ApiURL ='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=486e843c8e217d1a22a01f2ccc6cc28d&page=1';

const imgPath = 'https://image.tmdb.org/t/p/w1280';

const searchURL = 'https://api.themoviedb.org/3/search/movie?api_key=486e843c8e217d1a22a01f2ccc6cc28d&query="'

const form = document.getElementById('form')

const search = document.getElementById('search')

const main = document.getElementById('main')

    getMovies (ApiURL)

async function getMovies (url){
    const res = await fetch (url)
    const data = await res.json()
    
    showMovies(data.results)
}

function showMovies (movies){
     main.innerHTML = ''

     movies.forEach(movie => {
        const {title, poster_path, vote_average, overview}= movie

        const movieEl = document.createElement ('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = ` <div class="movie">
        <img src="${imgPath  + poster_path}" alt="${title}"   >
        
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
            `

        main.appendChild(movieEl)
     });
}


function getClassByRate(vote){
    if (vote >= 8){
        return 'green'
    }else if (vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}

// const green = document.querySelector('green')

// green.style.backround-color ='green'

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm !== ''){
        getMovies (searchURL + searchTerm)

        search.value = ''
    }else{
        window.location.reload ()
    }
})