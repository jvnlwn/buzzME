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
