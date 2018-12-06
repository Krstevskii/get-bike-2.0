if(process.env.NODE_ENV === 'production'){
    module.exports = {
        mongoURI: 'mongodb+srv://krstevskii:Gf59nOTwvCq9vA7V@client-messages-get-bike-lwabb.mongodb.net/comments?retryWrites=true'
    };
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost:27017/comments'
    }
}