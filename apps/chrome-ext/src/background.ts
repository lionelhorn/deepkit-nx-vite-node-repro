/*****************************************************************
 * onMessage from the extension or tab (a content script)
 *****************************************************************/
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(request);

		// Note: Returning true is required here!
		//  ref: http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
		return true;
	});