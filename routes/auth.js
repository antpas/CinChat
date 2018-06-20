let passport = require('passport');
let express = require('express');
let router = express.Router();

router.get('/test', function(res,req){
    console.log("Test") 
    res.json("test")
})

//Google OAuth2
router.get('/google', 
    passport.authenticate('google', {scope: ['profile', 'email']})
);

router.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/main',
        failureRedirect: '/login'
    })
);

//Twitter OAuth
router.get('/twitter', passport.authenticate('twitter'), function(req, res) {
    return res.redirect('/');
});
router.get('/twitter/callback', 
        passport.authenticate('twitter', { 
                                successRedirect: '/main',
                                failureRedirect: '/login' }),
         function(req, res) {}); // route handler
         
module.exports = router;
