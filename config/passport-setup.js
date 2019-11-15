const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');
var configAuth = require('./keys');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});


passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    // nameField: 'name',
    // phonenumberField: 'phonenumber',
    // addressField: 'address',
    passReqToCallback: true
},
function(req, email, password, done){
    process.nextTick(function(){
        User.findOne({'local.username': email}, function(err, user){
            if(err)
                return done(err);
            if(user){
                return done(null, false, req.flash('signupMessage', 'That email already taken'));
            } 
            else {
                var newUser = new User();
                newUser.local.username = email;
                newUser.local.password = newUser.generateHash(password);
                // newUser.local.name = name;
                // newUser.local.phonenumber = phonenumber;
                // newUser.local.address = address;


                newUser.save(function(err){
                    if(err)
                        throw err;
                    return done(null, newUser);
                })
            } 
        })

    });
}));

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        process.nextTick(function(){
            User.findOne({ 'local.username': email}, function(err, user){
                if(err)
                    return done(err);
                if(!user)
                    return done(null, false, req.flash('loginMessage', 'No User found'));
                if(!user.validPassword(password)){
                    return done(null, false, req.flash('loginMessage', 'invalid password'));
                }
                return done(null, user);

            });
        });
    }
));

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({'google.googleId': profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    google:{
                    googleId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.image.url
                    }
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);

passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['email', 'displayName']
  },
  
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
        process.nextTick(function(){
            User.findOne({'facebook.id': profile.id}, function(err, user){
                if(err)
                    return done(err);
                if(user)
                    return done(null, user);
                else {
                    var newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.facebook.name = profile.name.displayName;
                    newUser.facebook.email = profile.emails[0].value;

                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser);
                    })
                    console.log(profile);
                }
            });
        });
    }

));
