// popup.js
// Defines behaviour of popup.html.

// Get button and text elements.
let speedDownButton = document.getElementById('speedDownButton');
let currentSpeedText = document.getElementById('currentSpeedText');
let speedUpButton = document.getElementById('speedUpButton');
let currentSpeed;

// Get current default speed from local storage when popup is opened.
chrome.storage.sync.get('speed', function (data) {
    // Update the text to match the current speed.
    currentSpeed = data.speed;
    currentSpeedText.innerText = currentSpeed + "x";

    // Update the speed accordingly using Chrome's Extensions API.
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id, {
                code: 'var video = document.querySelector("video");if (video) {video.playbackRate = ' + currentSpeed + ';} else {console.log("There is no video element on the page.")};'
            });
    });
});

// Detect when the speedUp button is pressed.
speedUpButton.onclick = function (element) {
    changeSpeed("0.25");
};

// Detect when the speedDown button is pressed.
speedDownButton.onclick = function (element) {
    changeSpeed("-0.25");
};

// Listens to messages sent by content.js and
// updates the text in popup.html accordingly.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    chrome.storage.sync.get('speed', function (data) {
        currentSpeedText.innerText = data.speed + "x";
    });
});

// Changes the current speed by amount speedDelta. Note that
// speedDelta can be either positive or negative.
let changeSpeed = function (speedDelta) {
    // Get current default speed from local storage.
    chrome.storage.sync.get('speed', function (data) {
        currentSpeed = data.speed;
        let newSpeed = Number(currentSpeed) + Number(speedDelta);

        currentSpeedText.innerText = newSpeed + "x";
        
        // Save new default speed to local storage.
        chrome.storage.sync.set({
            speed: String(newSpeed)
        });

        // Update the speed accordingly using Chrome's Extensions API.
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id, {
                    code: 'var video = document.querySelector("video");if (video) {video.playbackRate = ' + newSpeed + ';} else {console.log("There is no video element on the page.")};'
                });
        });
    });
}