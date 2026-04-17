function helloFromLogic() {
    return "logic works";
}

//2.5//
function filterByStatus(items, status) {
return items.filter(item => item.status === status);
}

function findById(items, id) {
return items.find(item => item.id === id) || null;
}

function sortByValueDesc(items) {
const copy = items.slice();
copy.sort((a, b) => b.value- a.value);
return copy;
}

function buildStats(items) {
return items.reduce((acc, item) => {
acc.totalCount += 1;
acc.sumValue += item.value;
if (item.value > acc.maxValue) acc.maxValue = item.value;
if (item.status === "new") acc.newCount += 1;
return acc;
}, { totalCount: 0, sumValue: 0, maxValue: 0, newCount: 0 });
}

//lab 4//
//a 1//
function validDate(s) {
  const re = /^\d{4}-\d{2}-\d{2}$/;
  return re.test(s);
}

//a 2//
function validTitle(s) {
  const re = /^[^<>{};]*$/;
  return re.test(s);
}

//b 1//
function extractIds(text) {
  return (text.match(/\d+/g) || []).map(Number);
}

//b 2//
function normalizeSpaces(s) {
  return s.replace(/\s+/g, " ").trim();
}

//c 1//
function validateRequired(value, fieldName) {
  return value.trim() ? null : `${fieldName} обязательно`;
}

//c 2//
function validateNumberRange(n, min, max, fieldName) {
  if (Number.isNaN(n)) {
    return `${fieldName} должно быть числом`;
  }
  if (n < min || n > max) {
    return `${fieldName} должно быть в диапазоне от ${min} до ${max}`;
  }
  return null;
}

//d 1//
function buildRecordFromForm(raw) {
  return {
    title: normalizeSpaces(raw.title),
    value: Number(raw.value),
    status: raw.status,
    createdAt: raw.createdAt
  };
}

//d 2//
function collectErrors(record) {
  const errors = [];
  if (!isValidTitle(record.title)) {
    errors.push("'title' содержит недопустимые символы.");
  }
  if (!isValidDateYMD(record.createdAt)) {
    errors.push("'createdAt' должно иметь формат даты.");
  }
  const requiredCheck = validateRequired(record.title, "title");
  if (requiredCheck) errors.push(requiredCheck);
  const valueErr = validateNumberRange(record.value, 0, 100, "value");
  if (valueErr) errors.push(valueErr);

  return errors;
}

//e 1//
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkmsDone() {
  console.log("Ожидание ответа");
  await delay(500);
  console.log("done");
}

//e 2//
async function safeFetchJson(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        ok: false,
        error: "Ошибка HTTP",
        details: `Status: ${response.status} ${response.statusText}`
      };
    }

    const data = await response.json();
    return {
      ok: true,
      data
    };
  } 
  catch (err) {
    return {
      ok: false,
      error: "Ошибка сети",
      details: err.message
    };
  }
}

async function demonstSuccess() {
  const result = await safeFetchJson("https://jsonplaceholder.typicode.com/posts/1");
  console.log("Успех", result);
}

async function demonstError() {
  const result = await safeFetchJson("https://example.com/does-not-exist.json");
  console.log("Возникли ошибки:", result);
}

//f 1//
function tryParseJson(text) {
  try {
    const data = JSON.parse(text);
    return { ok: true, data };
  } 
  catch (error) {
    return { ok: false, error: error.message };
  }
}

//f 2//
const corr = tryParseJson('{"a":1}');
console.log("Корректный JSON:", corr);

const incorr = tryParseJson('{b:5}');
console.log("Некорректный JSON:", incorr);

//f 2//
function normalizeApiValue(x) {
  if (typeof x === "number" && Number.isFinite(x)) {
    return x;
  }
  if (typeof x === "string" && x.trim() !== "") {
    const n = Number(x);
    return Number.isFinite(n) ? n : 0;
  }

  return 0;
}
