const express        = require("express"),
      router         = express.Router({mergeParams: true}),
      Campground     = require("../models/campground"),
      Review         = require("../models/review"),
      reviews        = require('../controllers/reviews'),
      {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware"),
      catchAsync     = require('../utils/catchAsync');

//Review Create
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

// COMMENT DESTROY ROUTE
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;