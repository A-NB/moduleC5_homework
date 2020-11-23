/*Задание 4.

Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:
        Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
        Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
Пример: если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
После получения данных вывести ниже картинку на экран.
Подсказка: получение данных из input.
const value = document.querySelector('input').value;*/


// Нода для вставки результата запроса.
const resultNode = document.querySelector('.j-result');
// Кнопка, по нажатии на которую будет осуществлён запрос.
const btnNode = document.querySelector('.j-btn-request');
// Инпут, в который вводится количество загружаемых фотографий.
const inputWidthNode = document.querySelector('#j-width');
const inputHeightNode = document.querySelector('#j-height');

// Функция, которая возвращаем fetch
const useRequest = (url) => {
  return fetch(url)
    .then((response) => {
      // console.log('response', response);
      // return response;
      displayResult(response);
    })
    // .then((json) => { return json; })
    .catch(() => { console.log('error') });
}

/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */
function displayResult(apiData) {
  const card = `
    <div class="card">
      <img
        src="${apiData.url}"
        class="card-image"
        alt="${apiData.url}"
      />
    </div>
  `;
  resultNode.innerHTML = card;
};

/**
  * Функция для формирования URL
  */
function makeURL(val) {
  return `https://picsum.photos/${val}`;
};

/**
  * Функция валидации введённых данных. При успешной валидации
  * осуществляется запрос, в противном случае выводится
  * сообщение об ошибке.
  */
function clickButton() {
  const inputWidthNodeValue = Number(inputWidthNode.value);
  const inputHeightNodeValue = Number(inputHeightNode.value);

  if ( inputWidthNodeValue >= 100 && inputWidthNodeValue <= 300 && inputHeightNodeValue >= 100 && inputHeightNodeValue <= 300) {
    useRequest(makeURL(`${inputWidthNodeValue}/${inputHeightNodeValue}`), displayResult);
  } else {
    resultNode.innerHTML = 'Одно из чисел вне диапазона от 100 до 300';
  };  
};

// Обработчик нажатия Enter на инпут с id="j-width"
inputWidthNode.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    inputHeightNode.focus();
    inputHeightNode.selectionStart = inputHeightNode.value.length;    
  }
});

// Обработчик нажатия Enter на инпут с id="j-height"
inputHeightNode.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    btnNode.focus();
    // clickButton();
  }
});

// Обработчик на кнопку для запроса
btnNode.addEventListener('click', clickButton);

// onkeydown="return event.keyCode != 13 || clickButton();"
