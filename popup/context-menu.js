// Listen for clicks on the menu
function listenForClicks() 
{
	document.addEventListener("click", (e) => {
		// Log something happened
		console.log(`Memex7: You did somthing!`);
		notifyBackgroundPage(e);
		// Just log the error to the console
		function reportError(error) {
			console.error(`There was an error: ${error}`);
		}
	});
	document.getElementById('record').addEventListener('click', record);
    document.getElementById('stop').addEventListener('click', stop);
    document.getElementById('view').addEventListener('click', view);
	
}

function record()
{
	recordCurrentPage();
	notifyBackgroundPage("record");
	browser.browserAction.setBadgeText({text: "rec"});
	browser.browserAction.setBadgeBackgroundColor({color: "red"});
}
function stop()
{
	notifyBackgroundPage("stop");
	browser.browserAction.setBadgeText({text: ''});
}
function view()
{
	browser.tabs.create({url: "/new_tab/htree.html"});
}
// There was an error executing the script
// Display the popup's error message, and hide the normal UI
function reportExecuteScriptError(error) 
{
	document.querySelector("#popup-content").classList.add("hidden");
	document.querySelector("#error-content").classList.remove("hidden");
	console.error(`Failed to execute Memex7 content script: ${error.message}`);
}
function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
  //console.log(`Error: ${error}`);
}


function notifyBackgroundPage(_type) {
  var sending = browser.runtime.sendMessage({
    greeting: _type
  });
  sending.then(handleResponse, handleError);  
}

// Get current page and set it as a tab
function recordCurrentPage() {
	let gettingCurrent = browser.tabs.getCurrent();

	gettingCurrent.then(
		(info) => {

			// Get current tab data
			let tabData;
			tabData.title = info.title; 
			tabData.favicon = info.favIconUrl;
			tabData.url = info.url;
			tabData.id = 0;
			tabData.parent = 0;
						
			// Store data
			let data = {nodes: []};
			data.nodes.push(tabData);
			browser.storage.local.set({data: data});

			// Store tabId
			browser.storage.local.set({firstTabId: info.id});			
		},
		(error) => console.error(`Error: ${error}`)
	);
}

console.log(`Memex7: Was loaded!`);
listenForClicks();