const express = require('express');
const Task = require('../models/task');
const router = express.Router();

// define the home page route
router.get('/', function (req, res) {
    Task.find({}, (err, task) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(task);
    });
});

// define the about route
router.post('/', function (req, res) {
    const newTask = new Task(req.body);
    newTask.save((err, task) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).json(task);
    });
});

module.exports = router;