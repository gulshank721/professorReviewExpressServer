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
    console.log("req.query",req.query);
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

reviewsRouter.route("/search")
.options( cors.corsWithOptions, (req,res)=>{res.statusCode=(200);})
.get(cors.cors,(req, res,next) => {
    console.log('Request body',req.query);
    const query = req.query.q;
    console.log('Request query',query);
    //building search query for our database 
    const searchQuery = {
      $or: [
        { professorName: { $regex: query, $options: 'i' } }, // Search in title field
        { instituteName: { $regex: query, $options: 'i' } }, // Search in content field
        { instituteState: {$regex: query, $options: 'i' } } ,// search in state field
        { instituteCity: {$regex: query, $options: 'i' } }
      ]
    };
  
    // Build the search query object
  //  const searchQuery = {
  //   $text: {
  //     $search: query
  //   }
  // };
    console.log('SearchQuery',searchQuery);
    Reviews.find(searchQuery)// this is mongoose function
    .then((reviews) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true,
          results: reviews});
    }, (err) => next(err))
    .catch((err) => next(err));
    ////
    // try {
    //   const results = await Reviews.find(searchQuery);
    //   console.log(results);
    //   res.json({
    //     success: true,
    //     results: results
    //   });
    // } catch (error) {
    //   console.error("catched Error",error);
    //   res.status(500).json({
    //     success: false,
    //     message: 'Server error '+`${error}`,
    //     query: query
    //   });
    // }
  });

module.exports = reviewsRouter;