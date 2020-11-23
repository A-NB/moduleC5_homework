/*Задание 3.

Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:
        Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
        Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.
Пример: если пользователь ввёл 5, то запрос будет вида https://picsum.photos/v2/list?limit=5.
После получения данных вывести ниже картинки на экран.
Подсказка: получение данных из input.
const value = document.querySelector('input').value;*/


// Нода для вставки результата запроса.
const resultNode = document.querySelector('.j-result');
// Кнопка, по нажатии на которую будет осуществлён запрос.
const btnNode = document.querySelector('.j-btn-request');
// Инпут, в который вводится количество загружаемых фотографий.
const inputNode = document.querySelector('.input');

/**
  * Функция-обёртка над XMLHttpRequest, осуществляющая запрос.
  * url - URL, по которому будет осуществляться запрос.
  * callback - функция, которая вызовется при успешном выполнении
  * и первым параметром получит объект-результат запроса.
  */
 function useRequest(url, callback) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);

  // console.log(xhr);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
};

/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */
function displayResult(apiData) {
  let cards = '';

  //console.log('start cards', cards);
  
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
          alt="${item.download_url}"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
  
  // console.log('end cards', cards);
    
  resultNode.innerHTML = cards;
};

/**
  * Функция для формирования URL
  */
function makeURL(val) {
  return `https://picsum.photos/v2/list/?limit=${val}`;
};

/**
  * Функция валидации введённых данных. При успешной валидации
  * осуществляется запрос, в противном случае выводится
  * сообщение об ошибке.
  */
function clickButton() {
  const value = Number(inputNode.value);

  if ( value > 0 && value <= 10) {
    useRequest(makeURL(value), displayResult);
  } else {
    resultNode.innerHTML = 'Необходимо ввести число в диапазоне от 1 до 10';
  };  
}

// Обработчик нажатия Enter на инпут
inputNode.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    clickButton();
  }
});

// Обработчик на кнопку для запроса
btnNode.addEventListener('click', clickButton);

// onkeydown="return event.keyCode != 13 || clickButton();"