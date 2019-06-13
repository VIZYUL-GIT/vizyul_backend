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

const requireBody = (req, res, next) => {
  if (req.body) {
    next();
  } else {
    res.status(400).json({ status: false, message: 'No data provided'});
  }
};

module.exports = { authenticate, requireBody };