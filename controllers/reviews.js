const Listing = require("../models/listing.js")
const Review = require("../models/review.js");

module.exports.createReview = async (req, res)=>{
  let listing = await Listing.findById(req.params.id);
  let review = new Review(req.body.review);
  review.author = res.locals.currentUser._id;
  listing.reviews.push(review);

  await review.save();
  await listing.save();
  req.flash("success","New Review Created!");

  res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview = async (req, res)=>{
  let {id, reviewId} = await req.params;
  await Listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success","Review Deleted!");

  res.redirect(`/listings/${id}`);
}