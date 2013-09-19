function display(collection) {
	$('#chatbox').html('');

	collection.each(function(message) {
		$('#chatbox').append('<div class="' + ifUser(message) + '"><span class="name">'+message.get('name')+'</span><span class="message">: '+message.get('message')+'</span></div>');
	});
};

function ifUser(message) {
	if (message.get('name') === userName) {
		return 'users-message';
	} else {return ''};
}