export default function checkNotAuth(req, res, next) {
  if (res.locals.user) return res.redirect('/');
  next();
}
