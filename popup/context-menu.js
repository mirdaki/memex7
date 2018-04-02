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
	notifyBackgroundPage("record");
}
function stop()
{
	notifyBackgroundPage("stop");
}
function view()
{
	notifyBackgroundPage("view");
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

console.log(`Memex7: Was loaded!`);
listenForClicks();