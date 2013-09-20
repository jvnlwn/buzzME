setInterval(function()  {
	allMessages.fetch({
 		success: function(allMessages) {
    		display(allMessages);
    		scrolltoBottom()
  		},
  		error: function(allMessages, error) {
    		console.log('you blew it')
  		}
	})

},
3000);

function getLatestMessages() {
	var query = new Parse.Query(MessageClass);
	query.limit(25);
	query.descending('createdAt');
	if (allMessages.length) {
		query.lessThan('createdAt', allMessages.at(0).createdAt)
	}
	query.find({
 		success: function(messages) {
 			var switchOrder = [];
 			allMessages.each(function(message) {
 				switchOrder.push(message);
 			});

 			allMessages.reset()
 			
 			messages.forEach(function(message) {
 				switchOrder.unshift(message);
 			});
 			// switchOrder.unshift(previousMessages)
			allMessages.add(switchOrder);
    		display(allMessages);
  		},
  		error: function(allMessages, error) {
    		console.log('you blew it')
  		}
	});
};
