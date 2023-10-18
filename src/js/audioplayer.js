import birdsData from './birds';
import { riddleBirtId, stage } from './shuffle';

export const playback = document.querySelectorAll('.playback-button');
const audioRiddle = document.getElementById('audio-player-riddle');
const timebarCurrentTime = document.querySelector('.timebar__current-time');
const timebarTotalTime = document.querySelector('.timebar__total-time');
const progressRange = document.getElementById('progress-range');
const volumeRange = document.getElementById('volume-range');
const playbackRiddle = playback[0];
let isPlay = false;

//General
export function setStartVolumeTime(audioObj, timebarCur, timebarTot) {
  timebarCur.textContent = 'Loading...';

  audioObj.onloadedmetadata = function () {
    const currentTimeRiddleBird = translateTimestamp(audioObj.currentTime);
    const durationRiddleBird = translateTimestamp(audioObj.duration);

    timebarCur.textContent = `${String(currentTimeRiddleBird.minutes).padStart(
      2,
      0
    )}:${String(currentTimeRiddleBird.seconds).padStart(2, 0)}`;
    timebarTot.textContent = `${String(durationRiddleBird.minutes).padStart(
      2,
      0
    )}:${String(durationRiddleBird.seconds).padStart(2, 0)}`;
  };
}

export function translateTimestamp(timestamp) {
  let seconds = parseInt(timestamp);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;

  return { minutes, seconds };
}

export function refreshAllAudio(audioObj, playbackButton, range) {
  audioObj.currentTime = 0;
  audioObj.pause();
  playbackButton.classList.remove('pause');

  range.removeAttribute('style');
  range.value = 0;
}

export function setProgressBar(percentages, range) {
  if (!isNaN(percentages)) {
    let fixedProgressPercen = percentages.toFixed(4);
    let linerGradient = `linear-gradient(to right, rgb(0, 188, 140) 0%, rgb(61, 133, 140) ${fixedProgressPercen}%, rgb(115, 115, 115) ${fixedProgressPercen}%, rgb(115, 115, 115) 100%)`;

    range.style.background = linerGradient;
    range.value = percentages.toFixed();
  }
}

export function setTimeRange(audioObj) {
  const newCurrentTime = (this.value / 100) * audioObj.duration;

  audioObj.currentTime = newCurrentTime;
}

export function setValue(range) {
  const volume = this.volume * 100;

  range.value = volume;
}

export function changeVolume(audioObj) {
  const volume = this.value / 100;

  audioObj.volume = volume;

  if (volume === 0) {
    this.style.opacity = '0.6';
  } else {
    this.removeAttribute('style');
  }
}

//Private
export function switchRiddleBirdSong() {
  const riddleBirdAudio = birdsData[stage][riddleBirtId].audio;

  audioRiddle.src = riddleBirdAudio;
  audioRiddle.volume = 0.7;

  refreshAudioRiddleBird();
  setStartVolumeTime(audioRiddle, timebarCurrentTime, timebarTotalTime);
}

export function playRiddleBirdSong() {
  audioRiddle.play();

  if (!isPlay) {
    audioRiddle.play();
    isPlay = true;
  } else if (isPlay) {
    audioRiddle.pause();
    isPlay = false;
  }
}

export function refreshAudioRiddleBird() {
  isPlay = false;

  refreshAllAudio(audioRiddle, playbackRiddle, progressRange);
}

function setTimeAudio() {
  const duration = this.duration;
  const currentTime = this.currentTime;
  const progressPercentages = (currentTime / duration) * 100;

  setProgressBar(progressPercentages, progressRange);

  if (currentTime >= 0) {
    let refreshCurrentTime = translateTimestamp(currentTime);
    timebarCurrentTime.textContent = `${String(
      refreshCurrentTime.minutes
    ).padStart(2, 0)}:${String(refreshCurrentTime.seconds).padStart(2, 0)}`;
  }
}

playback.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('pause');
  });
});

playbackRiddle.addEventListener('click', playRiddleBirdSong);
audioRiddle.addEventListener('ended', refreshAudioRiddleBird);
audioRiddle.addEventListener('timeupdate', setTimeAudio);
audioRiddle.addEventListener('volumechange', () =>
  setValue.call(audioRiddle, volumeRange)
);
progressRange.addEventListener('input', () =>
  setTimeRange.call(progressRange, audioRiddle)
);
volumeRange.addEventListener('input', () =>
  changeVolume.call(volumeRange, audioRiddle)
);
