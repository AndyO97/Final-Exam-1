const mongoose = require( 'mongoose' );

const actorsSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    actor_ID : {
        type : Number,
        unique : true,
        required : true
    }
});

const actorsCollection = mongoose.model( 'actors', actorsSchema );

const Actors = {
    createActor : function( newActor ){
        return actorsCollection
                .create( newActor )
                .then( createdActor => {
                    return createdActor;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    /*
        Your code goes here
    */
    deleteActor : function( PFirstName, PLastName ){
    return actorsCollection
            .findOneAndDelete( {firstName: PFirstName, lastName: PLastName} )
            .then( deletedActor => {
                return deletedActor;
            })
            .catch( err => {
                throw new Error( err );
            });
    },
    findActor : function( PFirstName, PLastName ){
        return actorsCollection
                .findOne( {firstName: PFirstName, lastName: PLastName} )
                .then( Actor => {
                    return Actor;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    getActorByName : function( PFirstName, PLastName ){
        return actorsCollection
                .findOne( {firstName: PFirstName, lastName: PLastName} )
                .then( Actor => {
                    return Actor;
                })
                .catch( err => {
                    throw new Error( err );
                });
    }
}

module.exports = {
    Actors
};

