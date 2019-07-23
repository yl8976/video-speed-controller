// background.js
// Runs in the background and listens to events.

// When the extension is first installed, add the default speed to local storage.
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({
        speed: '1'
    });
});

// Listens to key commands (defined in manifest.json) and sends
// a message to content.js containing what command was pressed.
chrome.commands.onCommand.addListener(function(command) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {cmd: command});
      });
  });
