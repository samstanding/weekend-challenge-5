const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

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
        pilots: String
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


module.exports = router;