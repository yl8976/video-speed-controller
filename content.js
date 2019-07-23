// content.js
// Processes key commands send by background.js.

// Listens to key commands and updates speed accordingly.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Depending on what command was sent, call
    // changeSpeed accordingly. If reset_speed
    // was called, set speed to 1x.
    if (request.cmd == "speed_down") {
        changeSpeed("-0.25", false);
    } else if (request.cmd == "speed_up") {
        changeSpeed("0.25", false);
    } else {
        changeSpeed("0", true);
    }
    
});

// Changes the current speed by amount speedDelta.
// Resets speed to 1x if reset is true. Note that
// speedDelta can be either positive or negative.
let changeSpeed = function (speedDelta, reset) {
    // Get current default speed from local storage.
    chrome.storage.sync.get('speed', function (data) {
        // Extract the speed value from the data.
        currentSpeed = data.speed;

        // Calculate the new speed if reset is false.
        let newSpeed = 1.0;
        if (!reset) {
            newSpeed = Number(currentSpeed) + Number(speedDelta);
        }

        // Save new default speed to local storage.
        chrome.storage.sync.set({
            speed: String(newSpeed)
        });

        // Check if a <video> tag exists; if not,
        // do not attempt to update the speed.
        var video = document.querySelector("video");
        if (video) {
            video.playbackRate = newSpeed;
        } else {
            console.log("There is no video element on the page.")
        }
        
        // Send a message to popup.js to update its
        // value if the popup is already open.
        chrome.runtime.sendMessage({update: "update"});
    });    
}