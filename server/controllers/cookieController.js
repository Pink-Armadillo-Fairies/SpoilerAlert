const cookie = {}

cookie.setSSIDCookie = (req, res, next) => {
  const userId = res.locals.user.id; 
  // console.log('hit setSSID middleware with userID', userId);
  res.cookie('ssid', userId, { httpOnly : true }); 
  return next();
}

module.exports = cookie;