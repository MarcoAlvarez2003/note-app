"use strict";
var Formulary;
(function (Formulary) {
    Formulary.form = document.getElementById("form");
    Formulary.modal = document.getElementById("form-modal");
    Formulary.name = document.getElementById("name");
    Formulary.listNames = document.getElementById("task-names");
    Formulary.description = document.getElementById("description");
    Formulary.day = document.getElementById("day");
    Formulary.year = document.getElementById("year");
    Formulary.month = document.getElementById("month");
    Formulary.restartTimeData = function () {
        var date = new Date();
        Formulary.year.value = date.getFullYear().toString();
        Formulary.day.value = date.getDate().toString().padStart(2, "0");
        Formulary.month.value = (date.getMonth() + 1).toString().padStart(2, "0");
    };
    Formulary.parseDate = function (date) { return date.padStart(2, "0"); };
    Formulary.isValidForm = function () { return !!Formulary.name.value && !!Formulary.description.value; };
    Formulary.restartTimeData();
})(Formulary || (Formulary = {}));
var Task;
(function (Task) {
    Task.tasks = JSON.parse(localStorage.getItem("TaskStore") || "[]");
    Task.onCreateTask = function (_a) {
        var name = _a.name, description = _a.description, date = _a.date;
    };
    var create = function (_a) {
        var name = _a.name, description = _a.description, date = _a.date;
        Task.tasks.push({ name: name, description: description, date: date });
        Task.onCreateTask({ name: name, description: description, date: date });
        close();
        Task.save();
    };
    var close = function () {
        Formulary.modal.classList.add("hide");
        Formulary.form.reset();
    };
    Task.builder = function (_a) {
        var name = _a.name, description = _a.description, date = _a.date;
        var task = document.createElement("div");
        var taskHead = document.createElement("div");
        var taskBody = document.createElement("div");
        task.classList.add("task");
        taskHead.classList.add("task__head");
        taskBody.classList.add("task__body");
        taskHead.innerHTML = "\n        " + name + " -\n            <small>\n                <i>\n                    " + date.join(" / ") + "\n                </i>\n            </small>\n        ";
        taskBody.textContent = description;
        task.appendChild(taskHead);
        task.appendChild(taskBody);
        return task;
    };
    Task.remove = function (key) {
        Task.tasks.splice(Task.tasks.findIndex(function (task) { return task.name === key; }), 1);
        Task.save();
    };
    Task.save = function () { return localStorage.setItem("TaskStore", JSON.stringify(Task.tasks)); };
    Task.createTask = function () {
        create({
            name: Formulary.name.value,
            description: Formulary.description.value,
            date: [
                Formulary.year.value,
                Formulary.parseDate(Formulary.month.value),
                Formulary.parseDate(Formulary.day.value),
            ],
        });
    };
    Formulary.form.addEventListener("click", function (e) {
        e.preventDefault();
        var action = e.target.dataset.action;
        if (action) {
            if (action === "create") {
                if (Formulary.isValidForm())
                    Task.createTask();
                else
                    alert("Invalid Task");
            }
            else
                close();
        }
    });
})(Task || (Task = {}));
var Modal;
(function (Modal) {
    Modal.modal = document.getElementById("modal");
    Modal.name = document.getElementById("showbox-title");
    Modal.description = document.getElementById("showbox-content");
    Modal.remove = document.getElementById("remove");
    Modal.close = document.getElementById("close-modal");
})(Modal || (Modal = {}));
var app = document.getElementById("app");
var toggle = document.getElementById("toggle");
var container = document.getElementById("container");
var fragment = document.createDocumentFragment();
var optionFragment = document.createDocumentFragment();
toggle.addEventListener("click", function () {
    Formulary.modal.classList.remove("hide");
});
var createTask = function (_a) {
    var name = _a.name, description = _a.description, date = _a.date;
    var block = document.createElement("div");
    var task = Task.builder({ name: name, description: description, date: date });
    block.classList.add("block");
    block.appendChild(task);
    block.id = name;
    block.addEventListener("click", function () {
        Modal.modal.classList.remove("hide");
        Modal.name.textContent = name;
        Modal.name.dataset.key = name;
        Modal.description.textContent = description;
    });
    return block;
};
var createOption = function (_a) {
    var name = _a.name, description = _a.description;
    var option = document.createElement("option");
    option.textContent = description;
    option.id = "__" + name;
    option.value = name;
    return option;
};
Task.tasks.forEach(function (task) {
    fragment.appendChild(createTask(task));
    optionFragment.appendChild(createOption(task));
});
Modal.remove.addEventListener("click", function () {
    var _a, _b;
    var key = Modal.name.dataset.key;
    Task.remove(key);
    (_a = document.getElementById(key)) === null || _a === void 0 ? void 0 : _a.remove();
    (_b = document.getElementById("__" + key)) === null || _b === void 0 ? void 0 : _b.remove();
    Modal.close.click();
});
Modal.close.addEventListener("click", function () {
    Modal.modal.classList.add("hide");
    Modal.name.textContent = "";
    Modal.name.dataset.key = "";
    Modal.description.textContent = "";
});
Task.onCreateTask = function (_a) {
    var name = _a.name, description = _a.description, date = _a.date;
    container.appendChild(createTask({ name: name, description: description, date: date }));
    Formulary.listNames.appendChild(createOption({ name: name, description: description, date: date }));
};
container.appendChild(fragment);
Formulary.listNames.appendChild(optionFragment);
