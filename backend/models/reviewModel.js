const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
   {
      review: {
         type: String,
         required: [true, 'Review can not be empty'],
      },
      rating: {
         type: Number,
         required: [true, 'rating must be provided'],
         min: [1, 'rating should be greater or equal than 1'],
         max: [5, 'rating should be less or equal than 5'],
      },
      createdAt: {
         type: Date,
         default: Date.now(),
      },
      editedAt: Date,
      tour: {
         type: mongoose.Schema.ObjectId,
         ref: 'Tour',
         required: [true, 'Review must belong to a tour'],
      },
      user: {
         type: mongoose.Schema.ObjectId,
         ref: 'User',
         required: [true, 'Review must belong to a user'],
      },
   },
   {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
      id: false,
   }
);

// this index is for unique combination in that user can leave review
// for one tour only once, and not create a bunch of reviews for it
// reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function(next) {
   this.populate({
      path: 'user',
      select: 'name photo',
   }).populate({
      path: 'tour',
      select: 'name slug',
   });
   next();
});

reviewSchema.pre('findOneAndUpdate', function(next) {
   // adding editing date to reviews
   this.set('editedAt', Date.now());
   next();
});

reviewSchema.statics.calcAverageRatings = async function(tourId) {
   const stats = await this.aggregate([
      { $match: { tour: tourId } },
      {
         $group: {
            _id: '$tour',
            nRating: { $sum: 1 },
            avgRating: { $avg: '$rating' },
         },
      },
   ]);

   if (stats.length > 0) {
      await Tour.findByIdAndUpdate(tourId, {
         ratingsQuantity: stats[0].nRating,
         ratingsAverage: stats[0].avgRating,
      });
   } else {
      await Tour.findByIdAndUpdate(tourId, {
         ratingsQuantity: 0,
         ratingsAverage: 4.5,
      });
   }
};

reviewSchema.post('save', function() {
   // this points to current review, this.constructor points to the Review model
   this.constructor.calcAverageRatings(this.tour);
});

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function(next) {
   this.rev = await this.findOne();
   next();
});

reviewSchema.post(/^findOneAnd/, async function() {
   // await this.findOne(); does NOT work here, the query has been executed
   // this needs await because it is QUERY
   await this.rev.constructor.calcAverageRatings(this.rev.tour);
});

module.exports = mongoose.model('Review', reviewSchema);
