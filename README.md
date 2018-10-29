## Movies Website

* By Marcel Kowalik
* Student Number: 20076466
* Applied Computing

### Access to Project
* Server on Heroku: [LINK](https://mk-movies-website.herokuapp.com).
* Github link: [LINK](https://github.com/MarcelKowalik/MovieWebsite).


### Functionality and DX approach

I'm creating a website that stores movies and actors. It will allow to create an account for users that will store liked movies and allow to add reviews from the account. I'm planning on adding actors to movies and view movies that each actor played in. I'm planning to add other features to the website too. 

### Persistence
* Movies and Actors are stored in Mongo noSQL database, which is hosted on mlab.
* I have created two collections Movies and actors. Reviews are stored inside Movies. Users are not yet adapted into the project/Database.


### Routes

#### Put
app.put('/movies/:id/Uvote', movies.incrementUpvotes);    //Adds an upvote to an Movie.

app.put('/movies/:id/Dvote', movies.incrementDownvotes);    //Down votes a Movie.

app.put('/movies/:id/changeGenre', movies.changeGenre);   //Changes the Genre of a Movie.

#### Get
app.get('/movies', movies.findAll);   //Finds all Movies.

app.get('/movies/votes', movies.findTotalVotes);    //Find the total amount of votes.

app.get('/movies/FindByTitle/:title', movies.findMovieByTitle);   //Finds a Movie by title.

app.get('/movies/FindByGenre/:genre', movies.findMovieByGenre);   //Finds a Movie by genre.

app.get('/actors', actors.findAll);   //Finds all actors.

#### Post
app.post('/movies',movies.addMovie); //Adds a Movie.

app.post('/movies/:id/Review', movies.addMovieReview);    //Adds a Review.

app.post('/actors',actors.addActor);    //Adds an Actor.

#### Delete
app.delete('/movies/:id', movies.deleteMovie);    //Deletes a Movie.

app.delete('/movies/:id/DeleteReview/:reviewId', movies.deleteReview);    //Deletes a Review.

app.delete('/actors/:id', actors.deleteActor);    //Deletes an Actor

### References
Most of the project was created following [David Drohan's labs](https://ddrohan.github.io/wit-wad-2-2018/index.html) labs.

* Database [MongoDB](https://www.mongodb.com)
* Database hosted on [mlabs](https://mlab.com/).
* Server on [Heroku](https://www.heroku.com).
