function signUp() {
	var user = new Parse.User();
	user.set("username", $('.sign-up-name').val());
	user.set("password", $('.sign-up-password').val());
	user.set("email",    $('.sign-up-email').val());
	user.set("alias",    $('.sign-up-alias').val());
	user.set("loggedIn", true);
	user.set("active",   true);
 
	user.signUp(null, {
	  success: function(user) {
	  	overlay();
	  	clearInputs()
	  	currentUser = Parse.User.current();
	  	var klass = 'user-is-active'
	  	showActiveUsers(user, klass);
	    modalOffExample();
	  },
	  error: function(user, error) {
	    // Show the error message somewhere and let the user try again.
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
};

function logIn() {
	Parse.User.logIn($('.log-in-name').val(), $('.log-in-password').val(), {
	  	success: function(user) {
	  		overlay();
	  		clearInputs()
	  		currentUser = Parse.User.current();
	  		showAlias();
	  		var klass = 'user-is-active'
	  		showActiveUsers(currentUser, klass);
	  		// add loggedIn and active keys
	  		currentUser.set("loggedIn", true);
	  		currentUser.set("active", true);
	  		currentUser.save(null, {
				success: function() {
	  				modalOffExample();
				}
			});
	  	},
	  	error: function(user, error) {
	    	// Show the error message somewhere and let the user try again.
	    	if ( error.code === 101) {
	    		alert('Username or Password are invalid.');
	    	} else {console.log("Error: " + error.code + " " + error.message)}
	  	}
	})
};

function clickSignUp() {
	$('.sign-up').click(function() {
		signUp();
	});
};

function clickLogIn() {
	$('.log-in').click(function() {
		logIn();
	});
};

function clickLogOut() {
	$('.logout').click(function() {
		currentUser.set("loggedIn", false);
		currentUser.set("active", false);
		currentUser.save(null, {
			success: function() {
				logOut();
				overlay();
			},
			error: function(error) {
				console.log(error.description)
			}
		});
	});
};

function logOut() {
	$('.active-users ul').html('');
	Parse.User.logOut();
	currentUser = Parse.User.current();
	clearInterval(handle);
}

function showAlias() {
	$('.current-user').text(currentUser.get('alias'));
}

// must only be called one time!!! will have to figure out how we'll call it.
function modalOffExample() {
	pagination(25);
	continuousFetch();
}

function clearInputs() {
	$('#modal input').each(function(arg) {
		$(this).val('');
	})
}

