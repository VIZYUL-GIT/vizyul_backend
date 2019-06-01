const authenticate = (req, res, next) => {
  if(process.env.NODE_ENV === 'production') {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({ status: false, message: 'Not logged in'});
    }
  } else {
    next();
  }
};

module.exports = authenticate;