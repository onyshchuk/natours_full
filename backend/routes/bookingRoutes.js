const express = require('express');

const {
   getCheckoutSession,
   getUserBookings,
   createBooking,
   getBooking,
   getAllBooking,
   updateBooking,
   deleteBooking,
} = require('../controllers/bookingController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.use(protect);

router.get('/checkout-session/:tourId', getCheckoutSession);
router.get('/my', getUserBookings);

router.use(restrictTo('admin', 'lead-guide'));

router
   .route('/')
   .post(createBooking)
   .get(getAllBooking);

router
   .route('/:id')
   .get(getBooking)
   .patch(updateBooking)
   .delete(deleteBooking);

module.exports = router;
