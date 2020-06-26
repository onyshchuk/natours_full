// This function is wrapped around every function that needs
// try catch bock, to actualy avoid this block and just use
// catch on promise that returned by async function
// .catch(next) is the same as .catch(err => next(err))
module.exports = fn => {
   return (req, res, next) => {
      fn(req, res, next).catch(next);
   };
};
