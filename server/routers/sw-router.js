const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema ( 
    {
        author: String,
        comments: String
    }
)

const FaveSchema = new mongoose.Schema (
    {
        name: {type: String, required: true },
        birth_year:  String,
        species:  String,
        climate: String, 
        residents: String,
        language: String,
        average_lifespan: String,
        homeworld: String,
        model: String,
        manufacturer: String,
        pilots: String,
        commnets:[CommentSchema]
    }
)

const Fave = mongoose.model('Fave', FaveSchema, 'swapi');

router.post('/', function (req, res) {
    let newFave = new Fave (req.body);
    console.log('new fave is: ', newFave);
    newFave.save((error, savedFave) =>{
        if (error) {
            console.log('error on fave post: ', error);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    })
});

router.get('/', function (req, res) {
    Fave.find({}, (error, foundFaves) => {
        if (error) {
            console.log('error on get: ', error );
            res.sendStatus(500);
        } else {
            res.send(foundFaves)
        }
    })
});

router.delete('/:id', function (req, res) {
    let id = req.params.id;
    Fave.findByIdAndRemove(
        {"_id": id },
        (error, removedFave) => {
            if (error) {
                console.log('error on delete: ', error);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    )
});

module.exports = router;