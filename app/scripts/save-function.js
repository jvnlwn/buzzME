function saveMessage() {
	var message = new MessageClass();
	message.set('name', userName);
	message.set('message', $('#usermsg').val());

	// call display function here, or simply append li/span
	$('#chatbox').append('<div><span class="name">'+message.get('name')+'</span><span class="message">: '+message.get('message')+'</span></div>')

	message.save({
		success: function(message) {
			console.log(message, ' it is saved')
			// probably nothing here
		},
		error: function(message, error) {
			console.log(error.description);
		}
	});
};