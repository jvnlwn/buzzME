setInterval(function()  {
	allMessages.fetch({
 		success: function(allMessages) {
    // The object was refreshed successfully.
  		},
  		error: function(allMessages, error) {
    		console.log('you blew it')
  		}
	})

},
3000);
