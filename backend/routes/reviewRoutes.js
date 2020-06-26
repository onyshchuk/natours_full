const express = require('express');

const {
   setTourUserIds,
   getReview,
   createReview,
   getAllReviews,
   updateReview,
   deleteReview,
} = require('./../controllers/reviewController');
const { protect, restrictTo } = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router
   .route('/')
   .post(protect, restrictTo('user'), setTourUserIds, createReview)
   .get(getAllReviews);

router.use(protect);

router
   .route('/:id')
   .get(getReview)
   .patch(restrictTo('user', 'admin'), updateReview)
   .delete(restrictTo('user', 'admin'), deleteReview);

module.exports = router;
