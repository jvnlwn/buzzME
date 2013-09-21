function display(collection) {
	$('#chatbox').html('');

	collection.each(function(message) {
		$('#chatbox').append('<div class="chat-message ' + ifUser(message) + '"><div class="name">'+message.get('name')+'</div><div class="message">: '+message.get('message')+'</div></div>');
	});
};

function ifUser(message) {
	if (message.get('name') === userName) {
		return 'users-message';
	} else {return ''};
};
