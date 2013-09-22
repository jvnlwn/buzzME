function signUp() {
	var user = new Parse.User();
	user.set("username", $('.sign-up-name').val());
	user.set("password", $('.sign-up-password').val());
	user.set("email",    $('.sign-up-email').val());
	user.set("alias",    $('.sign-up-alias').val());
 
	user.signUp(null, {
	  success: function(user) {
	    console.log('yayayaya');
	    modalOffExample();
	  },
	  error: function(user, error) {
	  	currentUser = Parse.User.current();
	    // Show the error message somewhere and let the user try again.
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
};

function logIn() {
	Parse.User.logIn($('.log-in-name').val(), $('.log-in-password').val(), {
	  	success: function(user) {
	  		currentUser = Parse.User.current();
	  		modalOffExample();
	    	alert('Hey, ' + user.get('username'))
	  	},
	  	error: function(user, error) {
	    	// Show the error message somewhere and let the user try again.
	    	if ( error.code === 101) {
	    		alert('Username or Password are invalid.');
	    	}
	    	// alert("Error: " + error.code + " " + error.message);
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
		logIn()
	});
};

function clickLogOut() {
	$('.logout').click(function() {
		Parse.User.logOut();
		currentUser = Parse.User.current();
		clearInterval(handle);
		console.log(currentUser);

	});
};

// must only be called one time!!! will have to figure out how we'll call it.
function modalOffExample() {
	pagination(25);
	continuousFetch();
}
