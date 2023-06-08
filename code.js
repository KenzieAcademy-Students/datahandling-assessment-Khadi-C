// Original code from code.js
console.log("Movies:", movies);
console.log("MovieDetails:", movieDetails);

// Step One - Combine the two data sets
const combinedMovies = movies.map(movie => {
    const movieDetail = movieDetails.find(detail => detail.title === movie.title);
    return movieDetail ? { ...movie, ...movieDetail } : movie;
}).filter(movie => movie.hasOwnProperty('title'));

// Step Two - Render the movies
function renderMovies(movies) {
    const container = document.createElement('div');
    container.setAttribute('id', 'movies-container');

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        const title = document.createElement('h2');
        const image = document.createElement('img');
        const cast = document.createElement('p');
        const year = document.createElement('p');

        title.textContent = movie.title;
        image.src = movie.imageUrl;
        cast.textContent = 'Cast: ' + movie.cast.join(', ');
        year.textContent = 'Year: ' + movie.year;

        movieDiv.appendChild(title);
        movieDiv.appendChild(image);
        movieDiv.appendChild(cast);
        movieDiv.appendChild(year);

        container.appendChild(movieDiv);
    });

    document.body.appendChild(container);
}

renderMovies(combinedMovies);

// Step Three - Searching through movies
function filterMovies(searchTitle, searchActor) {
    const filteredMovies = combinedMovies.filter(movie => {
        const titleMatch = movie.title.toLowerCase().includes(searchTitle.toLowerCase());
        const actorMatch = movie.cast.some(cast => cast.toLowerCase().includes(searchActor.toLowerCase()));
        return titleMatch && actorMatch;
    });

    // Remove the existing movies container
    const existingContainer = document.getElementById('movies-container');
    if (existingContainer) {
        existingContainer.remove();
    }

    // Render the filtered movies
    renderMovies(filteredMovies);
}

document.getElementById('search-button').addEventListener('click', () => {
    const searchTitle = document.getElementById('search-title').value;
    const searchActor = document.getElementById('search-actor').value;
    filterMovies(searchTitle, searchActor);
});
