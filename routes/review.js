const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewControllers = require("../controllers/reviews.js");

//review
//post review 

router.post("/", isLoggedIn,validateReview, wrapAsync(reviewControllers.createReview))

//deleter review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewControllers.destroyReview))

module.exports = router;