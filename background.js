chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({
        speed: '1.0'
    }, function () {
        console.log('Current speed is 1.0x.');
    });
});