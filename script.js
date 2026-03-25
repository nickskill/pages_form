const button_form = document.getElementById('btn_form');

button_form.addEventListener('click', () => {
    window.location.href = './index_form.html';
});

const appConfig = {
  appTitle: "Система регистрация и просмотра списка пользователей",
  defaultStatus: "new",
  minValueForFilter: 900
};

let actionCount = 0;

actionCount += 1;
actionCount++;
actionCount = actionCount + 1;

appConfig.minValueForFilter = 1000;

console.log(actionCount);
console.log("Статус системы:", appConfig);

const users = [
  {
    id: 1,
    title: "Иванов Иван Иванович",
    value: 1500,
    status: "active",
    createdAt: "2026-10-29"
  },
  {
    id: 2,
    title: "Петров Пётр Петрович",
    value: 2305,
    status: "active", 
    createdAt: "2025-10-08"
  },
  {
    id: 3,
    title: "Сидорова Анна Сергеевна",
    value: 1245,
    status: "new",
    createdAt: "2025-02-11"
  },
  {
    id: 4,
    title: "Козлов Дмитрий Александрович",
    value: 3449,
    status: "blocked",
    createdAt: "2024-01-10"
  },
  {
    id: 5,
    title: "Смирнова Мария Владимировна",
    value: 1800,
    status: "active",
    createdAt: "2026-05-25"
  },
  {
    id: 6,
    title: "Волков Алексей Николаевич",
    value: 550,
    status: "new",
    createdAt: "2025-04-10"
  }
];

console.log("Список пользователей:");
console.log(users);


const inputMinValue = "800";

const minValue = Number(inputMinValue);

if (Number.isNaN(minValue)) {
  console.log("Ошибка типа порога фильтрации!");
} else {
  console.log("Порог фильтрации:", minValue);
}

const userAge = 19;
const isBlocked = false;

const hasAccess = userAge >= 18 && userAge < 65 && !isBlocked;

console.log("Доступ к системе:", hasAccess);

const user = {
  id: 1,
  title: "Иванов Иван Иванович",
  value: 1500,
  status: "new",
  createdAt: "2026-01-15"
};

switch (user.status) {
  case "new":
    console.log("Новая запись");
    break;
  case "done":
    console.log("Завершено");
    break;
  default:
    console.log("Неизвестный статус");
}

if (user.value >= 1000) {
  console.log("Высокое значение");
} else if (user.value >= 700) {
  console.log("Среднее значение");
} else {
  console.log("Низкое значение");
}

const users2 = [
  { id: 1, title: "Иванов И.И.", status: "new", value: 1500 },
  { id: 2, title: "Петров П.П.", status: "active", value: 2305 },
  { id: 3, title: "Сидорова А.С.", status: "new", value: 1245 },
  { id: 4, title: "Козлов Д.А.", status: "blocked", value: 3449 },
  { id: 5, title: "Смирнова М.В.", status: "active", value: 1800 },
  { id: 6, title: "Волков А.Н.", status: "new", value: 550 }
];

let newCount = 0;

for (const user of users2) {
  if (user.status === "new") {
    newCount++;
    console.log(`Новый пользователь: ${user.title}`);
  }
}
console.log("Количество новых пользователей:", newCount);

let newCountWhile = 0;
let i = 0;
while (i < users.length) {
  if (users[i].status === "new") {
    newCountWhile++;
  }
  i++;
}
console.log("Количество новых пользователей while:", newCount)

const output = document.getElementById('output'); 

document.getElementById('btnAll')?.addEventListener('click', showAll);
document.getElementById('btnNew')?.addEventListener('click', showNew);
document.getElementById('btnStats')?.addEventListener('click', showStats);

function showAll() {
    let result = "    Все записи    \n\n";
    users.forEach(user => {
        result += `ID: ${user.id}, ФИО: ${user.title}, Сумма: ${user.value}, Статус: ${user.status}, Дата: ${user.createdAt}\n`;
    });
    output.textContent = result;
}

function showNew() {
    const newUsers = users.filter(user => user.status === "new");
    let result = `    Только NEW    \n\n`;
    
    if (newUsers.length === 0) {
        result += "Новых пользователей нет";
    } else {
        newUsers.forEach(user => {
            result += `ID: ${user.id}, ФИО: ${user.title}, Сумма: ${user.value}, Дата: ${user.createdAt}\n`;
        });
    }
    output.textContent = result;
}

function showStats() {
    const totalRecords = users.length;
    const totalValue = users.reduce((sum, user) => sum + user.value, 0);
    const maxValue = Math.max(...users.map(user => user.value));
    const newCount = users.filter(user => user.status === "new").length;
    
    const filterUsers = users.filter(user => user.value >= appConfig.minValueForFilter);
    
    let result = "Данные корректны\n";
    result += `Всего записей: ${totalRecords}\n`;
    result += `Сумма value: ${totalValue}\n`;
    result += `Максимум value: ${maxValue}\n`;
    result += `Количество status="new": ${newCount}\n`;
    result += `Фильтр value >= ${minValueForFilter}: (${filterUsers.length} записей)\n\n`;
    
    filterUsers.forEach(user => {
        result += ` ${user.title}: ${user.value} (${user.status})\n`;
    });
    
    output.textContent = result;
}
function showStats() {
    const totalRecords = users.length;
    const totalValue = users.reduce((sum, user) => sum + user.value, 0);
    const maxValue = Math.max(...users.map(user => user.value));
    const newCount = users.filter(user => user.status === "new").length;
   
    const filterUsers = users.filter(user => user.value >= appConfig.minValueForFilter);
   
    let result = "Данные корректны\n\n";
    result += `Всего записей: ${totalRecords}\n`;
    result += `Сумма value: ${totalValue}\n`;
    result += `Максимум value: ${maxValue}\n`;
    result += `Количество status="new": ${newCount}\n\n`;
    result += `Фильтр по value больше 900 >= ${appConfig.minValueForFilter}:\n`;
   
    filterUsers.forEach(user => {
        result += `  ${user.title}: ${user.value} (${user.status})\n`;
    });
   
    output.textContent = result;
}