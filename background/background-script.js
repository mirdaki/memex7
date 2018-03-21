console.log(`Memex7: The background script is loading`);

var newTab = false;
var originIdForNewTab = -1;

function logOnHistoryStateUpdated(details)
{
  console.log("The url: " + details.url);
  console.log("Tab ID: " + details.tabId);
  console.log("Transition type: " + details.transitionType);
  console.log("Transition qualifiers: " + details.transitionQualifiers);

  if (newTab == true)
  {
    console.log("This was a new tab from: " + originIdForNewTab);    
    newTab = false;
    originIdForNewTab = -1;
  }
}

function checkOnCreatedNavigationTarget(details)
{
  newTab = true;
  originIdForNewTab = details.sourceTabId;
}

browser.webNavigation.onCommitted.addListener(logOnHistoryStateUpdated);
browser.webNavigation.onCreatedNavigationTarget.addListener(checkOnCreatedNavigationTarget);

console.info("Memex7: The background script has loaded");