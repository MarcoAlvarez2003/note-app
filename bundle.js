"use strict";
var Formulary;
(function (Formulary) {
    Formulary.form = document.getElementById("form");
    Formulary.modal = document.getElementById("form-modal");
    Formulary.namesNode = document.getElementById("task-names");
    Formulary.name = document.getElementById("name");
    Formulary.description = document.getElementById("description");
    Formulary.day = document.getElementById("day");
    Formulary.year = document.getElementById("year");
    Formulary.month = document.getElementById("month");
    Formulary.color = document.getElementById("color");
    Formulary.reset = function () {
        Formulary.form.reset();
        resetDateData();
    };
    var showEndColor = function () {
        Formulary.color.style.color = Formulary.color.value;
    };
    var resetDateData = function () {
        var date = new Date();
        Formulary.day.value = date.getDate().toString();
        Formulary.year.value = date.getFullYear().toString();
        Formulary.month.value = (date.getMonth() + 1).toString();
    };
    Formulary.isValidForm = function () { return !!Formulary.name.value && !!Formulary.description.value; };
    Formulary.getDateData = function () { return Formulary.year.value + " / " + Formulary.month.value + " / " + Formulary.day.value; };
    Formulary.color.addEventListener("input", showEndColor, false);
    Formulary.reset();
})(Formulary || (Formulary = {}));
var Task;
(function (Task) {
    Task.tasks = JSON.parse(localStorage.getItem("TaskStore") || "[]");
    Task.onCreateTask = function (_a) {
        var name = _a.name, description = _a.description, date = _a.date;
    };
    var create = function (task) {
        Task.tasks.push(task);
        Task.onCreateTask(task);
        close();
        Task.save();
    };
    var close = function () {
        Formulary.modal.classList.add("hide");
        Formulary.form.reset();
    };
    Task.builder = function (_a) {
        var name = _a.name, description = _a.description, date = _a.date, color = _a.color;
        var task = document.createElement("div");
        var taskHead = document.createElement("div");
        var taskBody = document.createElement("div");
        task.classList.add("task");
        taskHead.classList.add("task__head");
        taskBody.classList.add("task__body");
        taskHead.innerHTML = "\n        " + name + " -\n            <small>\n                <i>\n                    " + date + "\n                </i>\n            </small>\n        ";
        taskBody.textContent = description;
        task.appendChild(taskHead);
        task.appendChild(taskBody);
        task.style.borderColor = color;
        taskHead.style.borderBottomColor = color;
        task.style.boxShadow = "0 0 10px " + color;
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
            color: Formulary.color.value,
            date: Formulary.getDateData(),
            description: Formulary.description.value,
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
var createTask = function (taskObject) {
    var block = document.createElement("div");
    var task = Task.builder(taskObject);
    block.classList.add("block");
    block.appendChild(task);
    block.id = taskObject.name;
    block.addEventListener("click", function () {
        Modal.modal.classList.remove("hide");
        Modal.name.textContent = taskObject.name;
        Modal.name.dataset.key = taskObject.name;
        Modal.description.textContent = taskObject.description;
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
Task.onCreateTask = function (task) {
    container.appendChild(createTask(task));
    Formulary.namesNode.appendChild(createOption(task));
};
container.appendChild(fragment);
Formulary.namesNode.appendChild(optionFragment);
