// Init logic
const init = () => {
	// Get elements
	var input = $('#sidInput');
	var button = $('#copyButton');
	var buttonTitle = button.attr('title');

	// Set defaults
	input.val('').attr('disabled', true).attr('readonly', false),
	button.attr('disabled', true),

	// If we have a sid
	chrome.storage.sync.get('sid', function (obj) {
        if (obj.sid.length) {
        	// Set sid
			input.val(obj.sid).attr('disabled', false).attr('readonly', true),
			// Remove disable from btn
			button.attr('disabled', false)
			// @TODO Remove the sid
	    }
    }),

	// If we have sfUser
	chrome.storage.sync.get('sfUser', function (obj) {
        if (obj.sfUser.length) {
        	// Set sfUser
			$('#sfUserDetails').html(obj.sfUser).removeClass('hidden')
			// @TODO Remove the sfUserDetails
	    }
    });

	// Handle copy to clipboard
    let clipboard = new Clipboard('#copyButton');
	clipboard.on('success', function(e) {
		button.attr('title', 'Copied!').tooltip('show'),
		setTimeout(function() { 
			button.attr('title', buttonTitle).tooltip('destroy')
		}, 3000),
	    e.clearSelection()
	}).on('error', function(e) {
	    console.error('Action:', e.action),
	    console.error('Trigger:', e.trigger)
	})
}

// Init popup after load
document.addEventListener('DOMContentLoaded', init)