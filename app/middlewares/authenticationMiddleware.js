export function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    res.status(401).json({ redirect: "/api/pages/login" });
  }
}
