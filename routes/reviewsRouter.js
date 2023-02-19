var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');


const Reviews = require('../models/reviews');

// var router = express.Router();
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
const reviewsRouter = express.Router();
reviewsRouter.use(bodyParser.json());

reviewsRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next)=>{

    Reviews.find(req.query)// this is mongoose function
    // .populate('comments.author') // including the author field in commments.
    .then((reviews) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(reviews);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,(req,res,next)=>{
    Reviews.create(req.body) // this is mongoose function passing body of request
    .then((review) => {
        console.log('Review Created ', review);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(review);
    }, (err) => next(err))
    .catch((err) => next(err));
})


module.exports = reviewsRouter;