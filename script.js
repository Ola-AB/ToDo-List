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
	UL_LIST.addEventListener("click", checkClick);
	ADD_POPUP_BTN.addEventListener("click", changeTodo);
	CLOSE_TODO_BTN.addEventListener("click", closePopup);
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
		createToolsArea();
	} else {
		ALERT_INFO.innerText = "Wpisz treść zadania!";
	}
};

const enterCheck = (e) => {
	if (e.key === "Enter") {
		addNewTask();
	}
};

const createToolsArea = () => {
	const toolsPanel = document.createElement("div");
	toolsPanel.classList.add("tools");
	NEW_TASK.appendChild(toolsPanel);

	const completeBtn = document.createElement("button");
	completeBtn.classList.add("complete");
	completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

	const editBtn = document.createElement("button");
	editBtn.classList.add("edit");
	editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("delete");
	deleteBtn.innerHTML = '<i class="fa-solid fa-x"></i>';

	toolsPanel.appendChild(completeBtn);
	toolsPanel.appendChild(editBtn);
	toolsPanel.appendChild(deleteBtn);
};

const checkClick = (e) => {
	if (e.target.classList.value !== "") {
		if (e.target.closest("button").classList.contains("complete")) {
			e.target.closest("li").classList.toggle("completed");
			e.target.closest("button").classList.toggle("completed");

			console.log("ok");
		} else if (e.target.closest("button").classList.contains("edit")) {
			editTask(e);
		} else if (e.target.closest("button").classList.contains("delete")) {
			deleteTask(e);
		}
	}
};

const editTask = (e) => {
	const oldTodo = e.target.closest("li").id;
	EDITED_TODO = document.getElementById(oldTodo);
	POPUP_INPUT.value = EDITED_TODO.firstChild.textContent;

	POPUP.style.display = "flex";
};

const changeTodo = () => {
	if (POPUP_INPUT.value !== "") {
		EDITED_TODO.firstChild.textContent = POPUP_INPUT.value;
		POPUP.style.display = "none";
		POPUP_INFO.innerText = "";
	} else {
		POPUP_INFO.innerText = "Musisz podać treść zadania!";
	}
};

const deleteTask = (e) => {
	const dleteTodo = e.target.closest("li");
	dleteTodo.remove();

	if (ALL_TASKS.length === 0) {
		ALERT_INFO.innerText = "Brak zadań na liście.";
	}
};

closePopup = () => {
	POPUP.style.display = "none";
	POPUP_INFO.innerText = "";
};

document.addEventListener("DOMContentLoaded", main);
