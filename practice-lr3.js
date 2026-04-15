//1 a//
function calcTotal(a, b) {
    const sum = a + b;
    console.log(sum);
    return sum;
}
calcTotal(15, 10);

//2 a//
function formatRecord(id, title, status) {
    var result = "#" + id + " " + title + " [" + status + "]";
    console.log(result);
    return result;
}
formatRecord(1, "Проверка", "new");


//1 b//
var values = [1200, 500, 800, 1500];
var sum_val = 0;

for (var j = 0; j < values.length; j++) {
    sum_val = sum_val + values[j];
}
console.log("Сумма:", sum_val);

//2 b//
var filter_val = [];

for (var k = 0; k < values.length; k++) {
    if (values[k] >= 800){
        filter_val.push(values[k]);
    }
}
console.log(filter_val);

//1 c//
const record = {
    id: 2,
    title: "Жасимов Пётр Петрович",
    value: 2500,
    status: "active", 
    createdAt: "2025-08-10"
  };
console.log("До изменения:", record);
record.status = "blocked";
console.log("Изменённый:", record);

//2 c//
function checkNew(record) {
    return record.status === "new";
}
const record1 = {id: 1, title: "Новая запись", status: "new"};
const record2 = {id: 2, title: "Готовая запись", status: "blocked"};

console.log("record1 является новой:", checkNew(record1));
console.log("record2 является новой:", checkNew(record2));

//1 d//
const testItems = [
    { id: 1, title: "запись testItems", value: 1000 },
    { id: 2, title: "запись testItems", value: 500 },
    { id: 3, title: "запись testItems", value: 1500 },
    { id: 4, title: "запись testItems", value: 2250 }
];
const found = testItems.find(item => item.id === 3);
if (found) {
    console.log(found);
} else {
    console.log("null");
}

const found2 = testItems.find(item => item.id === 99);
if (found2) {
    console.log(found2);
} else {
    console.log("null");
}

//2 d//
const statfs = testItems.reduce(
    (acc, item) => ({
        totalCount: acc.totalCount + 1,
        sumValue: acc.sumValue + item.value
    }),
    { totalCount: 0, sumValue: 0 }
);

console.log(statfs);