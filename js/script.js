var link = document.querySelector(".feedback-link");

var modal = document.querySelector(".modal-feedback");
var close = modal.querySelector(".modal-close");

var form = modal.querySelector("form");
var name = modal.querySelector("[name=feedback-name]");
var email = modal.querySelector("[name=feedback-email]");
var text = modal.querySelector("[name=feedback-text]");

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

try {
  storageName = localStorage.getItem("feedback-name");
  storageEmail = localStorage.getItem("feedback-email");
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  modal.classList.add("modal-show");

  if (storageName && storageEmail) {
    name.value = storageName;
    email.value = storageEmail;
    text.focus();
  } else {
    if (storageName) {
      name.value = storageName;
      email.focus();
    }
    else {
      if (storageEmail) {
        email.value = storageEmail;
        name.focus();
      }
      else {
        name.focus();
      }
    }
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  modal.classList.remove("modal-show");
  modal.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
  if (!text.value) {
    evt.preventDefault();
    modal.classList.remove("modal-error");
    modal.offsetWidth = modal.offsetWidth;
    modal.classList.add("modal-error");
    text.classList.add("input-invalid");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("feedback-name", name.value);
      localStorage.setItem("feedback-email", email.value);
      localStorage.setItem("feedback-text", text.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modal.classList.contains("modal-show")) {
      modal.classList.remove("modal-show");
      modal.classList.remove("modal-error");
    }
  }
});

var mapLink = document.querySelector(".contacts-map-link");

var mapPopup = document.querySelector(".modal-map");
var mapClose = mapPopup.querySelector(".modal-close");

mapLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapPopup.classList.add("modal-show");
});

mapClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapPopup.classList.remove("modal-show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (mapPopup.classList.contains("modal-show")) {
      mapPopup.classList.remove("modal-show");
    }
  }
});

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [59.938631, 30.327055],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 15
  });
  //Убираем лишние элементы управления
  myMap.controls.remove("searchControl");
  myMap.controls.remove("trafficControl");
  myMap.controls.remove("typeSelector");
  myMap.controls.remove("fullscreenControl");
  var myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
    // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
    balloonContentHeader: "Device",
    balloonContentBody: "г. Москва, ул. Строителей, 15 ",
    balloonContentFooter: "+7 (495) 495-95-95",
    hintContent: "Device"
  });
  myMap.geoObjects.add(myPlacemark);
}
