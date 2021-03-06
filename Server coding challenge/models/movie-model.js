const mongoose = require( 'mongoose' );

const moviesSchema = mongoose.Schema({
    movie_ID : {
        type : Number,
        unique : true,
        required : true
    },
    movie_title : {
        type : String,
        required : true
    },
    year :  {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    actors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'actors',
        required : true
    }]
});

const moviesCollection = mongoose.model( 'movies', moviesSchema );

const Movies = {
    createMovie : function( newMovie ){
        return moviesCollection
                .create( newMovie )
                .then( createdMovie => {
                    return createdMovie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    /*
        Your code goes here
    */
   updateMovie : function( Pid ){
    return moviesCollection
            .findOne( {movie_ID: Pid} )
            .then( updatedMovie => {
                return updatedtedMovie;
            })
            .populate('actors', 'firstName', 'lastName')
            .catch( err => {
                throw new Error( err );
            });
    },
    getMovieById : function( Pid ){
        return moviesCollection
                .findOne( {movie_ID: Pid} )
                .then( updatedMovie => {
                    return updatedtedMovie;
                })
                .populate('actors', 'firstName', 'lastName')
                .catch( err => {
                    throw new Error( err );
                });
    },
    removeActorFromMovieList : function( Pid ){
        return moviesCollection
                .findOne( {movie_ID: Pid} )
                .then( updatedMovie => {
                    return updatedtedMovie;
                })
                .populate('actors', 'firstName', 'lastName')
                .catch( err => {
                    throw new Error( err );
                });
    }
}

module.exports = {
    Movies
};

