const express = require('express');

const {
   signup,
   login,
   logout,
   protect,
   restrictTo,
   forgotPassword,
   resetPassword,
   updatePassword,
} = require('./../controllers/authController');
const {
   getAllUsers,
   getMe,
   updateMe,
   deleteMe,
   createUser,
   getUser,
   updateUser,
   deleteUser,
   uploadUserPhoto,
   resizeUserPhoto,
} = require('./../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// add protect middleware to all routes that comes agter this line
router.use(protect);

router.patch('/updateMyPassword', updatePassword);

router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);

// add restrictTo (admin) middleware to all routes that comes agter this line
router.use(restrictTo('admin'));

router
   .route('/')
   .get(getAllUsers)
   .post(createUser);

router
   .route('/:id')
   .get(getUser)
   .patch(updateUser)
   .delete(deleteUser);

module.exports = router;
