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
var DisplayAdapter = (function () {
    function DisplayAdapter() {
    }
    DisplayAdapter.adapt = function () {
        document.body.style.height = innerHeight + "px";
    };
    return DisplayAdapter;
}());
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var main = function () {
    var fragment = Note.createArrayOfTasks.apply(Note, __spreadArray([], __read(Task.tasks)));
    var optionFragment = document.createDocumentFragment();
    Interface.taskActivator.addEventListener("click", function () {
        Formulary.modal.classList.remove("hide");
    });
    var createOption = function (_a) {
        var id = _a.id, name = _a.name, description = _a.description;
        var option = document.createElement("option");
        option.textContent = description;
        option.id = "$" + id;
        option.value = name;
        return option;
    };
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
        Interface.taskContainer.appendChild(new Note(task).task);
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
var Translator = (function () {
    function Translator() {
    }
    Translator.translate = function () {
        var lang = this.lang === "es" ? "es" : "en";
        this.translateTo(lang);
    };
    Translator.translateTo = function (lang) {
        var e_1, _a;
        var traduction = this.__translations[lang];
        try {
            for (var _b = __values(this.translatableNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var node = _c.value;
                var key = node.dataset.key;
                this.isInputOrTextArea(node)
                    ? (node.placeholder = traduction[key])
                    : (node.textContent = traduction[key]);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.translateHTML(lang);
    };
    Object.defineProperty(Translator, "lang", {
        get: function () {
            var lang = localStorage.getItem("@notes/lang");
            return lang ? lang : this.requestLanguage();
        },
        enumerable: false,
        configurable: true
    });
    Translator.requestLanguage = function () {
        var lang = navigator.language.split("-")[0];
        return lang;
    };
    Object.defineProperty(Translator, "translatableNodes", {
        get: function () {
            var nodes = document.getElementsByClassName("translatable");
            return Array.from(nodes);
        },
        enumerable: false,
        configurable: true
    });
    Translator.isInputOrTextArea = function (node) {
        return node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement;
    };
    Translator.translateHTML = function (lang) {
        var html = document.lastChild;
        if (html)
            html.lang = lang;
    };
    Translator.__translations = {
        en: {
            appName: "Notes",
            formNamePlace: "Write a name for the task",
            formDescriptionPlace: "Write a description for the task",
            formColorPlace: "Color",
            formCreateButton: "Create",
            formCloseButton: "Close",
            modalRemoveButton: "Remove",
            modalCloseButton: "Close",
        },
        es: {
            appName: "Notas",
            formNamePlace: "Escribe un nombre para la tarea",
            formDescriptionPlace: "Escribe una descripcion para la tarea",
            formColorPlace: "Color",
            formCreateButton: "Crear",
            formCloseButton: "Cerrar",
            modalRemoveButton: "Remover",
            modalCloseButton: "Cerrar",
        },
    };
    return Translator;
}());
var Note = (function () {
    function Note(task) {
        var _this = this;
        this.container = document.createElement("div");
        this.information = task;
        this.container.addEventListener("click", function () { return _this.show(task); });
    }
    Note.prototype.build = function () {
        this.container.appendChild(Task.build(this.information));
        this.container.id = this.information.id;
        this.setContainerStyles();
    };
    Note.prototype.show = function (self) {
        TaskDesk.modal.classList.remove("hide");
        TaskDesk.name.dataset.key = self.id;
        TaskDesk.name.textContent = self.name;
        TaskDesk.description.innerHTML = self.description;
    };
    Note.prototype.setContainerStyles = function () {
        this.container.classList.add("block", "block--container");
        this.container.style.animationDelay = Note.delay + "s";
    };
    Object.defineProperty(Note.prototype, "task", {
        get: function () {
            this.build();
            return this.container;
        },
        enumerable: false,
        configurable: true
    });
    Note.createArrayOfTasks = function () {
        var e_2, _a;
        var tasks = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tasks[_i] = arguments[_i];
        }
        var fragment = document.createDocumentFragment();
        try {
            for (var tasks_1 = __values(tasks), tasks_1_1 = tasks_1.next(); !tasks_1_1.done; tasks_1_1 = tasks_1.next()) {
                var task = tasks_1_1.value;
                fragment.appendChild(new Note(task).task);
                this.delay += 0.25;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (tasks_1_1 && !tasks_1_1.done && (_a = tasks_1.return)) _a.call(tasks_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.delay = 0;
        return fragment;
    };
    Note.delay = 0;
    return Note;
}());
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
var Interface = (function () {
    function Interface() {
    }
    Interface.application = document.getElementById("app");
    Interface.taskActivator = document.getElementById("activator");
    Interface.taskContainer = document.getElementById("container");
    return Interface;
}());
