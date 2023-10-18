import { bindBirdData } from './shuffle';

const langButton = document.querySelector('.language');
export let currentLanguage;

const i18n = {
  en: {
    'greeting-title': 'Welcome to the SongBird game!',
    'greeting-subtitle': 'Try to guess the bird by its singing',
    'home-link1': 'Home',
    'home-link2': 'Game',
    score: 'Score',
    'stage-link1': 'Warm-up',
    'stage-link2': 'Sparrows',
    'stage-link3': 'Forest birds',
    'stage-link4': 'Songbirds',
    'stage-link5': 'Birds of prey',
    'stage-link6': 'Seabirds',
    'rules-title': 'Rules of the game:',
    rule1: 'Listen to the birds voice.',
    rule2: 'Select the option with the name of the bird.',
    rule3:
      'If the answer is correct, you get 5 points. If not, the result decreases by 1 point with each subsequent attempt.',
    rule4: 'After finding the correct answer, proceed to the next question.',
    rule5: 'At the end of the game, the final result is displayed.',
    'start-button': "Let's go!",
    instruction: 'Listen to the player and select a bird from the list.',
    'next-button': 'Next Level',
    'result-title': 'Congratulate!',
    'try-again': 'Try again!',
    'result-button': 'Repeat!',
    'result-score1': 'You have passed the quiz and scored',
    'result-score2': 'out of 30 possible points.',
  },
  ru: {
    'greeting-title': 'Добро пожаловать в игру Song Bird!',
    'greeting-subtitle': 'Попробуй угадать птицу по ее пению',
    'home-link1': 'Домой',
    'home-link2': 'Игра',
    score: 'Очки',
    'stage-link1': 'Разминка',
    'stage-link2': 'Воробьиные',
    'stage-link3': 'Лесные птицы',
    'stage-link4': 'Певчие птицы',
    'stage-link5': 'Хищные птицы',
    'stage-link6': 'Морские птицы',
    'rules-title': 'Правила игры:',
    rule1: 'Прослушайте голос птицы.',
    rule2: 'Выберете вариант с названием птицы.',
    rule3:
      'Если ответ верный - вы получаете 5 баллов. Если нет, то с каждой последующей попыткой результат уменьшается на 1 балл.',
    rule4: 'После нахождения верного ответа, переходите к следующиму вопросу.',
    rule5: 'По окончанию игры выведется итоговый результат.',
    'start-button': 'Вперед!',
    instruction: 'Послушайте плеер и выбрете птицу из списка.',
    'next-button': 'Следующая птица',
    'result-title': 'Поздравляем!',
    'try-again': 'Попробуйте еще раз!',
    'result-button': 'Повторить!',
    'result-score1': 'Вы прошли викторину и набрали',
    'result-score2': 'из 30 возможных баллов.',
  },
};

function getTranslate(lang) {
  const translateList = document.querySelectorAll('[data-i18]');

  translateList.forEach((translateItem) => {
    const traslateTitle = translateItem.dataset.i18;

    translateItem.textContent = i18n[lang][traslateTitle];
  });
}

function changeLanguage() {
  currentLanguage = langButton.textContent;

  if (currentLanguage === 'RU') currentLanguage = 'EN';
  else if (currentLanguage === 'EN') currentLanguage = 'RU';

  langButton.textContent = currentLanguage;
  bindBirdData();
  getTranslate(currentLanguage.toLowerCase());
}

function setLanguageLocalStorage() {
  localStorage.setItem('lang', currentLanguage);
}

function getLanguageLocalStorage() {
  if (localStorage.getItem('lang')) {
    currentLanguage = localStorage.getItem('lang');
    langButton.textContent = currentLanguage;

    bindBirdData();
    getTranslate(currentLanguage.toLowerCase());
  } else {
    currentLanguage = 'RU';
    bindBirdData();
  }
}

langButton.addEventListener('click', changeLanguage);
window.addEventListener('load', getLanguageLocalStorage);
window.addEventListener('beforeunload', setLanguageLocalStorage);
