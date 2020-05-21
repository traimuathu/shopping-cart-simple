const handle = {};

handle.findOneData = (model, agm) => {
  return new Promise((resolve, reject) => {
    model.findOne(agm, (err, data) => {
      if(err) reject(err);
      if(data) resolve(data);
      return resolve();
    })
  })
}

handle.isLoggedIn = (req, res, next) => {
  if(req.session.user) {
    next();
  } else {
    res.redirect('/user/login');
  }
}

module.exports = handle;