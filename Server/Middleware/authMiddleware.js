
// middleware for session Authentication
function isAuthenticated(req, res, next) {
    if (req.session.user) {
      return next(); // user is authenticated, proceed
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
  
  module.exports = isAuthenticated;
  