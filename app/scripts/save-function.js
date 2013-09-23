function saveMessage() {
	var message = new MessageClass();
	message.set('alias', currentUser.get('alias'));
	message.set('message', $('#usermsg').val());
	message.set('username', currentUser.get('username'));
	var time =  moment().format();
	message.set('time', time);

	// call display function here, or simply append li/span
	var klass = 'users-message';
	template(message, klass)
	scrollToBottom();	

	message.save(null, {
		success: function(message) {
		},
		error: function(message, error) {
			console.log(error.description);
		}
	});
};

function clearInput(input) {
	input.val('');
}
