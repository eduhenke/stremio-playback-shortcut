/**
 * @name PlaybackShortcut
 * @description Adds hotkeys for changing playback speed. Shift+<(To decrease playback speed) and Shift+>(To increase playback speed).
 * @updateUrl https://raw.githubusercontent.com/eduhenke/stremio-playback-shortcut/main/PlaybackShortcut.plugin.js
 * @version 1.0.1
 * @author eduhenke
 */

(() => {
  const MIN_RATE = 0.25;
  const MAX_RATE = 4.0;
  const RATE_STEP = 0.25;

  function info(message) {
    console.log(`[PlaybackShortcut] ${message}`);
  }
  info("Plugin loaded");

  const roundToStep = (value) => {
    return Math.round(value / RATE_STEP) * RATE_STEP;
  };

  const handleKeyPress = (e) => {
    if (!e.shiftKey) return;
    const videoElements = document.getElementsByTagName("video");
    if (videoElements.length === 0) {
      info("No video element found");
      return;
    }
    const videoElement = videoElements[0];
    const currentRate = videoElement.playbackRate;

    if (e.key === "<") {
      const newRate = Math.max(MIN_RATE, roundToStep(currentRate - RATE_STEP));

      if (newRate !== currentRate) {
        videoElement.playbackRate = newRate;
        info(`Decreased playback speed to ${newRate}x`);
      } else {
        info(`Already at minimum speed (${MIN_RATE}x)`);
      }
    } else if (e.key === ">") {
      const newRate = Math.min(MAX_RATE, roundToStep(currentRate + RATE_STEP));

      if (newRate !== currentRate) {
        videoElement.playbackRate = newRate;
        info(`Increased playback speed to ${newRate}x`);
      } else {
        info(`Already at maximum speed (${MAX_RATE}x)`);
      }
    }
  };

  document.addEventListener("keyup", handleKeyPress);
})();
