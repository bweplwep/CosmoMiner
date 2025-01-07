// Инициализация переменных
let credits = 0;
let clickValue = 1;
let autoClickValue = 0;
let asteroidLevel = 1;
let progress = 0;
const progressMax = 100;

// Достижения
const achievements = [
  { name: "Новичок", condition: (credits) => credits >= 100, unlocked: false },
  { name: "Опытный майнер", condition: (credits) => credits >= 1000, unlocked: false },
  { name: "Магнат", condition: (credits) => credits >= 10000, unlocked: false },
];

// Элементы интерфейса
const creditsDisplay = document.getElementById('credits');
const asteroidLevelDisplay = document.getElementById('asteroidLevel');
const mineButton = document.getElementById('mineButton');
const upgrade1Button = document.getElementById('upgrade1');
const upgrade2Button = document.getElementById('upgrade2');
const upgrade3Button = document.getElementById('upgrade3');
const progressBar = document.getElementById('progress');
const achievementsContainer = document.getElementById('achievements');

// Функция для добычи ресурсов
mineButton.addEventListener('click', () => {
  credits += clickValue * asteroidLevel;
  progress += clickValue;
  if (progress >= progressMax) {
    progress = 0;
    randomEvent();
  }
  updateDisplay();
  checkAchievements();
});

// Функция для улучшения кирки
upgrade1Button.addEventListener('click', () => {
  if (credits >= 100) {
    credits -= 100;
    clickValue += 1;
    updateDisplay();
    upgrade1Button.textContent = `Улучшить кирку (${100 * (clickValue - 1)} кредитов)`;
  }
});

// Функция для найма помощника
upgrade2Button.addEventListener('click', () => {
  if (credits >= 500) {
    credits -= 500;
    autoClickValue += 1;
    updateDisplay();
    upgrade2Button.textContent = `Нанять помощника (${500 * (autoClickValue + 1)} кредитов)`;
  }
});

// Функция для перехода на новый уровень астероида
upgrade3Button.addEventListener('click', () => {
  if (credits >= 1000) {
    credits -= 1000;
    asteroidLevel += 1;
    updateDisplay();
    upgrade3Button.textContent = `Перейти на новый уровень (${1000 * asteroidLevel} кредитов)`;
  }
});

// Функция для автоматической добычи
setInterval(() => {
  credits += autoClickValue * asteroidLevel;
  progress += autoClickValue;
  if (progress >= progressMax) {
    progress = 0;
    randomEvent();
  }
  updateDisplay();
  checkAchievements();
}, 1000);

// Рандомные события
function randomEvent() {
  const events = [
    { message: "Метеоритный дождь! +50 кредитов", effect: () => credits += 50 },
    { message: "Поломка оборудования! -30 кредитов", effect: () => credits -= 30 },
    { message: "Найден редкий минерал! +100 кредитов", effect: () => credits += 100 },
  ];
  const event = events[Math.floor(Math.random() * events.length)];
  event.effect();
  alert(event.message);
}

// Проверка достижений
function checkAchievements() {
  achievements.forEach((achievement) => {
    if (!achievement.unlocked && achievement.condition(credits)) {
      achievement.unlocked = true;
      const achievementElement = document.createElement('div');
      achievementElement.className = 'achievement';
      achievementElement.textContent = achievement.name;
      achievementsContainer.appendChild(achievementElement);
    }
  });
}

// Обновление интерфейса
function updateDisplay() {
  creditsDisplay.textContent = credits;
  asteroidLevelDisplay.textContent = asteroidLevel;
  progressBar.style.width = `${(progress / progressMax) * 100}%`;
}