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
    // get all images limit to 100 at a time
    app.route('/api/imgs/all')
    	.get(function(req, res) {
    		db.collection('images').find().sort({$natural:-1}).limit(100).toArray(function(err, results) {
            	if (err) {
            		console.log(err);
            		res.status(400).json(err);
            	} else {
            		res.json(results);
            	}
    		});
    	});
    // BONUS could page through (with skip) images then limit to 100 for each page, as a bonus to improve the app
        
    // LOGGED IN APIS
    // get user data
    app.route('/api/user')
        .get(isLoggedIn, function(req, res) {
			res.json(req.user);
        });
    // get user my images limit to 100 at a time
    app.route('/api/imgs/my')
    	.get(isLoggedIn, function(req, res) {
        	var userID = req.user._id;
    		db.collection('images').find({ "user": userID }).sort({$natural:-1}).limit(100).toArray(function(err, results) {
            	if (err) {
            		console.log(err);
            		res.status(400).json(err);
            	} else {
            		res.json(results);
            	}
    		});
    	});
    // add image to DB
    app.route('/api/img/add')
        .post(isLoggedIn, parseUrlencoded, function(req, res) {
        	var userID = req.user._id;
        	db.collection('images').insertOne({ "img_url": req.body.imgUrl, "img_title": req.body.imgTitle, "user": userID }, function(err, doc) {
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
    // delete img from DB
    app.route('/api/img/delete/:imgurl(*)')
    	.delete(isLoggedIn, function(req, res) {
        	var userID = req.user._id;
        	var imgurl = req.params.imgurl;
        	db.collection('images').findAndModify({ "img_url": imgurl, "user": userID }, { "_id": 1 }, { remove: true }, function(err, doc) {
            	if (err) {
            		console.log(err);
            		res.status(400).json(err);
            	} else {
            		// add the activity to the user profile
                    var today = new Date;
                    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    var month = months[today.getMonth()];
                    db.collection('users').update({"_id": userID}, { $push: { "activity": { $each: [{ "title": doc.value.img_title, "type": "deleted an image", "date": month + " " + today.getDate() + ", " + today.getFullYear() }], $position: 0, $slice: 50 } } });
            		res.json({"message": "You deleted an image from your account"});
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