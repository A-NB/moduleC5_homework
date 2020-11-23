/*Задание 5.

Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
        Заголовок первого input — «номер страницы».
        Заголовок второго input — «лимит».
        Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:
        Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
        Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
        Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
        Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 

Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.

После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).
*/

// Нода для вставки результата запроса.
const resultNode = document.querySelector('.j-result');
// Кнопка, по нажатии на которую будет осуществлён запрос.
const btnNode = document.querySelector('.j-btn-request');
// Инпут, в который вводится номер страницы сайта.
const inputPageNode = document.querySelector('#j-page');
// Инпут, в который вводится количество загружаемых фото.
const inputLimitNode = document.querySelector('#j-limit');

// Функция, которая возвращает fetch
const useRequest = (url) => {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      localStorage.setItem('myJSON', JSON.stringify(json));
      displayResult(json);      
    })
    .catch(() => { console.log('error') });
}

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
        <p>Автор: ${item.author}</p>        
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
  return `https://picsum.photos/v2/list?${val}`;
};

/**
  * Функция валидации введённых данных. При успешной валидации
  * осуществляется запрос, в противном случае выводится
  * сообщение об ошибке.
  */
function clickButton() {
  const inputPageNodeValue = Number(inputPageNode.value);
  const inputLimitNodeValue = Number(inputLimitNode.value);
  let errMessage = '';
  if ( inputPageNodeValue < 1 || inputPageNodeValue > 10 ) {
    errMessage = 'Номер страницы вне диапазона от 1 до 10';
  };
  if ( inputLimitNodeValue < 1 || inputLimitNodeValue > 10 ) {
    if (!errMessage) {
      errMessage = 'Лимит вне диапазона от 1 до 10';        
    } else {
      errMessage = 'Номер страницы и лимит вне диапазона от 1 до 10';
    };
  };
  if (!errMessage) {
    useRequest(makeURL(`page=${inputPageNodeValue}&limit=${inputLimitNodeValue}`), displayResult);
  } else {
    resultNode.innerHTML = errMessage;
  }; 
};

// Обработчик нажатия Enter на инпут с id="j-page"
inputPageNode.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    inputLimitNode.focus();
    inputLimitNode.selectionStart = inputLimitNode.value.length;    
  }
});

// Обработчик нажатия Enter на инпут с id="j-limit"
inputLimitNode.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    btnNode.focus();
    // clickButton();
  }
});

// Обработчик на кнопку для запроса
btnNode.addEventListener('click', clickButton);

window.onload = function() {
  // Получаем данные по ключу myJSON из localStorage  
  const myJSON = localStorage.getItem('myJSON');  
  // debugger;
  // console.log(inputPageNode.value);
  // console.log(inputLimitNode.value);
  if (!inputPageNode.value && !inputLimitNode.value) {
    inputPageNode.focus()
  } else {
    btnNode.focus();  
  }
  if (myJSON) {
    displayResult(JSON.parse(myJSON))
  };
}