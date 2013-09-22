function continuousFetch() {
	handle = setInterval(function()  {
		var query = new Parse.Query(MessageClass);
		query.greaterThan('createdAt', allMessages.at(allMessages.length - 1).createdAt)
		query.find({
	 		success: function(messages) {
	 			console.log('fetched')
	 			allMessages.add(messages);
	    		display(allMessages);
				changeTitleNum( newMessageSound( messages, scrolltoBottomIf() ) );
	  		},
	  		error: function(allMessages, error) {
	    		console.log('you blew it')
	  		}
		})
		userIsLoggedIn();
	},
	3000);
};

function userIsLoggedIn() {
	currentLoggedInUsers.fetch({
		success: function(collection) {
			$('.active-users ul').html('');
			collection.each(function(user) {
				showActiveUsers(user);
			});
		}
	});

};

function showActiveUsers(user) {
	$('.active-users ul').append('<li>'+user.get('alias')+'</li>');
}

function scrolltoBottomIf() {
	var diff = ( $('#chatbox').outerHeight(true) - $('.chatbox-enclosure').height())

	if ( diff - ($('.chatbox-enclosure').scrollTop()) <= 50 ) {
		scrollToBottom();
		return false;
	} else { 
		return true};
};

function scrollToBottom() {
	$(".chatbox-enclosure").scrollTop($(".chatbox-enclosure")[0].scrollHeight);
};

function scrollToPosition(length) {
	if (length !== allMessages.length) {
		$(".chatbox-enclosure").scrollTop(300);
	};
};

// sound effect for when user does not see the messages from other users
function newMessageSound(messages, unseen) {
	var numOfNewMessages = 0;
	if (unseen) {
		var snd = new Audio('../sound-effects/floop.wav');
		messages.forEach(function(message) {
			if (message.get('name') !== currentUser.get('alias')) {
				snd.play();
				popUpMessage(message)
				numOfNewMessages += 1;
			};
		});
	} else {numOfNewMessages = 0};

	return numOfNewMessages;
};

function popUpMessage(message) {
	$('.pop-up-name').text(message.get('name'))
	$('.pop-up-message').text(message.get('message'))
	$('.pop-up').removeClass('show-pop-up');
	$('.pop-up').addClass('show-pop-up');
};

// this function will add to or remove the number of notifications
function changeTitleNum(numOfNewMessages) {
	var previousNum
	var title = $('title').text()

	var diff = ( $('#chatbox').outerHeight(true) - $('.chatbox-enclosure').height())

	if ( diff - ($('.chatbox-enclosure').scrollTop()) > 50 ) {
		if (title.length > 6) {
			previousNum = parseInt(title.slice(7, title.length - 1));
		} else {
			previousNum = 0
			if (numOfNewMessages > 0) {
				$('title').text('buzzME(' + (numOfNewMessages + previousNum) + ')');
			}
		};

	} else { $('title').text('buzzME') };
};



