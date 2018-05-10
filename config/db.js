'use strict';
require("../models/task");
const mongoose = require('mongoose');

// DB credentials
// stgr99@A8FKsyESd3cIdUI8
// primary : cluster0-shard-00-00-iawj0.mongodb.net:27017
// secondary : cluster0-shard-00-01-iawj0.mongodb.net:27017
// secondary : cluster0-shard-00-02-iawj0.mongodb.net:27017

// latest driver 3.6 and above
// const uri = 'mongodb+srv://stgr99:A8FKsyESd3cIdUI8@cluster0-iawj0.mongodb.net/test?retryWrites=true';

// Driver 3.4 or earlier
const dbURI = 'mongodb://stgr99:A8FKsyESd3cIdUI8@cluster0-shard-00-00-iawj0.mongodb.net:27017,cluster0-shard-00-01-iawj0.mongodb.net:27017,cluster0-shard-00-02-iawj0.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
const options = {
    reconnectTries: Number.MAX_VALUE,
    poolSize: 10
};

mongoose.connect(dbURI, options).then(
    () => {
        console.log("Database connection established!");
    },
    err => {
        console.log("Error connecting Database instance due to: ", err);
    }
);
