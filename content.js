chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    console.log("Command:", request.cmd);

    if (request.cmd == "speed_down") {
        changeSpeed("-0.25");
    } else if (request.cmd == "speed_up") {
        changeSpeed("0.25");
    } else {
        chrome.storage.sync.get('speed', function (data) {
            console.log("Speed is now 1x.");
            // Save new default speed to local storage.
            chrome.storage.sync.set({
                speed: '1.0'
            });
            document.querySelector("video").playbackRate = 1.0;
        });
    }
    
});

// Changes the current speed by amount speedDelta. Note that
// speedDelta can be either positive or negative.
let changeSpeed = function (speedDelta) {
    // Get current default speed from local storage
    chrome.storage.sync.get('speed', function (data) {
        currentSpeed = data.speed;
        let newSpeed = Number(currentSpeed) + Number(speedDelta);
        console.log("Speed is now " + newSpeed + "x.");
        // Save new default speed to local storage.
        chrome.storage.sync.set({
            speed: String(newSpeed)
        });
        document.querySelector("video").playbackRate = newSpeed;
    });
}