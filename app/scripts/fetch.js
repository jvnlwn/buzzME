setInterval(function()  {
	var query = new Parse.Query(MessageClass);
	query.greaterThan('createdAt', allMessages.at(allMessages.length - 1).createdAt)
	query.find({
 		success: function(messages) {
 			allMessages.add(messages);
    		display(allMessages);
			scrolltoBottomIf(false);
  		},
  		error: function(allMessages, error) {
    		console.log('you blew it')
  		}
	})

},
3000);

function scrolltoBottomIf(forceScroll) {
	var diff = ( $('#chatbox').outerHeight(true) - $('.chatbox-enclosure').height())

	if ( diff - ($('.chatbox-enclosure').scrollTop()) <= 50 ) {
		scrollToBottom();
	}
};

function scrollToBottom() {
	$(".chatbox-enclosure").scrollTop($(".chatbox-enclosure")[0].scrollHeight);
};

function scrollToPosition(length) {
	if (length !== allMessages.length) {
		$(".chatbox-enclosure").scrollTop(300);
	};
};

