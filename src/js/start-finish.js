import { switchRiddleBirdSong, refreshAudioRiddleBird } from './audioplayer';
import { refreshAudioCurrentBird } from './audioplayer-current';
import {
  createAnswerOptions,
  clearAnswerOptions,
  birdSelection,
  showInstruction,
  clearGame,
  totalScore,
  showDefaultBird,
  nextButton,
} from './shuffle';

const startButton = document.getElementById('start-button');
const startSection = document.querySelector('.start-page');
const gameSection = document.querySelector('.game-page');
const footerApplication = document.querySelector('.footer');
const homeLink = document.getElementById('navigation-home-link');
const gameLink = document.getElementById('navigation-game-link');
const endSection = document.querySelector('.end-page');
const tryAgainButton = document.querySelector('.end-page__button');
const resultScoreNode = document.querySelector('.result__score');
const resultAgain = document.querySelector('.result__again');

function returnStartPage() {
  startSection.classList.remove('hidden');
  footerApplication.classList.remove('hidden');
  gameSection.classList.add('hidden');
  endSection.classList.add('hidden');

  homeLink.classList.add('navigation__item_active');
  gameLink.classList.remove('navigation__item_active');

  clearAnswerOptions();
  showInstruction();
  clearGame();
  refreshAudioRiddleBird();
  refreshAudioCurrentBird();
  showDefaultBird();

  nextButton.classList.remove('game-page__button_next');
}

function startGame() {
  if (!gameLink.classList.contains('navigation__item_active')) {
    startSection.classList.add('hidden');
    footerApplication.classList.add('hidden');
    gameSection.classList.remove('hidden');

    homeLink.classList.remove('navigation__item_active');
    gameLink.classList.add('navigation__item_active');

    createAnswerOptions();
    birdSelection();
    switchRiddleBirdSong();
  }
}

export function finishGame() {
  endSection.classList.remove('hidden');
  gameSection.classList.add('hidden');
  footerApplication.classList.remove('hidden');

  if (totalScore === 30) {
    resultAgain.classList.add('hidden');
  } else {
    resultAgain.classList.remove('hidden');
  }

  resultScoreNode.textContent = totalScore;
}

startButton.addEventListener('click', startGame);
gameLink.addEventListener('click', startGame);
homeLink.addEventListener('click', returnStartPage);
tryAgainButton.addEventListener('click', returnStartPage);
