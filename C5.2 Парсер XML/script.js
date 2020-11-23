/* Этап 1. Подготовка данных */

// Создание экземпляра класса DOMParser. Он позволит нам парсить XML
const parser = new DOMParser();
// console.log('parser', parser);

// XML, который мы будем парсить
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Пётр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
  <student>
    <name lang="fr">
      <first>Сёма</first>
      <second>Гольдштейн</second>
    </name>
    <age>29</age>
    <prof>manager</prof>
  </student>
  <student>
    <name lang="ua">
      <first>Сенька</first>
      <second>Тузик</second>
    </name>
    <age>36</age>
    <prof>free</prof>
  </student>    
</list>`;

// console.log('xmlString', xmlString);

// Список всех студентов
let studentsArr = [];

/* Этап 2. Получение данных */

// Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

// Получение всех DOM-нод
const listNode = xmlDOM.querySelector("list");

// Получение массива всех студентов
const studentNodeArray = listNode.querySelectorAll("student");

// Для каждого студента создаём отдельный элемент списка studentsArr
studentNodeArray.forEach(function(studentNode, i, studentNodeArray) {
  const nameNode = studentNode.querySelector("name");
  const firstNode = nameNode.querySelector("first");
  const secondNode = nameNode.querySelector("second");
  const ageNode = studentNode.querySelector("age");
  const profNode = studentNode.querySelector("prof");
  const nameAttr = nameNode.getAttribute('lang');  

  let student = {
    name: `${firstNode.textContent} ${secondNode.textContent}`,
    age: Number(ageNode.textContent),
    prof: profNode.textContent,
    lang: nameAttr,
  };
  studentsArr.push(student) 
  // console.log('studentsArr', studentsArr);
});

/* Этап 3. Запись данных в результирующий объект */
const result = {
  list: studentsArr
};

console.log('result', result);

/*   JS-объект:

{
  list: [
    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
  ]
}
*/