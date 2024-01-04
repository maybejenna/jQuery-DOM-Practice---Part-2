function saveMoviesList() {
    const moviesListHtml = $('#movies-list').html();
    localStorage.setItem('moviesList', moviesListHtml);
}

function getStarRating(rating) {
    let stars = "";
    for (let i = 0; i < 5; i++, rating -= 2) {
        if (rating >= 2) {
            stars += "★";
        } else if (rating === 1) {
            stars += "½"; 
        } else {
            stars += "☆";
        }
    }
    return stars;
}

$(document).ready(function() {
    $('#movie-form').on('submit', function(e) {
        e.preventDefault();


        const title = $('#title').val();
        const rating = $('#rating').val();
        const posterUrl = $('#poster-url').val();
        const stars = getStarRating(parseInt(rating));
        const movieItem = `<li class="movie-card" style="background-image: url('${posterUrl}');">
                            <div class="movie-content">
                                <div class="card-front">
                                    <p> ${title} - <span class="star-rating">${stars}</span> (${rating}/10) </p> 
                                    <button class="commentButton">Comment</button>
                                </div>
                                <div class="card-back">
                                    <textarea id="comment" placeholder="Leave a comment (max 100 words)" rows="4"></textarea>
                                    <button class="save-comment">Save</button>
                                </div>
                            </div>
                                <button class="removebtn">X</button>
                            </li>`;

    

        $('#movies-list').append(movieItem);

        $('#title').val('');
        $('#rating').val('');
        $('#poster-url').val('');
        
        saveMoviesList();
    });

    $('#movies-list').on('click', '.commentButton', function() {
        $(this).closest('.movie-card').toggleClass('flipped');
    });

    $('#movies-list').on('click', '.save-comment', function() {
        $(this).closest('.movie-card').toggleClass('flipped');
        saveMoviesList();
    });

    $('#movies-list').on('click', '.removebtn', function() {
        $(this).closest('.movie-card').remove();
        saveMoviesList();
    });

    if (localStorage.getItem('moviesList')) {
        $('#movies-list').html(localStorage.getItem('moviesList'));
    }
});