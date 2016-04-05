var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: true });

require('dotenv').config();

module.exports = function (app, db, passport) {
    
    // function to check if user is logged in
	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/');
		}
	}
    
    // direct user to correct app if logged in or anon
    app.route('/')
        .get(function (request, response) {
    		if (request.isAuthenticated()) {
    			response.sendFile(process.cwd() + '/public/app/loggedin.html');
    		} else {
    			response.sendFile(process.cwd() + '/public/app/index.html');
    		}
            
        });
        
    // ANON APIS

        
    // LOGGED IN APIS
    // get user data
    app.route('/api/user')
        .get(isLoggedIn, function(req, res) {
			res.json(req.user);
        });
    // add image to DB
    app.route('/api/img/add')
        .post(isLoggedIn, parseUrlencoded, function(req, res) {
        	var userID = req.user._id;
        	db.collection('images').insertOne({ "img_url": req.body.imgUrl, "img_title": req.body.imgTitle }, function(err, doc) {
            	if (err) {
            		console.log(err);
            		res.status(400).json(err);
            	} else {
            		// add the activity to the user profile
                    var today = new Date;
                    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    var month = months[today.getMonth()];
                    db.collection('users').update({"_id": userID}, { $push: { "activity": { $each: [{ "title": req.body.imgTitle, "type": "added an image", "date": month + " " + today.getDate() + ", " + today.getFullYear() }], $position: 0, $slice: 50 } } });
            		res.json({"message": "You added an image to your account"});
            	}
        	});
        });

        
    // authentication routes (FIRST LOG IN)
        
	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/'
		}));
		
	app.route('/auth/facebook')
	    .get(passport.authenticate('facebook'));
	    
	app.route('/auth/facebook/callback')
		.get(passport.authenticate('facebook', {
			successRedirect: '/',
			failureRedirect: '/'
		}));
		
	
	// authorize routes (CONNECT ADDITIONAL ACCOUNT)
	// put the logic in the above authentication routes, in future could have seperate strategy as per passport docs

	
	// LOG OUT
		
	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});
		
};