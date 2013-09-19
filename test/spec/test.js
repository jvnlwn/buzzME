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
	});
})();
