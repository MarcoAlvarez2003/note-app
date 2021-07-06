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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var Translator;
(function (Translator) {
    var _this = this;
    var _a;
    (_a = document.getElementById("reset-lang")) === null || _a === void 0 ? void 0 : _a.addEventListener("dblclick", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    localStorage.removeItem("@notes/lang");
                    return [4, Translator.translate()];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    var getDefaultLanguage = function () {
        var language = localStorage.getItem("@notes/lang");
        return language
            ? language
            : isValidLanguage(prompt("what is your language / cual es tu idioma", "en"));
    };
    var isValidLanguage = function (lang) {
        while (!/(es|en)/.test(lang)) {
            lang = prompt("what is your language / cual es tu idioma", "en");
        }
        localStorage.setItem("@notes/lang", lang);
        return lang;
    };
    var getFile = function () { return __awaiter(_this, void 0, void 0, function () {
        var text, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    text = localStorage.getItem("@notes/translation");
                    if (!text) return [3, 1];
                    _a = JSON.parse(text);
                    return [3, 3];
                case 1: return [4, readFile("./source/assets/translations.json")];
                case 2:
                    _a = _b.sent();
                    _b.label = 3;
                case 3: return [2, _a];
            }
        });
    }); };
    var readFile = function (path) { return __awaiter(_this, void 0, void 0, function () {
        var request, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch(path)];
                case 1:
                    request = _a.sent();
                    return [4, request.text()];
                case 2:
                    text = _a.sent();
                    saveFile(text);
                    return [2, JSON.parse(text)];
            }
        });
    }); };
    var saveFile = function (data) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            localStorage.setItem("@notes/translation", data);
            return [2];
        });
    }); };
    Translator.translate = function () { return __awaiter(_this, void 0, void 0, function () {
        var lang, translations, translation, nodes, nodes_1, nodes_1_1, node, traduction;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    lang = getDefaultLanguage();
                    return [4, getFile()];
                case 1:
                    translations = _b.sent();
                    translation = translations[lang];
                    nodes = Array.from(document.getElementsByClassName("traductor"));
                    try {
                        for (nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                            node = nodes_1_1.value;
                            traduction = translation[node.dataset.keyname];
                            if ("placeholder" in node)
                                node.placeholder = traduction;
                            else
                                node.textContent = traduction;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return [2];
            }
        });
    }); };
})(Translator || (Translator = {}));
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
Translator.translate();
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
