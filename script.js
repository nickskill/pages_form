const buttonForm = document.getElementById('btn_form');

if (buttonForm) {
  buttonForm.addEventListener("click", () => {
    window.location.href = "./index_form.html";
  });
}

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

//2 E//
console.log(helloFromLogic());

//1 F//
const textEl = document.getElementById("textEl");
if (textEl) {
    textEl.textContent = "DOM работает";
}

//2 F//
const listEl = document.getElementById("listEl");
if (listEl) {
  listEl.innerHTML = "";
  for (let i = 1; i <= 3; i++) {
    const p = document.createElement("p");
    p.textContent = `Параграф ${i}`;
    listEl.appendChild(p);
  }
}

//2.4//
console.log(items);

//2.6//
function renderCards(itemsToRender) {
  const container = document.getElementById("message2");
  if (!container) return;

    container.innerHTML = "";
  for (const item of itemsToRender) {
    const card = document.createElement("div");
    card.className = "item-card";
    card.style.cssText = `
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      margin: 12px 0;
      background: #f9f9f9;
    `;

    card.innerHTML = `
      <h3 style="margin: 0 0 8px 0; color: #333;">${item.title}</h3>
      <p style="margin: 4px 0; color: #666;">
        ID: ${item.id} | Value: ${item.value} |
        Status: <span style="color: ${item.status === "new" ? "orange" : item.status === "active" ? "green" : "red"}">${item.status}</span> |
        Created: ${item.createdAt}
      </p>
    `;

    container.appendChild(card);
  }
}

renderCards(items);

//2.7//

function renderList(itemsToRender) {
    const listEl = document.getElementById("listContainer");
    if (!listEl) return;
    listEl.textContent = "";
    for (const item of itemsToRender) {
        const card = document.createElement("div");
        card.className = "item-card";
        const h3 = document.createElement("h3");
        h3.textContent = item.title;
        const info = document.createElement("p");
        info.textContent = `id=${item.id} | value=${item.value} | status=${item.status} | createdAt=${item.createdAt}`;
        const btnRemove = document.createElement("button");

        btnRemove.textContent = "Удалить";
        btnRemove.dataset.action = "remove";
        btnRemove.dataset.id = String(item.id);
        card.appendChild(h3);
        card.appendChild(info);
        card.appendChild(btnRemove);
        listEl.appendChild(card);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const btnAll2   = document.getElementById("btnAll2");
    const btnNew2   = document.getElementById("btnNew2");
    const btnSort2  = document.getElementById("btnSort2");
    const btnStats2 = document.getElementById("btnStats2");
    const messageEl2 = document.getElementById("message2");

    if (btnAll2) {
        btnAll2.addEventListener("click", () => {
            renderList(items);
        });
    }

    if (btnNew2) {
        btnNew2.addEventListener("click", () => {
            const filtered = filterByStatus(items, "new");
            renderList(filtered);
        });
    }

    if (btnSort2) {
        btnSort2.addEventListener("click", () => {
            const sorted = sortByValueDesc(items);
            renderList(sorted);
        });
    }

    if (btnStats2) {
        btnStats2.addEventListener("click", () => {
            const stats = buildStats(items);
            messageEl2.textContent =
                `Всего записей: ${stats.totalCount}\n` +
                `Сумма value: ${stats.sumValue}\n` +
                `Максимум value: ${stats.maxValue}\n` +
                `Количество status="new": ${stats.newCount}`;
        });
    }
});

//lab 4//
const items100 = [];

const form = document.getElementById("recordForm");
const formErrors = document.getElementById("formErrors");
const message = document.getElementById("message");
const list = document.getElementById("list");
const loadDataBtn = document.getElementById("loadDataBtn");

function normalizeSpaces(s) {
  return String(s).replace(/\s+/g, " ").trim();
}

function isValidTitle(s) {
  return typeof s === "string" && s.trim() !== "" && /^[^<>{};]*$/.test(s);
}

function isValidDateYMD(s) {
  if (typeof s !== "string") return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;

  const [y, m, d] = s.split("-").map(Number);
  const date = new Date(y, m - 1, d);

  return (
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d
  );
}

function validateForm(raw) {
  const normalized = {
    title: normalizeSpaces(raw.title ?? ""),
    value: Number(raw.value),
    status: raw.status ?? "new",
    createdAt: normalizeSpaces(raw.createdAt ?? "")
  };

  const errors = [];

  if (validateRequired(normalized.title, "title")) {
    errors.push(validateRequired(normalized.title, "title"));
  }

  if (normalized.title && !validTitle(normalized.title)) {
    errors.push("'title' содержит недопустимые символы.");
  }

  if (!validDate(normalized.createdAt)) {
    errors.push("'createdAt' должно иметь формат YYYY-MM-DD.");
  }

  const valueErr = validateNumberRange(normalized.value, 0, 1000, "value");
  if (valueErr) errors.push(valueErr);

  return { errors, normalized };
}

function renderStats() {
  const stats = buildStats(items);
  setMessage(
    `Всего записей: ${stats.totalCount}<br>
     Сумма value: ${stats.sumValue}<br>
     Максимум value: ${stats.maxValue}<br>
     Количество status="new": ${stats.newCount}`
  );
}

function renderList(items100) {
  list.innerHTML = items100
    .map(
      item => `<li>#${item.id} | ${item.title} | ${item.value} | ${item.status} | ${item.createdAt}</li>`
    )
    .join("");
}

function renderErrors(errors) {
  const formErrors = document.getElementById("formErrors");
  if (!formErrors) return;

  formErrors.innerHTML = errors.length
    ? `<ul style="color: red; margin: 8px 0;">${errors.map(e => `<li>${e}</li>`).join("")}</ul>`
    : "";
}

function setMessage1(text) {
  message.textContent = text;
}

function getNextId() {
  return items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
}




form.addEventListener("submit", (e) => {
  e.preventDefault();
  const raw = {
    title: document.getElementById("titleInput").value,
    value: document.getElementById("valueInput").value,
    createdAt: document.getElementById("createdAtInput").value,
    status: document.getElementById("statusInput").value
  };

  const { errors, normalized } = validateForm(raw);

  if (errors.length) {
    renderErrors(errors);
    setMessage1("Исправьте ошибки формы");
    return;
  }

  items.push({
    id: getNextId(),
    title: normalized.title,
    value: normalized.value,
    status: raw.status,
    createdAt: normalized.createdAt
  });

  renderList(items);
  renderErrors([]);
  form.reset();
  setMessage1("Запись успешно добавлена");
});

loadDataBtn.addEventListener("click", async () => {
  setMessage1("Загрузка данных...");

  const result = await safeFetchJson("https://jsonplaceholder.typicode.com/posts");

  if (!result.ok) {
    console.error(result.details);
    setMessage1(`Не удалось загрузить данные: ${result.error}`);
    return;
  }

  const newItems = result.data.slice(0, 3).map((p, idx) => ({
    id: getNextId() + idx,
    title: normalizeSpaces(String(p.title)).slice(0, 40),
    value: Number(p.id),
    status: "new",
    createdAt: "2026-01-01"
  }));

  items.push(...newItems);
  renderList(items);
  setMessage1("Данные успешно загружены");
});

// ✅ РЕНДЕР КАРТОЧЕК В #message2
function renderList(itemsToRender) {
    const messageEl = document.getElementById("message2");
    if (!messageEl) return;

    messageEl.innerHTML = "";
    
    for (const item of itemsToRender) {
        const card = document.createElement("div");
        card.className = "item-card";
        card.style.cssText = `
            border: 1px solid #ccc; 
            border-radius: 8px; 
            padding: 16px; 
            margin: 12px 0; 
            background: #f9f9f9;
        `;
        
        card.innerHTML = `
            <h3 style="margin: 0 0 8px 0; color: #333;">${item.title}</h3>
            <p style="margin: 4px 0; color: #666;">
                ID: ${item.id} | Value: ${item.value} | 
                Status: <span style="color: ${item.status === 'new' ? 'orange' : item.status === 'active' ? 'green' : 'red'}">${item.status}</span> | 
                Created: ${item.createdAt}
            </p>
        `;
        
        messageEl.appendChild(card);
    }
}

// UI функции

function setMessage(text, isError = false) {
    const messageEl = document.getElementById("message2");
    if (messageEl) {
        messageEl.innerHTML = `<div style="padding: 16px; background: ${isError ? '#f8d7da' : '#d4edda'}; border: 1px solid ${isError ? '#f5c6cb' : '#c3e6cb'}; border-radius: 4px; margin: 12px 0;">${text}</div>`;
        setTimeout(() => messageEl.innerHTML = "", 5000); // автоочистка
    }
}

// ✅ АСИНХРОННАЯ ИНТЕГРАЦИЯ С safeFetchJson ИЗ LOGIC.JS
async function loadExternalData() {
    setMessage("⏳ Загрузка данных...", false);
    
    const result = await safeFetchJson("https://jsonplaceholder.typicode.com/posts"); // ✅ Используем из logic.js
    
    if (!result.ok) {
        console.error("Ошибка загрузки:", result.details);
        setMessage(`❌ ${result.error}: ${result.details}`, true);
        return;
    }

    // Нормализуем данные с normalizeApiValue
    const newItems = result.data.slice(0, 5).map((post, idx) => ({
        id: getNextId() + idx,
        title: normalizeSpaces(post.title).slice(0, 50),        // ✅ normalizeSpaces
        value: normalizeApiValue(post.id * 10),                  // ✅ normalizeApiValue
        status: "new",
        createdAt: new Date().toISOString().slice(0, 10)
    }));

    items.push(...newItems);
    renderList(items);
    setMessage(`✅ Загружено ${newItems.length} записей из API`);
}

// ✅ ИНИЦИАЛИЗАЦИЯ
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnAll")?.addEventListener("click", () => {
    const output = document.getElementById("output");
    if (!output) return;

    let result = "Все записи\n\n";
    items.forEach(item => {
      result += `ID: ${item.id}, ФИО: ${item.title}, Сумма: ${item.value}, Статус: ${item.status}, Дата: ${item.createdAt}\n`;
    });
    output.textContent = result;
  });

  document.getElementById("btnNew")?.addEventListener("click", () => {
    const output = document.getElementById("output");
    if (!output) return;

    const newUsers = filterByStatus(items, "new");
    let result = "Только NEW\n\n";

    if (newUsers.length === 0) {
      result += "Новых пользователей нет";
    } else {
      newUsers.forEach(item => {
        result += `ID: ${item.id}, ФИО: ${item.title}, Сумма: ${item.value}, Дата: ${item.createdAt}\n`;
      });
    }

    output.textContent = result;
  });

  document.getElementById("btnStats")?.addEventListener("click", () => {
    const output = document.getElementById("output");
    if (!output) return;

    const stats = buildStats(items);
    output.textContent =
      `Всего записей: ${stats.totalCount}\n` +
      `Сумма value: ${stats.sumValue}\n` +
      `Максимум value: ${stats.maxValue}\n` +
      `Количество status="new": ${stats.newCount}\n` +
      `Фильтр value >= ${appConfig.minValueForFilter}: ${items.filter(i => i.value >= appConfig.minValueForFilter).length}`;
  });

  document.getElementById("btnAll2")?.addEventListener("click", () => {
    renderCards(items);
  });

  document.getElementById("btnNew2")?.addEventListener("click", () => {
    renderCards(filterByStatus(items, "new"));
  });

  document.getElementById("btnSort2")?.addEventListener("click", () => {
    renderCards(sortByValueDesc(items));
  });

  document.getElementById("btnStats2")?.addEventListener("click", () => {
    renderStats();
  });

  const form = document.getElementById("recordForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const raw = {
        title: document.getElementById("titleInput").value,
        value: document.getElementById("valueInput").value,
        createdAt: document.getElementById("createdAtInput").value,
        status: document.getElementById("statusInput").value
      };

      const { errors, normalized } = validateForm(raw);

      if (errors.length) {
        renderErrors(errors);
        setMessage("Исправьте ошибки формы", true);
        return;
      }

      const newRecord = {
        id: getNextId(),
        title: normalized.title,
        value: normalized.value,
        status: normalized.status,
        createdAt: normalized.createdAt
      };

      items.push(newRecord);
      renderErrors([]);
      form.reset();
      renderCards(items);
      setMessage(`Запись успешно добавлена: #${newRecord.id}`);
    });
  }

  document.getElementById("loadDataBtn")?.addEventListener("click", async () => {
    setMessage("Загрузка данных...");

    const result = await safeFetchJson("https://jsonplaceholder.typicode.com/posts");

    if (!result.ok) {
      console.error(result.details);
      setMessage(`Не удалось загрузить данные: ${result.error}`, true);
      return;
    }

    const nextId = getNextId();
    const newItems = result.data.slice(0, 5).map((post, idx) => ({
      id: nextId + idx,
      title: normalizeSpaces(String(post.title)).slice(0, 50),
      value: normalizeApiValue(post.id * 10),
      status: "new",
      createdAt: new Date().toISOString().slice(0, 10)
    }));

    items.push(...newItems);
    renderCards(items);
    setMessage(`Загружено ${newItems.length} записей из API`);
  });

  renderCards(items);
});