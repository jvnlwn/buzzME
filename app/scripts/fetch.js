function continuousFetch() {
	handle = setInterval(function()  {
		var query = new Parse.Query(MessageClass);
		query.greaterThan('createdAt', allMessages.at(allMessages.length - 1).createdAt);
		query.find({
			success: function(messages) {
				allMessages.add(messages);
				display(allMessages);
				changeTitleNum( newMessageSound( messages, scrolltoBottomIf() ) );
			},
			error: function(allMessages, error) {
				console.log('you blew it')
			}
		});
		getTimeDiff();
		userIsLoggedIn();
	},
	3000);
}

function userIsLoggedIn() {
	currentLoggedInUsers.fetch({
		success: function(collection) {
			$('.active-users ul').html('');
			var klass;
			collection.each(function(user) {
				if (user.get('active')) {
					klass = 'user-is-active';
				} else { klass = 'user-is-active not-active' }
				showActiveUsers(user, klass);
			});
		}
	});
}

function getTimeDiff() {
	if (Math.abs(userActive.diff()) > 120000 && currentUser.get('active')) {
		currentUser.set('active', false);
		currentUser.save();
	} else if (Math.abs(userActive.diff()) < 120000 && (currentUser.get('active') === false)) {
		currentUser.set('active', true);
		currentUser.save();
	}
}

function showActiveUsers(user, klass) {
	$('.active-users ul').append('<li><div class="'+klass+'"></div>'+user.get('alias')+'</li>');
}

function scrolltoBottomIf() {
	var diff = getDiff();

	if ( diff - ($('.chatbox-enclosure').scrollTop()) <= 50 ) {
		scrollToBottom();
		return false;
	} else {
		return true
	};
}

function scrollToBottom() {
	$('.chatbox-enclosure').scrollTop($('.chatbox-enclosure')[0].scrollHeight);
}

function scrollToPosition(height) {
	$('.chatbox-enclosure').scrollTop(height);
}

function getDiff() {
	return $('#chatbox').outerHeight(true) - $('.chatbox-enclosure').height();
}

// sound effect for when user does not see the messages from other users
function newMessageSound(messages, unseen) {
	var numOfNewMessages = 0;
	if (unseen || !(currentUser.get('active'))) {
		var snd = new Audio('../sound-effects/floop.wav');
		messages.forEach(function(message) {
			if (message.get('alias') !== currentUser.get('alias')) {
				snd.play();
				popUpMessage(message)
				numOfNewMessages += 1;
			};
		});
	} else {numOfNewMessages = 0};

	return numOfNewMessages;
};

function popUpMessage(message) {
	$('.pop-up-name').text(message.get('alias'))
	$('.pop-up-message').text(message.get('message'))
	$('.pop-up').removeClass('show-pop-up');
	$('.pop-up').addClass('show-pop-up');
};

// this function will add to or remove the number of notifications
function changeTitleNum(numOfNewMessages) {
	var previousNum
	var title = $('title').text()

	var diff = ( $('#chatbox').outerHeight(true) - $('.chatbox-enclosure').height())

	if ( (diff - ($('.chatbox-enclosure').scrollTop())) > 50 || !(currentUser.get('active')) ) {
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



