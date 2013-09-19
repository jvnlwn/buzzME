var MessageClass = Parse.Object.extend('Message');

var MessageCollectionClass = Parse.Collection.extend({
	model: MessageClass
});

// collection of all the messages
var allMessages = new MessageCollectionClass();

// thinking we need a global variable for the user's name.
// or, we could just take the input value from the modal. I'll base the save function off that idea for now.
// var userName;

function saveMessage() {
	message = new MessageClass()
	message.set('name', $('.user-name-input').val());
	message.set('message', $('.message-input').val());

	// call display function here, or simply append li/span
	$('.chatbox').append('<div><span class="name">'+message.get('name')+'</span><span class="message">: '+message.get('message')+'</span></div>')

	message.save({
		success: function(message) {
			// probably nothing here
		},
		error: function(message, error) {
			console.log(error.description);
		}
	});
};
