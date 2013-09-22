var MessageClass = Parse.Object.extend('Message');

var MessageCollectionClass = Parse.Collection.extend({
	model: MessageClass
});

// collection of all the messages
var allMessages = new MessageCollectionClass();

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

overlay()


});

function signJoeIn() {
	$('.log-in-name').val('Joe VanLeeuwen'); 
	$('.log-in-password').val('buzzME')
	$('.log-in').click();
}

function overlay() {
	el = document.getElementById("modal");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}





