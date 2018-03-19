// Listen for clicks on the menu
function listenForClicks() 
{
	document.addEventListener("click", (e) => {
		// Log somthing happened
		console.log(`Memex7: You did somthing!`);

		// Just log the error to the console
		function reportError(error) {
			console.error(`There was an error: ${error}`);
		}
	});
}

// There was an error executing the script
// Display the popup's error message, and hide the normal UI
function reportExecuteScriptError(error) 
{
	document.querySelector("#popup-content").classList.add("hidden");
	document.querySelector("#error-content").classList.remove("hidden");
	console.error(`Failed to execute Memex7 content script: ${error.message}`);
}

console.log(`Memex7: Was loaded!`);
listenForClicks();

function notifyExtension(e) {
  if (e.target.tagName != "A") {
    return;
  }
  browser.runtime.sendMessage({"url": e.target.href});