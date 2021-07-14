"use strict";
var Formulary;
(function (Formulary) {
    Formulary.form = document.getElementById("form");
    Formulary.modal = document.getElementById("form-modal");
    Formulary.listNames = document.getElementById("task-names");
    Formulary.name = document.getElementById("name");
    Formulary.description = document.getElementById("description");
    Formulary.color = document.getElementById("color");
    Formulary.reset = function () {
        Formulary.form.reset();
    };
    var showFinalColor = function () {
        Formulary.color.style.color = Formulary.color.value;
    };
    Formulary.isValidForm = function () { return !!Formulary.name.value && !!Formulary.description.value; };
    Formulary.color.addEventListener("input", showFinalColor, false);
    Formulary.close = function () {
        Formulary.modal.classList.add("hide");
        Formulary.reset();
    };
    Formulary.reset();
})(Formulary || (Formulary = {}));
var DisplayAdapter;
(function (DisplayAdapter) {
    DisplayAdapter.adapt = function () {
        document.body.style.height = window.innerHeight + "px";
    };
})(DisplayAdapter || (DisplayAdapter = {}));
var main = function () {
    var delay = 0;
    var fragment = document.createDocumentFragment();
    var optionFragment = document.createDocumentFragment();
    Interface.taskActivator.addEventListener("click", function () {
        Formulary.modal.classList.remove("hide");
    });
    var createTask = function (__task) {
        var block = document.createElement("div");
        var id = __task.id, name = __task.name, description = __task.description;
        var task = Task.build(__task);
        block.classList.add("block");
        block.appendChild(task);
        block.id = id;
        block.style.position = "relative";
        block.style.right = "100%";
        block.style.animation = "Task 1s 1 forwards";
        block.style.animationDelay = delay + "s";
        block.addEventListener("click", function () {
            TaskDesk.modal.classList.remove("hide");
            TaskDesk.name.textContent = name;
            TaskDesk.name.dataset.key = id;
            TaskDesk.description.innerHTML = description;
        });
        delay += 0.25;
        return block;
    };
    var createOption = function (_a) {
        var id = _a.id, name = _a.name, description = _a.description;
        var option = document.createElement("option");
        option.textContent = description;
        option.id = "$" + id;
        option.value = name;
        return option;
    };
    Task.tasks.forEach(function (task) {
        fragment.appendChild(createTask(task));
        optionFragment.appendChild(createOption(task));
    });
    TaskDesk.remove.addEventListener("click", function () {
        var _a, _b;
        var key = TaskDesk.name.dataset.key;
        Task.remove(key);
        (_a = document.getElementById("$" + key)) === null || _a === void 0 ? void 0 : _a.remove();
        (_b = document.getElementById(key)) === null || _b === void 0 ? void 0 : _b.remove();
        TaskDesk.close.click();
    });
    TaskDesk.close.addEventListener("click", function () {
        TaskDesk.modal.classList.add("hide");
        TaskDesk.name.textContent = "";
        TaskDesk.name.dataset.key = "";
        TaskDesk.description.textContent = "";
    });
    Task.onCreate = function (task) {
        Interface.taskContainer.appendChild(createTask(task));
        Formulary.listNames.appendChild(createOption(task));
    };
    Interface.taskContainer.appendChild(fragment);
    Formulary.listNames.appendChild(optionFragment);
};
addEventListener("load", function () {
    DisplayAdapter.adapt();
    Translator.translate();
    main();
});
addEventListener("resize", DisplayAdapter.adapt, false);
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
var TaskDesk;
(function (TaskDesk) {
    TaskDesk.modal = document.getElementById("modal");
    TaskDesk.name = document.getElementById("task-desk-title");
    TaskDesk.description = document.getElementById("task-desk-content");
    TaskDesk.remove = document.getElementById("remove");
    TaskDesk.close = document.getElementById("close-modal");
})(TaskDesk || (TaskDesk = {}));
var Task = (function () {
    function Task(_a) {
        var name = _a.name, color = _a.color, description = _a.description, id = _a.id;
        Task.tasks.push({ name: name, color: color, description: description, id: id });
        Task.__oncreate({ name: name, color: color, description: description, id: id });
        Formulary.close();
        Task.save();
    }
    Task.build = function (_a) {
        var name = _a.name, color = _a.color, description = _a.description;
        var task = this.createNodeWithClass("div", "task");
        var head = this.createNodeWithClass("div", "task__head");
        var body = this.createNodeWithClass("div", "task__body");
        task.appendChild(head);
        task.appendChild(body);
        head.textContent = name;
        body.innerHTML = description;
        task.style.borderColor = color;
        head.style.borderBottomColor = color;
        task.style.boxShadow = "0 0 10px " + color;
        return task;
    };
    Task.createNodeWithClass = function (tagName, className) {
        var node = document.createElement(tagName);
        node.classList.add(className);
        return node;
    };
    Task.remove = function (name) {
        this.tasks.splice(this.findIndex(name), 1);
        this.save();
    };
    Task.findIndex = function (key) {
        return this.tasks.findIndex(function (_a) {
            var name = _a.name;
            return name === key;
        });
    };
    Task.save = function () {
        localStorage.setItem("TaskStore", JSON.stringify(this.tasks));
    };
    Object.defineProperty(Task, "onCreate", {
        set: function (fn) {
            this.__oncreate = fn;
        },
        enumerable: false,
        configurable: true
    });
    Task.__oncreate = function (task) { };
    Task.tasks = JSON.parse(localStorage.getItem("TaskStore") || "[]");
    return Task;
}());
Formulary.form.addEventListener("click", function (e) {
    e.preventDefault();
    var action = e.target.dataset.action;
    if (action === "create" && Formulary.isValidForm())
        new Task({
            name: Formulary.name.value,
            color: Formulary.color.value,
            id: new Date().getTime().toString(),
            description: Formulary.description.value,
        });
    else if (action === "ceate" && !Formulary.isValidForm())
        alert("Invalid Task");
    else if (action === "close")
        Formulary.close();
});
var Interface;
(function (Interface) {
    Interface.application = document.getElementById("app");
    Interface.taskActivator = document.getElementById("activator");
    Interface.taskContainer = document.getElementById("container");
})(Interface || (Interface = {}));
