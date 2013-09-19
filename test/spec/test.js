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
})();
