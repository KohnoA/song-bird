import {
  translateTimestamp,
  setStartVolumeTime,
  refreshAllAudio,
  setProgressBar,
  setTimeRange,
  setValue,
  changeVolume,
} from './audioplayer';

const audioCurrent = document.getElementById('audio-player-current');
const volumeRange = document.getElementById('volume-range-current');
const progressRange = document.getElementById('progress-range-current');
const timebarCurrentTime = document.querySelector('.timebar__current-time_cur');
const timebarTotalTime = document.querySelector('.timebar__total-time_cur');
const playbackCurrent = document.querySelectorAll('.playback-button')[1];
let isPlay = false;

export function switchCurrentBirdSong(src) {
  audioCurrent.src = src;
  audioCurrent.volume = 0.7;

  refreshAudioCurrentBird();
  setStartVolumeTime(audioCurrent, timebarCurrentTime, timebarTotalTime);
}

function playCurrentBirdSong() {
  audioCurrent.play();

  if (!isPlay) {
    audioCurrent.play();
    isPlay = true;
  } else if (isPlay) {
    audioCurrent.pause();
    isPlay = false;
  }
}

export function refreshAudioCurrentBird() {
  isPlay = false;

  refreshAllAudio(audioCurrent, playbackCurrent, progressRange);
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

playbackCurrent.addEventListener('click', playCurrentBirdSong);
audioCurrent.addEventListener('ended', refreshAudioCurrentBird);
audioCurrent.addEventListener('timeupdate', setTimeAudio);
progressRange.addEventListener('input', () =>
  setTimeRange.call(progressRange, audioCurrent)
);
audioCurrent.addEventListener('volumechange', () =>
  setValue.call(audioCurrent, volumeRange)
);
volumeRange.addEventListener('input', () =>
  changeVolume.call(volumeRange, audioCurrent)
);
