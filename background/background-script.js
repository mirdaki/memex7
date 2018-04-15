console.info(`Memex7: The background script is loading`);

// Default values
// Current recorded tabs, based off browser tab ID and our ID, for this session
let currentRecordedTabIds = [];

// Count of IDs to assign
let idNum = 0;

// Flag for data
let isRecording = false;

// Flag for if page is a new tab (will be updated with parent ID if it's a new tab)
let originIdForNewTab = -1;

// Data structure for storage
let data = {nodes: []};

// Record existing tabs in-order to ignore
let existingTabs = [];

//let myStorage = Storage.localStorage;
// Create the recording of the tab being created
function logOnHistoryStateUpdated(details)
{
  // Debug information
  console.group();
  console.log(`Memex7: Debug information about the tab load`)
  console.log(`The url: ${details.url}`);
  console.log(`Tab ID: ${details.tabId}`);
  console.log(`Transition type: ${details.transitionType}`);
  console.log(`Transition qualifiers: ${details.transitionQualifiers}`);
  console.log(`Frame ID: ${details.frameId}`);
  console.log(`ID from origin if this was a new tab (-1 otherwise): ${originIdForNewTab}`);
  console.groupEnd();  

  // Don't record tabs that aren't related to the first tab recorded
  // If no tab is being recorded, assume it is the root
  if (currentRecordedTabIds.length == 0)
  {
    // Add the tab to the recorded list, parent is itself
    currentRecordedTabIds.push({id: -1, tabId: details.tabId});
  }
  // If this was a new tab and it's parent was recorded
  else if (currentRecordedTabIds.find(tab => tab.tabId === originIdForNewTab))
  {
    // Add the tab ID to the recorded list with it's parent ID
    let parentId = currentRecordedTabIds.find(tab => tab.tabId === originIdForNewTab)
    currentRecordedTabIds.push({id: parentId.id, tabId: details.tabId});    
  }
  // If this isn't one of the tabs being recorded and it wasn't there before
  // Not a new tab link
  // Not a used tab
  // Not a existing tab
  else if (originIdForNewTab == -1 &&
    !currentRecordedTabIds.find(tab => tab.tabId === details.tabId) && 
    !existingTabs.find(id => id === details.tabId) &&
    details.url.match('moz-extension') != 'moz-extension')
  {
    // This will be a new "root" for a new tree
    currentRecordedTabIds.push({id: -1, tabId: details.tabId});
  }
  // See if this isn't one of the tabs being recorded or it was redirected 
  else if (!currentRecordedTabIds.find(tab => tab.tabId === details.tabId) ||
    details.transitionType == "auto_subframe" ||
    details.transitionType == "form_submit" ||    
    details.transitionQualifiers == "client_redirect" ||
    details.url.match('moz-extension') != 'moz-extension')
  {
    // Exit if it is not being recorded
    return;
  }

  // Current tab information
  let tabData = {};

  // Get the parent ID from the last recorded ID on this tab
  let parentTab = currentRecordedTabIds.find(tab => tab.tabId === details.tabId);
  
  // The page must be loaded for the favicon to be recorded
  // TODO: Add a url filter
  browser.webNavigation.onCompleted.addListener(recordTabData);

  // Set data about the current tab
  tabData.id = idNum;
  tabData.url = details.url;
  tabData.parent = parentTab.id;
  tabData.title = "";
  tabData.favicon = "";
  
  // Add current tab information to the session data
  data.nodes.push(tabData);
  
  // Reset new tab parameters
  originIdForNewTab = -1;
  
  // Update recorded tabs to have the new ID
  parentTab.id = idNum;
  
  // Increment ID 
  ++idNum;

  console.log(tabData);
}

// Triggered on onCompleted with a filter, it retrieves the favicon for the corresponding url 
function recordTabData(details)
{
  // Find the array element with url (Assumes stores URL is exactly the same as final)
  // TODO: Better implementation than assuming they share the tab ID
  let tempTab = currentRecordedTabIds.find(tab => tab.tabId === details.tabId);
  let savedTab = data.nodes.find(tab => tab.id === tempTab.id);

  // Set the favicon and title
  console.log("made it favicon stuff for " + details.tabId);
  let currentTab = browser.tabs.get(details.tabId);
  currentTab.then(
    (info) => {savedTab.title = info.title; savedTab.favicon = info.favIconUrl
	  // Remove the event listener
  browser.webNavigation.onCompleted.removeListener(recordTabData);
  
  // Store the data
   browser.storage.local.set({data: data});
	
	},
    (error) => console.error(`Error: ${error}`)
  );
    

}

// Adds flag to see if the page is a new tab, runs before logOnHistoryStateUpdated
function checkOnCreatedNavigationTarget(details)
{
  originIdForNewTab = details.sourceTabId;
}

// TODO: Called when a message is sent
function initializeRecording()
{
	if(isRecording==false)
	{
		console.info("started recording");
	  // Reset default values
	  currentRecordedTabIds = [];
	  idNum = 0;
	  originIdForNewTab = -1;
    data = {nodes: []};
    existingTabs = [];
    
    // Record existing tabs in-order to ignore them
    let querying = browser.tabs.query({});
    querying.then(
      (tabs) => {
        for (let tab of tabs) {
          existingTabs.push(tab.id);
        }
      }, 
      (error) => console.log(`Error: ${error}`)
    );

	  // Set up the events
	  browser.webNavigation.onCreatedNavigationTarget.addListener(checkOnCreatedNavigationTarget);  
	  browser.webNavigation.onCommitted.addListener(logOnHistoryStateUpdated);
	  isRecording=true;
	}
}

// TODO: Called when a message is sent
function stopRecording()
{

	if(isRecording==true)
	{
		console.info("stopped recording");
	  // Set up the events
	  browser.webNavigation.onCommitted.removeListener(logOnHistoryStateUpdated);
	  browser.webNavigation.onCreatedNavigationTarget.removeListener(checkOnCreatedNavigationTarget);  

	  isRecording=false;
	}
}

function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: " +
    request.greeting);
	if(request.greeting==="record")
	{
		initializeRecording();
	}
		if(request.greeting==="stop")
	{
		stopRecording();
	}
		if(request.greeting==="view")
	{
		//initializeRecording();
	}
  
  //sendResponse({response: "Response from background script"});

}
browser.runtime.onMessage.addListener(handleMessage);


console.info("Memex7: The background script has loaded");
