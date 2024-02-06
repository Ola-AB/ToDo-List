let TODO_INPUT; // miejsce, gdzie uzytkownik wpisuje treść
let ALERT_INFO; // info o braku zadań
let ADD_BTN; // przycisk DODAJ - dodaje nowe elementy do listy
let UL_LIST; // nasza lista zadań (tagi <ul></ul>)
let NEW_TASK; // nowe zadanie (nowo dodany LI)
let ALL_TASKS; // lista wszystkich zadań
let ID_NUMBER = 0; // ID dodawane do każdego nowego zadania
let POPUP; // ponrany popup
let POPUP_INFO; // alert w popupie (jak nie dodamy tekstu)
let EDITED_TODO; // edytowany Todo
let POPUP_INPUT; // tekst wpisywany w inputa, w popupie
let ADD_POPUP_BTN; //  przycisk "zatwierdź" w popupie
let CLOSE_TODO_BTN; // przycisk zamykający popup'a

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	TODO_INPUT = document.querySelector(".todo-input");
	ALERT_INFO = document.querySelector(".alert-info");
	ADD_BTN = document.querySelector(".add-btn");
	UL_LIST = document.querySelector(".todo-list ul");
	ALL_TASKS = document.getElementsByTagName("li");
	POPUP = document.querySelector(".popup");
	POPUP_INFO = document.querySelector(".popup-info");
	POPUP_INPUT = document.querySelector(".popup-input");
	ADD_POPUP_BTN = document.querySelector(".accept");
	CLOSE_TODO_BTN = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
	ADD_BTN.addEventListener("click", addNewTask);
	TODO_INPUT.addEventListener("keyup", enterCheck);
};

const addNewTask = () => {
	if (TODO_INPUT.value !== "") {
		ID_NUMBER++;
		NEW_TASK = document.createElement("li");
		NEW_TASK.innerText = TODO_INPUT.value;
		NEW_TASK.setAttribute("id", `todo-${ID_NUMBER}`);
		UL_LIST.appendChild(NEW_TASK);

		TODO_INPUT.value = "";
		ALERT_INFO.innerText = "";
	} else {
		ALERT_INFO.innerText = "Wpisz treść zadania!";
	}
};

const enterCheck = e => {
	if (e.key === 'Enter') {
		addNewTask();
	}
};

document.addEventListener("DOMContentLoaded", main);
