const UserSchema = require('../models/user.model');
const bcrypt = require('bcryptjs');

const userController = {}

userController.LoginPage = (req, res) => {
  if(req.session.user) {
    res.redirect('/');
  } else {
    res.render('user/login');
  }
}

userController.Login = (req, res) => {
  const errors = [];
  const {email, password} = req.body;

  if(email == '' || password == '') {
    errors.push({msg: 'Email hoặc password không được để chống'});   
  }

  if(errors.length > 0) {
    res.render('user/login', {err: errors});
  }else{
    UserSchema.findOne({email: email}, (err, user) => {
      if(err) {
        throw err;
      }

      if(user) {
        const isFlag = bcrypt.compareSync(password, user.password);
          if(isFlag == true) {
            req.session.user = user;
            console.log(user);
            res.redirect('/');
          } else {
            errors.push({msg: 'Mật khẩu không đúng'});
            res.render('user/login', {err: errors});
          }
      }
    })
  }
}

userController.RegisterPage = (req, res) => {
  const errors = [];
  if(req.session.user) {
    res.redirect('/');
  } else {
    res.render('user/register', {err: errors});
  }
}

userController.Register = (req, res) => {
  const { password, repassword, email, username } = req.body;

  const errors = [];

  if(!username || !password || !email) {
    errors.push({msg: 'Tài khoản, email hoặc mật khẩu không được để trống!'});
  }

  if(password !== repassword) {
    errors.push({msg: 'Mật khẩu phải trùng khớp'});
  }

  if(errors.length > 0) {
    res.render('user/register', {err: errors});
  } else {
    UserSchema.findOne({email: email}, (err, user) => {
      if(user) {
        errors.push({msg: 'Email đã tồn tại'});
        res.render('user/register', {err: errors});
      } else {
        const newUser = new UserSchema();
        newUser.email = email;
        newUser.username = username;
        newUser.password = bcrypt.hashSync(password, 10);

        newUser.save(err => {
          if(err) return res.json({msg: 'Error new user'});
          res.redirect('/user/login');
        })
      }
    })
  }
}

userController.Logout = (req, res) => {
  req.session.destroy();
  res.redirect('/user/login');
}

module.exports = userController;