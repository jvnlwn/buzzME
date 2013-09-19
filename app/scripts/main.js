var MessageClass = Parse.Object.extend('Message');

var MessageCollectionClass = Parse.Collection.extend({
	model: MessageClass
});

// collection of all the messages
var allMessages = new MessageCollectionClass();

// thinking we need a global variable for the user's name.
// or, we could just take the input value from the modal. I'll base the save function off that idea for now.
// var userName;

$('document').ready(function() {

	$('#submitmsg').click(function(event) {
		event.preventDefault();
		saveMessage();
	});
<<<<<<< HEAD
});
=======
};





>>>>>>> master
