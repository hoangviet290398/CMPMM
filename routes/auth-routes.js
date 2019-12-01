const router = require('express').Router();
const passport = require('passport');
var flash = require("connect-flash");
router.use(flash());

// auth login
router.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
});
router.post('/login', passport.authenticate('local-login'),(req, res) => {
   
    res.json({message:"Login successfully!"});
});

router.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});


router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
    res.json({message:"user created"});
       
});
// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/profile', isLoggedIn, function(req, res){
    res.render('profile.ejs', { user: req.user });
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));


// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('http://localhost:4200/');
});

//auth with facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: 'http://localhost:4200/',
        failureRedirect: '/'
    }));

router.get('/connect/local', function(req, res) {
    res.render('connect-local.ejs', { message: req.flash('signupMessage') });
});

router.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/connect/local',
    failureFlash: true
}));

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/login');
}

module.exports = router;