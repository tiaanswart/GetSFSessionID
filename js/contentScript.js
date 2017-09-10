// Get a cookie by name
const getCookie = (name) => {
	return document.cookie.split('; ').reduce((r, v) => {
		const parts = v.split('=')
		return parts[0] === name ? decodeURIComponent(parts[1]) : r
	}, '')
}

// Request the SF User details
const requestSFUser = (sid) => {
	// Authorise the SF request
	var client = new forcetk.Client();
	client.setSessionToken(sid);
	// Get user details
	client.currentUser(receiveSFUser);
}

// Receive the SF User details
const receiveSFUser = (sfUser) => {
	// Save user details
	chrome.storage.sync.set(
		{'sfUser': sfUser.firstName+' '+sfUser.lastName+' ['+sfUser.username+']'}, 
		function() {}
	)
}

// Init - Log cookie value and set icon
const init = () => {
	let sid = getCookie('sid');
	if (sid.length) {
		chrome.runtime.sendMessage({ "newIconPath" : 'img/color.png' })
		chrome.storage.sync.set({'sid': sid}, requestSFUser(sid))
	} else {
		chrome.runtime.sendMessage({ "newIconPath" : 'img/black.png' })
		chrome.storage.sync.set({'sid': ''}, function() {})
		chrome.storage.sync.set({'sfUser': ''}, function() {})
	}
}

init();