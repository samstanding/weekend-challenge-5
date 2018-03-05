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
        gender:  String,
        climate: String, 
        terrain: String,
        language: String,
        model: String,
        manufacturer: String,
        comments:[CommentSchema]
    }
)

const Comment = mongoose.model('Comment', CommentSchema, 'swapi');

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

router.put('/:id', function (req, res) {
    let id = req.params.id;
    let newComment = new Comment (req.body);
    Fave.findByIdAndUpdate(
        {
            "_id": id
        }, 
        {$push: {comments: newComment}},
        (error, doc) => {
           if (error) {
               console.log('error on comment put: ', error);
               res.sendStatus(500);
           } else {
               res.sendStatus(201);
               console.log('send comment to: ', id);
           } 
        }
    )
});



module.exports = router;