/*Задание 2.
Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать JSON в JS-объект и выводить его в консоль.

JSON:
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}

JS-объект:
{
  list: [
    { name: 'Petr', age: 20, prof: 'mechanic' },
    { name: 'Vova', age: 60, prof: 'pilot' },
  ]
}*/


// /* Этап 1. Подготовка данных */
// // JSON, который мы будем парсить
const jsonString = `
{
  "list": [
   {
    "name": "Petr",
    "age": "20",
    "prof": "mechanic"
   },
   {
    "name": "Vova",
    "age": "60",
    "prof": "pilot"
   },
   {
    "name": "Yura",
    "age": "38",
    "prof": "free"
   },
   {
    "name": "Sveta",
    "age": "28",
    "prof": "buhgalter"
   },
   {
    "name": "Iracli",
    "age": "31",
    "prof": "ingeneer"
   }
  ]
 }
`;
// console.log('jsonString', jsonString);

/* Этап 2. Получение данных */
const data = JSON.parse(jsonString);
// console.log('data', data);
const peopleArray = data.list;
// console.log('peopleArray', peopleArray);
let people = [];
peopleArray.forEach(function(person, i, peopleArray) {
  let personObj = {
    name: person.name,
    age: Number(person.age),
    prof: person.prof,
  };
  people.push(personObj) 
  // console.log('people', people);
});

/* Этап 3. Запись данных в результирующий объект */
const result = {
  list: people
};

console.log('result', result);