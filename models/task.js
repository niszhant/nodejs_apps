'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskName: {
        type: String,
        required: true
    },
    createOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', TaskSchema);