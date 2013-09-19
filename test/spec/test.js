/*global describe, it */
'use strict';
(function () {

	describe('buzzME', function() {

		it('should save a message to Parse', function(done) {
			var result;

			var message = new MessageClass();
			$('.user-name-input').val('Bob');
			var messageContent = 'My message number ' + Math.floor(Math.random()*100000);

			$('.message-input').val(messageContent);

			$('.send').click();

			setTimeout(function() {
				message.save({
					success: function(message) {
						result = message;
						expect(result.get('message')).to.equal(messageContent);
						done();
					}
				})
			},3000)
		})
	});

	describe('should fetch new data every three seconds', function(done) {
		var message = new MessageClass();
		var messageContent = 'Greatest message ever # ' + Math.floor(Math.random()*100000);

		$('#usermsg').val(messageContent)
		$('#submitmsg').click();

		setTimeout(function() {
			setTimeout(function(){
				
			}, 5000);
		}, 2000)

	})

})();
