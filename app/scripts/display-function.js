function display(collection) {
	$('#chatbox').html('');

	collection.each(function(message) {
		var time = moment(message.get('time'));
		$('#chatbox').append('<div class="chat-message ' + ifUser(message) + '"><div class="name ' + ifUser(message) + '">'+message.get('alias')+'</div><div class="message">'+message.get('message')+'</div><div class="time-stamp">'+time.fromNow()+'</div></div>');
	});
};

function ifUser(message) {
	if (message.get('username') === currentUser.get('username')) {
		return 'users-message';
	} else {return ''};
};
