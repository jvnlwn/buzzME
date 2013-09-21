var MessageClass = Parse.Object.extend('Message');

var MessageCollectionClass = Parse.Collection.extend({
	model: MessageClass
});

// collection of all the messages
var allMessages = new MessageCollectionClass();

var userName;

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

	$('#usermsg').keydown(function(event) {
		if(event.which === 13) {
			event.preventDefault();
			saveMessage();
			$(this).val('');
		}
	});

	$('.chatbox-enclosure').scroll(function() {
		if ($('.chatbox-enclosure').scrollTop() < 2) {
			getLatestMessages();
		};
	});
});

