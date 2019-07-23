let speedDownButton = document.getElementById('speedDownButton');
let currentSpeedText = document.getElementById('currentSpeedText');
let speedUpButton = document.getElementById('speedUpButton');
let currentSpeed;

// Get current default speed from local storage
chrome.storage.sync.get('speed', function (data) {
    currentSpeedText.innerText = data.speed + "x";
    currentSpeed = data.speed;
    console.log("Current speed: " + currentSpeed + "x");
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id, {
                code: 'var video = document.querySelector("video");if (video) {video.playbackRate = ' + currentSpeed + ';} else {console.log("There is no Video element on the page.")};'
            });
    });
});

speedUpButton.onclick = function (element) {
    changeSpeed("0.25");
};

speedDownButton.onclick = function (element) {
    changeSpeed("-0.25");
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    console.log("Command:", request.update);

    chrome.storage.sync.get('speed', function (data) {
        currentSpeedText.innerText = data.speed + "x";
    });
});

// Changes the current speed by amount speedDelta. Note that
// speedDelta can be either positive or negative.
let changeSpeed = function (speedDelta) {
    // Get current default speed from local storage
    chrome.storage.sync.get('speed', function (data) {
        currentSpeed = data.speed;
        let newSpeed = Number(currentSpeed) + Number(speedDelta);
        console.log("Speed is now " + newSpeed + "x.");
        currentSpeedText.innerText = newSpeed + "x";
        // Save new default speed to local storage.
        chrome.storage.sync.set({
            speed: String(newSpeed)
        });
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id, {
                    code: 'var video = document.querySelector("video");if (video) {video.playbackRate = ' + newSpeed + ';} else {console.log("There is no Video element on the page.")};'
                });
        });
    });
}