const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf8'
    },
    params:{
        'api_key': API_KEY
    }
});

function createMovies(movies, container){
    let moviesList = [];
    container.replaceChildren();
    
    movies.forEach( movie  => {
        const movieContainer = document.createElement('div');
        const movieImg = document.createElement('img');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', ()=>{
            location.hash = 'movie='+movie.id
        })

        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/'+movie.poster_path);
        
        movieContainer.append(movieImg);
        moviesList.push(movieContainer);
    });
    container.append(...moviesList);
}

function createCategories(categories, container){
    let categoriesList = [];
    container.replaceChildren();

    categories.forEach( category  => {
        const categoryContainer = document.createElement('div');
        const categoryTitle = document.createElement('h3');
        const categoryText = document.createTextNode(category.name);
        categoryContainer.classList.add('category-container');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id'+category.id);
        categoryTitle.addEventListener('click', () =>{
            location.hash = `category=${category.id}-${category.name}`;
        });
        
        categoryTitle.append(categoryText);
        categoryContainer.append(categoryTitle);
        categoriesList.push(categoryContainer);
    });
    container.append(...categoriesList);

}

async function getTrendingMoviesPreveiew(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    createMovies(movies, trendingMoviesPreviewList);
}

async function getMoviesByCategory(id){
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id
        }
    });
    const movies = data.results;
    createMovies(movies, genericSection);
}

async function getCategories(){
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
    createCategories(categories, categoriesPreviewList)
}

async function getMoviesBySearch(query){
    const { data } = await api('search/movie', {
        params: {
            query
        }
    });
    const movies = data.results;
    createMovies(movies, genericSection);
}

async function getTrendingMovies(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    createMovies(movies, genericSection);
}

async function getMovieById(id){
    const { data: movie } = await api(`movie/${id}`);
    
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500/'+movie.poster_path;
    movieDetailTitle.textContent = movie.title;
    movieDetailScore.textContent = movie.vote_average
    movieDetailDescription.textContent = movie.overview
    
    headerSection.style.background = `
    linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    url(${movieImgUrl})`;
    
    createCategories(movie.genres, movieDetailCategoriesList)
    // createMovies(movie.genres, relatedMoviesContainer)
    getRelateMoviesId(id)
}

async function getRelateMoviesId(id){
    const { data } = await api(`movie/${id}/similar`);
    const movies = data.results;
    createMovies(movies, relatedMoviesContainer);
    relatedMoviesContainer.scrollTo(0, 0);
}