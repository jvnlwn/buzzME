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
var currentUser;

// when logged out, fetching will stop using clearInterval(handle)
var handle;

$('document').ready(function() {

	// Parse.User stuff
	clickSignUp()
	clickLogIn()
	clickLogOut()

	$('#submitmsg').click(function(event) {
		event.preventDefault();
		saveMessage();
	});

	$('#username').keydown(function(event) {
		if(event.which === 13) {
			event.preventDefault();
			userName = $('#username').val();
		}
	});

	$('#usermsg').keydown(function(event) {
		if(event.which === 13) {
			event.preventDefault();
			saveMessage();
			$(this).val('');
		}
	});

	$('.chatbox-enclosure').scroll(function() {
		if ($('.chatbox-enclosure').scrollTop() < 2) {
			pagination(25);
		};
	});
});

function signJoeIn() {
	$('.log-in-name').val('Joe VanLeeuwen'); 
	$('.log-in-password').val('buzzME')
	$('.log-in').click();
}

