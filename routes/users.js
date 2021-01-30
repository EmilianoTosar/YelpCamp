const express      = require('express'),
      router       = express.Router(),
	  passport     = require('passport'),
	  User         = require('../models/user'),
	  users        = require('../controllers/users'),
	  catchAsync   = require('../utils/catchAsync');

router.route('/register')
	.get(users.renderRegister)
	.post(catchAsync(users.register));

router.route('/login') 
	.get(users.renderLogin)
	.post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

module.exports = router;