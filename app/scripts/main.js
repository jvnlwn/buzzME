var MessageClass = Parse.Object.extend('Message');

var MessageCollectionClass = Parse.Collection.extend({
	model: MessageClass
});

// collection of all the messages
var allMessages = new MessageCollectionClass();

var userName;

// thinking we need a global variable for the user's name.
// or, we could just take the input value from the modal. I'll base the save function off that idea for now.
// var userName;

$('document').ready(function() {

	getLatestMessages()

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

	$('.chatbox-enclosure').scroll(function() {
		if ($('.chatbox-enclosure').scrollTop() < 2) {
			getLatestMessages();
		};
	});
});

