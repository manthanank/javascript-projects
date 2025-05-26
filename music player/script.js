/* eslint-disable no-unused-vars */
function play() {
  var player = document.getElementById('player');
  player.play();
}

function pause() {
  var player = document.getElementById('player');
  player.pause();
}

function skip() {
  var player = document.getElementById('player');
  player.currentTime = 0;
  player.play();
}
