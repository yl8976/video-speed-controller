# Video Speed Controller

A super simple Chrome extension to control video speed.

## Keyboard Shortcuts

- `Ctrl+Shift+A` — Open extension popup.
- `Alt+Period` — Speed up by 0.25x.
- `Alt+Comma` — Speed down by 0.25x.
- `Alt+Space` — Reset speed to 1x.

## Sample Use Cases
These are some places where I've used this extension myself, as they do **not** have a speed control option:

- [YouTube](https://www.youtube.com/watch?v=bMgfRyK7ikY) (NB: it already has a speed controller and keyboard shortcuts, but the speed maxes out at 2.0x, whereas this extension does not!)
- [Apple's WWDC videos](https://developer.apple.com/videos/play/wwdc2019/408/)
- Social networks (Facebook, Instagram, Twitter, etc.)
- Online news articles with videos
- This extension will work with any webpage that uses the `<video>` HTML tag to display videos, so almost all online videos should work. One notable exception is embedded videos that use `<iframe>` elements instead.

## Todo

- [ ] Customizable keyboard shortcuts
- [ ] Prettier popup UI
- [ ] Reset button on popup
- [ ] HUD animation showing new speed whenever keyboard shortcuts are used
- [ ] Target `<iframe>` video elements (if possible)
