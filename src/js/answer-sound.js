import rightSound from '../assets/audio/right.mp3';
import wrongSound from '../assets/audio/wrong.mp3';

const audio = new Audio();

export function setSoundAnswer(isRight) {
  if (isRight) {
    audio.src = rightSound;
    audio.play();
  } else {
    audio.src = wrongSound;
    audio.play();
  }
}
