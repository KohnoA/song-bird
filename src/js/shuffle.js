import birdsDataRu from './birds';
import birdsDataEn from './birdsEn';
import { finishGame } from './start-finish';
import defaultBirdImage from '../assets/images/unknown-bird.jpg';
import { switchRiddleBirdSong, refreshAudioRiddleBird } from './audioplayer';
import { setSoundAnswer } from './answer-sound';
import {
  switchCurrentBirdSong,
  refreshAudioCurrentBird,
} from './audioplayer-current';
import { currentLanguage } from './translate';

const answerOptions = document.querySelector('.answers-options');
const currentBirdSectionNode = document.querySelector('.current-bird');
const currentBirdInstructionNode = document.querySelector('.instruction');
export const nextButton = document.querySelector('.game-page__button');
const topicStageItem = document.querySelectorAll('.topic__item');
const scoreNode = document.querySelector('.score__integer');
const unknownBirdImageNode = document.getElementById('unknown-bird-image');
const unknownBirdName = document.getElementById('unknown-bird-name');
export let riddleBirtId = null;
export let stage = 0;
export let totalScore = 0;
let stageScore = 5;
let showWrongIndicator = true;

let birdsData;

export function bindBirdData() {
  birdsData = currentLanguage === 'RU' ? birdsDataRu : birdsDataEn;
}

export function clearGame() {
  riddleBirtId = null;
  stage = 0;
  totalScore = 0;
  stageScore = 5;
  showCurrentStage();

  scoreNode.textContent = totalScore;
}

function showRiddleBird() {
  const img = new Image();
  const nameRiddleBird = birdsData[stage][riddleBirtId].name;

  img.src = birdsData[stage][riddleBirtId].image;
  unknownBirdName.textContent = nameRiddleBird;

  img.onload = () => {
    unknownBirdImageNode.src = img.src;
  };
}

export function showDefaultBird() {
  unknownBirdImageNode.src = defaultBirdImage;
  unknownBirdName.textContent = '******';
}

export function clearAnswerOptions(node = answerOptions) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

export function showInstruction() {
  currentBirdSectionNode.classList.add('hidden');
  currentBirdInstructionNode.classList.remove('hidden');
}

function closeInstruction() {
  currentBirdSectionNode.classList.remove('hidden');
  currentBirdInstructionNode.classList.add('hidden');
}

function showCurrentStage() {
  topicStageItem.forEach((itemStage) =>
    itemStage.classList.remove('topic__item_active')
  );

  const currentStage = topicStageItem[stage];
  currentStage.classList.add('topic__item_active');
}

function checkBird(event) {
  let target = event.target.closest('li');

  if (!target) {
    return;
  }

  const currentBirdName = target.lastChild.textContent;
  const riddleBirdName = birdsData[stage][riddleBirtId].name;
  const currentBirdIndicator = target.firstChild;

  if (currentBirdName === riddleBirdName) {
    if (!currentBirdIndicator.classList.contains('indicator-right')) {
      totalScore += stageScore;
      stageScore = 5;
      scoreNode.textContent = totalScore;
      setSoundAnswer(true);
    }

    showRiddleBird();
    refreshAudioRiddleBird();

    currentBirdIndicator.classList.add('indicator-right');
    nextButton.classList.add('game-page__button_next');
    showWrongIndicator = false;
  } else {
    if (
      showWrongIndicator &&
      !currentBirdIndicator.classList.contains('indicator-wrong')
    ) {
      currentBirdIndicator.classList.add('indicator-wrong');
      setSoundAnswer(false);
      stageScore--;
    }
  }

  closeInstruction();
  showCurrnetBird(currentBirdName);
}

function showCurrnetBird(currentBirdName) {
  const img = new Image();
  const imageNode = document.querySelector('.current-bird__image');
  const nameNode = document.querySelector('.current-bird__name');
  const nameLatinNode = document.querySelector('.current-bird__name-latin');
  const descriptionNode = document.querySelector('.current-bird__description');

  const [birdObj] = birdsData[stage].filter((itemBird) => {
    if (itemBird.name === currentBirdName) return itemBird;
  });

  img.src = birdObj.image;

  nameNode.textContent = birdObj.name;
  nameLatinNode.textContent = birdObj.species;
  descriptionNode.textContent = birdObj.description;
  switchCurrentBirdSong(birdObj.audio);

  img.onload = () => {
    imageNode.src = img.src;
  };
}

export function createAnswerOptions() {
  const ul = document.createElement('ul');
  const currentStage = birdsData[stage];

  for (const bird of currentStage) {
    const li = document.createElement('li');
    const indicator = document.createElement('span');

    li.classList.add('answer-item');
    indicator.classList.add('indicator');

    li.textContent = bird.name;
    li.prepend(indicator);
    ul.append(li);
  }

  ul.classList.add('answer-list');
  answerOptions.append(ul);
  showWrongIndicator = true;

  const answerList = document.querySelector('.answer-list');
  answerList.addEventListener('click', checkBird);
}

export function birdSelection() {
  riddleBirtId = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
}

function nextStage() {
  clearAnswerOptions();
  showDefaultBird();

  if (stage === 5) {
    finishGame();
  } else {
    stage++;

    createAnswerOptions();
    showCurrentStage();
    birdSelection();
    switchRiddleBirdSong();
  }

  refreshAudioRiddleBird();
  refreshAudioCurrentBird();

  this.classList.remove('game-page__button_next');

  showInstruction();
}

nextButton.addEventListener('click', nextStage);
