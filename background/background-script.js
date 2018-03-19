console.log(`Memex7: The background script was loaded!`);

function heloWolrd(param)
{
  console.log(`Memex: Hello ${param}!`)
}

function listener(details)
{
  console.log(details);
}

browser.webNavigation.onHistoryStateUpdated.addListener(listener)

heloWolrd("World");
console.info("Memex: Background script has run");