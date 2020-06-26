const express = require('express');

const {
   aliasTopTours,
   getAllTours,
   createTour,
   getTour,
   getTourBySlug,
   updateTour,
   deleteTour,
   getTourStats,
   getMonthlyPlan,
   getToursWithin,
   getDistances,
   uploadTourImages,
   resizeTourImages,
} = require('./../controllers/tourController');
const { protect, restrictTo } = require('./../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// param (id) middleware - runs only when url contain "id" parameter
// router.param('id', checkID);

router.use('/:tourId/reviews', reviewRouter);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router
   .route('/monthly-plan/:year')
   .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

router
   .route('/tours-within/:distance/center/:latlng/unit/:unit')
   .get(getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(getDistances);

router
   .route('/')
   .get(getAllTours)
   .post(protect, restrictTo('admin', 'lead-guide'), createTour);

// /api/v1/tours/:id/:optinal-parameter? (optional parameter with "?" at the end)
router
   .route('/:id')
   .get(getTour)
   .patch(
      protect,
      restrictTo('admin', 'lead-guide'),
      uploadTourImages,
      resizeTourImages,
      updateTour
   )
   .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

router.route('/slug/:slug').get(getTourBySlug);

module.exports = router;
