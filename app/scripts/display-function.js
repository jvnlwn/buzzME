function display(collection) {
	$('#chatbox').html('');

	collection.each(function(message) {
		template(message, ifUser(message));
	});
}

function ifUser(message) {
	if (message.get('username') === currentUser.get('username')) {
		return 'users-message';
	} else {return ''}
}

function template(message, klass) {
	var time = moment(message.get('time'));
	$('#chatbox').append('<div class="chat-message ' + klass + '"><div class="name ' + klass + '">'+message.get('alias')+'</div><div class="message">'+message.get('message')+'</div><div class="time-stamp">'+time.fromNow()+'</div></div>');
}