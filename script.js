// Инициализация переменных
let credits = parseInt(localStorage.getItem('credits')) || 0;
let clickValue = parseInt(localStorage.getItem('clickValue')) || 1;
let autoClickValue = parseInt(localStorage.getItem('autoClickValue')) || 0;
let asteroidLevel = parseInt(localStorage.getItem('asteroidLevel')) || 1;
let progress = parseInt(localStorage.getItem('progress')) || 0;
const progressMax = 100;

// Улучшения
const upgrades = [
  { id: 'upgrade1', cost: 100, effect: () => clickValue += 1 },
  { id: 'upgrade2', cost: 500, effect: () => autoClickValue += 1 },
  { id: 'upgrade3', cost: 1000, effect: () => setInterval(autoMine, 1000) },
];

// Квесты
const quests = [
  { name: "Новичок", condition: () => credits >= 100, reward: 50, completed: localStorage.getItem('quest1') === 'completed' },
  { name: "Опытный майнер", condition: () => credits >= 1000, reward: 200, completed: localStorage.getItem('quest2') === 'completed' },
  { name: "Магнат", condition: () => credits >= 10000, reward: 1000, completed: localStorage.getItem('quest3') === 'completed' },
];

// Элементы интерфейса
const creditsDisplay = document.getElementById('credits');
const asteroidLevelDisplay = document.getElementById('asteroidLevel');
const mineButton = document.getElementById('mineButton');
const progressBar = document.getElementById('progress');
const questsContainer = document.getElementById('quests');
const shopContainer = document.getElementById('shop');

// Функция для добычи ресурсов
mineButton.addEventListener('click', () => {
  credits += clickValue * asteroidLevel;
  progress += clickValue;
  if (progress >= progressMax) {
    progress = 0;
    randomEvent();
  }
  updateDisplay();
  checkQuests();
  saveGame();
});

// Функция для автоматической добычи
function autoMine() {
  credits += autoClickValue * asteroidLevel;
  progress += autoClickValue;
  if (progress >= progressMax) {
    progress = 0;
    randomEvent();
  }
  updateDisplay();
  checkQuests();
  saveGame();
}

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

// Проверка квестов
function checkQuests() {
  quests.forEach((quest, index) => {
    if (!quest.completed && quest.condition()) {
      quest.completed = true;
      credits += quest.reward;
      localStorage.setItem(`quest${index + 1}`, 'completed');
      const questElement = document.createElement('div');
      questElement.className = 'quest';
      questElement.textContent = `${quest.name} выполнено! +${quest.reward} кредитов`;
      questsContainer.appendChild(questElement);
    }
  });
}

// Магазин улучшений
upgrades.forEach((upgrade) => {
  const upgradeButton = document.getElementById(upgrade.id);
  upgradeButton.addEventListener('click', () => {
    if (credits >= upgrade.cost) {
      credits -= upgrade.cost;
      upgrade.effect();
      updateDisplay();
      saveGame();
    }
  });
});

// Обновление интерфейса
function updateDisplay() {
  creditsDisplay.textContent = credits;
  asteroidLevelDisplay.textContent = asteroidLevel;
  progressBar.style.width = `${(progress / progressMax) * 100}%`;
}

// Сохранение игры
function saveGame() {
  localStorage.setItem('credits', credits);
  localStorage.setItem('clickValue', clickValue);
  localStorage.setItem('autoClickValue', autoClickValue);
  localStorage.setItem('asteroidLevel', asteroidLevel);
  localStorage.setItem('progress', progress);
}

// Загрузка игры
function loadGame() {
  updateDisplay();
  checkQuests();
}

// Запуск игры
loadGame();