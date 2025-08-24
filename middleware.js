const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./Schema.js");
const Review = require("./models/review.js");



module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    if(req.method != "GET"){
      req.session.redirectURL = "/listings";
    }else{
    req.session.redirectURL = req.originalUrl;
    }
    console.log(req.originalUrl, req.method);
    req.flash("error", "You must be login first for this.");
    return res.redirect("/login");
  };
  next();
};


module.exports.redirectURL = (req, res, next)=>{
  res.locals.url = req.session.redirectURL;
  next();
}

module.exports.isOwner = async (req, res, next)=>{
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if(res.locals.currentUser && !listing.owner.equals(res.locals.currentUser._id)){
    req.flash("error", "you are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.validateListing = (req, res, next)=>{
  let{error} = listingSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400, errMsg);
  }else{
    next();
  }
}

module.exports.validateReview = (req, res, next)=>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400, errMsg);
  }else{
    next();
  }
}

module.exports.isReviewAuthor = async (req, res, next)=>{
  console.log("inside the review author");
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if(review && !review.author.equals(res.locals.currentUser._id)){
    req.flash("error", "you are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
}