chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({
        speed: '1'
    }, function () {
        console.log('Current speed is 1x.');
    });
});

chrome.commands.onCommand.addListener(function(command) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {cmd: command});
      });
  });
