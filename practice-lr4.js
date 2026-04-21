//a 1//
console.log(validDate("2026-02-18") === true);
console.log(validDate("18.02.2026") === false);
console.log(validDate("") === false);

//a 2//
console.log(validTitle("Обычная строка") === true);
console.log(validTitle("Строка < с символом") === false);
console.log(validTitle("Строка; с точкой с запятой") === false);

//b 1//
console.log(extractIds("id=55; id=120; id=70"));

//b 2//
console.log(normalizeSpaces(" A B\t\tC D"));

//c 1//
console.log(validateRequired("", "Поле"));
console.log(validateRequired(" ok ", "Поле"));

//c 2//
console.log(validateNumberRange(10, 0, 20, "Возраст"));
console.log(validateNumberRange(-1, 0, 20, "Возраст"));
console.log(validateNumberRange(NaN, 0, 20, "Возраст"));

//d 1//
function buildRecordFromForm(raw) {
  return {
    title: normalizeSpaces(raw.title),
    value: Number(raw.value),
    status: raw.status,
    createdAt: normalizeSpaces(raw.createdAt)
  };
}

const record22 = buildRecordFromForm(raw);

console.log(record22);
console.log(typeof record22.value);
console.log(record22.title);

//d 2//
const record100 = buildRecordFromForm(raw);

console.log("Корректный ввод:", collectErrors(record100));
console.log("Некорректный ввод:", collectErrors(errorRecord));

//e 1//
checkmsDone();

//e 2//
demonstSuccess();
demonstError();

//f 1//
console.log(normalizeApiValue(10));
console.log(normalizeApiValue("20"));
console.log(normalizeApiValue(null));
console.log(normalizeApiValue("abc"));