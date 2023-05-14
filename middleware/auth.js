module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.cookies['auth']) {
      return next ();
    }
    res.redirect('/')
    // if (req.isAuthenticated()) {
    //   return next()
    // } else {
    //   res.redirect('/')
    // }
    // return next();
  },
  ensureGuest: function (req, res, next) {
    // if (!req.isAuthenticated()) {
    //   return next();
    // } else {
    //   res.redirect('/dashboard');
    // }
    return next();
  },
  authorize: function (...roles) {
    return (req, res, next) => {
      // if (!roles.includes(req.user.role)) {
      //   return next(
      //     new ErrorResponse(
      //       `User role ${req.user.role} is not authorized to access this route`,
      //       403
      //     )
      //   );
      // }
      // next();
    };
  },
};
