/*global describe, it */
'use strict';
(function () {

	describe('buzzME', function() {

		this.timeout(15000);

		it('should save a message to Parse', function(done) {
			var result;

			var message = new MessageClass();
			$('#username').val('Bob');
			var messageContent = 'My message number ' + Math.floor(Math.random()*100000);

			$('#usermsg').val(messageContent);

			$('#submitmsg').click();

			setTimeout(function() {
				var query = new Parse.Query(MessageClass);
				query.equalTo('message', messageContent);
				query.find({
					success: function(results) {
						result = results[0];
						setTimeout(function() {
							expect(result.get('message')).to.equal(messageContent);
							done();
						},2000)
					}
				})
			},2000);
		});

		it('should fetch new data every three seconds', function(done) {
			var message = new MessageClass();
			var messageContent = 'Greatest message ever # ' + Math.floor(Math.random()*100000);
			var messageExists = false
	
			$('#usermsg').val(messageContent)
			$('#submitmsg').click();
	
			setTimeout(function() {
				setTimeout(function(){
					allMessages.each(function(message){
						if (message.get('message') === messageContent) {
							messageExists = true
						}
					});
	
					expect(messageExists).to.equal(true);
					done();
				}, 5000);
			}, 2000)
		})

		it('should display the fetched data in the last div of the chatbox', function(done) {
			var message = new MessageClass();
			var messageContent = 'Greatest message ever # ' + Math.floor(Math.random()*100000);
	
	
			$('#usermsg').val(messageContent)
			$('#submitmsg').click();
	
			setTimeout(function() {
				setTimeout(function(){
					expect(($('.message').last()).text()).to.equal(messageContent);
					done();
				}, 5000);
			}, 2000)
		})
	});

		

	

})();
