const button_form = document.getElementById('btn_form');

button_form.addEventListener('click', () => {
    window.location.href = './index_form.html';
});




const appConfig = {
  appTitle: "Система регистрация и просмотра списка пользователей",
  defaultStatus: "new",
  minValueForFilter: 800
};


let actionCount = 0;



actionCount += 1;
actionCount++;
actionCount = actionCount + 1;



appConfig.minValueForFilter = 1000;


console.log("Количество зарегестрированных пользователей:", actionCount);
console.log("Статус системы:", appConfig);





const users = [
  {
    id: 1,
    title: "Иванов Иван Иванович",
    value: 1500,
    status: "active",
    createdAt: "2026-01-15"
  },
  {
    id: 2,
    title: "Петров Пётр Петрович",
    value: 2300,
    status: "active", 
    createdAt: "2026-01-20"
  },
  {
    id: 3,
    title: "Сидорова Анна Сергеевна",
    value: 1200,
    status: "new",
    createdAt: "2026-02-01"
  },
  {
    id: 4,
    title: "Козлов Дмитрий Александрович",
    value: 3000,
    status: "blocked",
    createdAt: "2026-01-10"
  },
  {
    id: 5,
    title: "Смирнова Мария Владимировна",
    value: 1800,
    status: "active",
    createdAt: "2026-02-05"
  },
  {
    id: 6,
    title: "Волков Алексей Николаевич",
    value: 950,
    status: "new",
    createdAt: "2026-02-10"
  }
];


console.log("Список пользователей:");
console.log(users);


console.log("Список пользователей (кратко):");
users.forEach(user => {
  console.log(`ID: ${user.id}, ФИО: ${user.title}, Сумма: ${user.value}, Статус: ${user.status}`);
});






const inputMinValue = "800";


const minValue = Number(inputMinValue);


if (Number.isNaN(minValue)) {
  console.log("Ошибка: некорректный порог фильтрации пользователей!");
} else {
  console.log("Порог фильтрации по сумме:", minValue);
}





const userAge = 19;
const isBlocked = false;


const hasAccess = userAge >= 18 && userAge < 65 && !isBlocked;


console.log("Возраст пользователя:", userAge);
console.log("Заблокирован:", isBlocked);
console.log("Имеет доступ к системе:", hasAccess);



console.log("Условия проверки:");
console.log("- Возраст >= 18:", userAge >= 18);
console.log("- Возраст < 65:", userAge < 65);
console.log("- Не заблокирован:", !isBlocked);






const user = {
  id: 1,
  title: "Иванов Иван Иванович",
  value: 1500,
  status: "new",
  createdAt: "2026-01-15"
};



switch (user.status) {
  case "new":
    console.log("Описание статуса: Новая запись");
    break;
  case "done":
    console.log("Описание статуса: Завершено");
    break;
  default:
    console.log("Описание статуса: Неизвестный статус");
}



if (user.value >= 1000) {
  console.log("Категория по сумме: Высокое значение");
} else if (user.value >= 700) {
  console.log("Категория по сумме: Среднее значение");
} else {
  console.log("Категория по сумме: Низкое значение");
}



const users2 = [
  { id: 1, title: "Иванов И.И.", status: "new", value: 1500 },
  { id: 2, title: "Петров П.П.", status: "active", value: 2300 },
  { id: 3, title: "Сидорова А.С.", status: "new", value: 1200 },
  { id: 4, title: "Козлов Д.А.", status: "blocked", value: 3000 },
  { id: 5, title: "Смирнова М.В.", status: "active", value: 1800 },
  { id: 6, title: "Волков А.Н.", status: "new", value: 950 }
];


let newUsersCount = 0;

console.log("=== Подсчёт через for...of ===");
for (const user of users2) {
  if (user.status === "new") {
    newUsersCount++;
    console.log(`Найден новый пользователь: ${user.title}`);
  }
}
console.log("Количество новых пользователей:", newUsersCount);


console.log("\n=== Подсчёт через while ===");
let newUsersCountWhile = 0;
let i = 0;
while (i < users.length) {
  if (users[i].status === "new") {
    newUsersCountWhile++;
  }
  i++;
}
console.log("Количество новых пользователей (while):", newUsersCount)




const output = document.getElementById('output'); // *

button_form?.addEventListener('click', () => {
    window.location.href = './index_form.html';
});

// НОВЫЕ ОБРАБОТЧИКИ
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
    let result = `    Только NEW (${newUsers.length} записей)    \n\n`;
    
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
    
    const filteredUsers = users.filter(user => user.value >= appConfig.minValueForFilter);
    
    let result = "Данные корректны\n";
    result += `Всего записей: ${totalRecords}\n`;
    result += `Сумма value: ${totalValue}\n`;
    result += `Максимум value: ${maxValue}\n`;
    result += `Количество status="new": ${newCount}\n`;
    result += `Фильтр value >= ${minValueForFilter}: (${filteredUsers.length} записей)\n\n`;
    
    filteredUsers.forEach(user => {
        result += `  • ${user.title}: ${user.value} (${user.status})\n`;
    });
    
    output.textContent = result;
}
function showStats() {
    const totalRecords = users.length;
    const totalValue = users.reduce((sum, user) => sum + user.value, 0);
    const maxValue = Math.max(...users.map(user => user.value));
    const newCount = users.filter(user => user.status === "new").length;
   
    const filteredUsers = users.filter(user => user.value >= appConfig.minValueForFilter);
   
    let result = "Данные корректны\n";
    result += `Всего записей: ${totalRecords}\n`;
    result += `Сумма value: ${totalValue}\n`;
    result += `Максимум value: ${maxValue}\n`;
    result += `Количество status="new": ${newCount}\n`;
    result += `Фильтр value >= ${appConfig.minValueForFilter}: (${filteredUsers.length} записей)\n\n`;
   
    filteredUsers.forEach(user => {
        result += ` ${user.title}: ${user.value} (${user.status})\n`;
    });
   
    output.textContent = result;
}