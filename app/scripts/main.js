var MessageClass = Parse.Object.extend('Message');

var MessageCollectionClass = Parse.Collection.extend({
	model: MessageClass
});

var CurrentUserCollectionClass = Parse.Collection.extend({
	model: Parse.User,
	query: (new Parse.Query(Parse.User)).equalTo('loggedIn', true)
});

// collection of all the messages
var allMessages = new MessageCollectionClass();

// collection of all logged in users
var currentLoggedInUsers = new CurrentUserCollectionClass();

// this is the variable Parse uses when specifying the current user.
var currentUser = null;

// when logged out, fetching will stop using clearInterval(handle)
var handle;

// keep track of whether use is active or not.
var userActive = moment();

$('document').ready(function() {

	// Parse.User stuff
	clickSignUp();
	clickLogIn();
	clickLogOut();

	$('#submitmsg').click(function(event) {
		event.preventDefault();
		saveMessage();
		$('#usermsg').val('');
		userActive = moment();
	});

	$('#usermsg').keydown(function(event) {
		if(event.which === 13) {
			event.preventDefault();
			saveMessage();
			$(this).val('');
			userActive = moment();
		}
	});

	$('.change-alias').keydown(function(event) {
		if(event.which === 13) {
			event.preventDefault();
			currentUser.set('alias', $(this).val());
			showAlias();
			currentUser.save();
			$(this).val('');
			userActive = moment();
		}
	});

	$('.chatbox-enclosure').scroll(function() {
		userActive = moment();
		if ($('.chatbox-enclosure').scrollTop() < 2) {
			pagination(25);
		}
	});

	$('html').click(function() {
		userActive = moment();
	});

	overlay();

});

function overlay() {
	var el = document.getElementById('modal');
	el.style.visibility = (el.style.visibility == 'visible') ? 'hidden' : 'visible';
}

