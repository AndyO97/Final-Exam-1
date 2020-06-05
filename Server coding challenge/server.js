const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const errorHandler = require('./middleware/errorHandler');
let {Movies} = require('./models/movie-model'); 
let {Actors} = require('./models/actor-model'); 

const app = express();

/* 
    Your code goes here 
*/

app.get('api/get-actor-byName',jsonParser, (req, res) =>{
    firstName = req.query.firstName;
    lastName = req.query.lastName;

    return Actors
    .getActorByName(firstName, lastName)
    .then(actor => {
        if(!actor){
            res.statusMessage = `The actor doesnt exist`;
            return res.status(404).send();
        }
        return res.status(200).json(actor);
    })
    .catch(error => {
        res.statusMessage = `There is an error with the database`;
        return res.status(500).send();
    })
});



app.patch('api/delete-movie-actor/:movie',jsonParser, errorHandler, (req, res) =>{
    id=req.params.id;
    Bid=req.body.id;
    firstName=req.body.firstName;
    lastName=req.body.lastName;

    if(!Bid){
        res.statusMessage = `Id is missing in the body of the request`;
        return res.status(406).send();
    }
    if(id!=Bid){
        res.statusMessage = `Id and movie_ID do not match`;
        return res.status(409).send();
    }
    if(!firstName || !lastName){
        res.statusMessage = `You need to send both firstName and lastName of the actor to remove
        from the movie list.`;
        return res.status(403).send();
    }

    return Movies
    .getMovieById(id)
    .then(movie =>{
        if(!movie){
            res.statusMessage = `The movie doesnt exist`;
            return res.status(404).send();
        }
        return Actors
        .getActorByName(firstName, lastName)
        .then(actor =>{
            if(!actor){
                res.statusMessage = `The actor doesnt exist`;
                return res.status(404).send();
            }
            movie.actors.splice(actor.id);
            movie.save();
            return res.status(201).json(movie);
        })
        .catch(error =>{
            res.statusMessage = `There is an error with the database`;
            return res.status(500).send();
        })

    })
    .catch(error =>{
        res.statusMessage = `There is an error with the database`;
        return res.status(500).send();
    })
});

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});