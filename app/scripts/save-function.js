function saveMessage() {
	var message = new MessageClass();
	message.set('alias', currentUser.get('alias'));
	message.set('message', $('#usermsg').val());
	message.set('username', currentUser.get('username'));
	var time =  moment().format();
	message.set('time', time);


	// call display function here, or simply append li/span
	$('#chatbox').append('<div class="' + ifUser(message) + '"><div class="name">'+message.get('alias')+'</div><div class="message">'+message.get('message')+'</div></div>')
	scrollToBottom();

	message.save(null, {
		success: function(message) {
			console.log(message, ' it is saved');
			// probably nothing here
		},
		error: function(message, error) {
			console.log(error.description);
		}
	});
};

function clearInput(input) {
	input.val('');
}
