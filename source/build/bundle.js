"use strict";
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
    Interface.taskActivator.addEventListener("click", function () {
        Form.show();
    });
    TaskDesk.remove.addEventListener("click", function () {
        var _a;
        var key = TaskDesk.name.dataset.key;
        (_a = document.getElementById(key)) === null || _a === void 0 ? void 0 : _a.remove();
        TaskDesk.close.click();
        Task.remove(key);
    });
    TaskDesk.close.addEventListener("click", function () {
        TaskDesk.modal.classList.add("hide");
        TaskDesk.name.textContent = "";
        TaskDesk.name.dataset.key = "";
        TaskDesk.description.textContent = "";
    });
    Task.onCreate = function (task) {
        Interface.taskContainer.appendChild(new Note(task).task);
    };
    Interface.taskContainer.appendChild(fragment);
};
addEventListener("load", function () {
    DisplayAdapter.adapt();
    Translator.translate();
    main();
});
addEventListener("resize", DisplayAdapter.adapt, false);
!localStorage.getItem("restared")
    ? (localStorage.clear(), localStorage.setItem("restared", "true"))
    : console.log("this version has updated");
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
            formNamePlace: "Name of task",
            formDescriptionPlace: "Write a description for the task",
            formBorderColorPlace: "Border color",
            formTextColorPlace: "Text color",
            formYearPlace: "Year",
            formMonthPlace: "Month",
            formDayPlace: "Day",
            formCreateButton: "Create",
            formCloseButton: "Close",
            modalRemoveButton: "Remove",
            modalCloseButton: "Close",
        },
        es: {
            appName: "Notas",
            formNamePlace: "Nombre de la tarea",
            formDescriptionPlace: "Escribe una descripcion para la tarea",
            formBorderColorPlace: "Color del borde",
            formTextColorPlace: "Color del texto",
            formYearPlace: "Año",
            formMonthPlace: "Mes",
            formDayPlace: "Día",
            formCreateButton: "Crear",
            formCloseButton: "Cerrar",
            modalRemoveButton: "Remover",
            modalCloseButton: "Cerrar",
        },
    };
    return Translator;
}());
var DateParser = (function () {
    function DateParser() {
    }
    DateParser.parseYear = function (year) {
        var currentYear = new Date().getFullYear();
        return this.checkDate(currentYear, year);
    };
    DateParser.parseMonth = function (month) {
        var currentMonth = new Date().getMonth();
        return this.checkDate(currentMonth, month);
    };
    DateParser.parseDay = function (day) {
        var currentDay = new Date().getDate();
        return this.checkDate(currentDay, day);
    };
    DateParser.checkDate = function (current, recived) {
        return !Number.isNaN(recived) && recived >= current ? recived : current;
    };
    return DateParser;
}());
var FormValidator = (function () {
    function FormValidator() {
    }
    FormValidator.isValid = function (_a) {
        var name = _a.name, description = _a.content;
        return !!name && !!description;
    };
    return FormValidator;
}());
var Form;
(function (Form) {
    Form.onsubmit = function (task) { };
    var form = document.getElementById("form");
    var modal = document.getElementById("form-modal");
    var borderColorInput = document.getElementById("form-color");
    var textColorInput = document.getElementById("form-text-color");
    var Data = (function () {
        function Data() {
        }
        Object.defineProperty(Data, "id", {
            get: function () {
                return new Date().getTime().toString();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Data, "title", {
            get: function () {
                return document.getElementById("form-name").value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Data, "content", {
            get: function () {
                return this.body.value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Data, "year", {
            get: function () {
                var year = document.getElementById("form-year").value;
                return DateParser.parseYear(parseInt(year));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Data, "month", {
            get: function () {
                var month = document.getElementById("form-month").value;
                return DateParser.parseMonth(parseInt(month));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Data, "day", {
            get: function () {
                var day = document.getElementById("form-day").value;
                return DateParser.parseDay(parseInt(day));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Data, "borderColor", {
            get: function () {
                return borderColorInput.value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Data, "textColor", {
            get: function () {
                return textColorInput.value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Data, "task", {
            get: function () {
                return {
                    id: this.id,
                    name: this.title,
                    content: this.content,
                    color: {
                        text: this.textColor,
                        border: this.borderColor,
                    },
                    date: {
                        year: this.year,
                        month: this.month,
                        day: this.day,
                    },
                };
            },
            enumerable: false,
            configurable: true
        });
        Data.body = document.getElementById("form-content");
        return Data;
    }());
    var invalid = function () { return alert("this task is invali"); };
    var showFinalColor = function (e) {
        var input = e.target;
        input.style.color = input.value;
    };
    Form.hide = function () { return modal.classList.add("hide"); };
    Form.show = function () { return modal.classList.remove("hide"); };
    Form.reset = function () { return form.reset(); };
    Form.close = function () { return (Form.hide(), Form.reset()); };
    form.addEventListener("click", function (e) {
        e.preventDefault();
        var action = e.target.dataset.action;
        action === "create"
            ? FormValidator.isValid(Data.task)
                ? Form.onsubmit(Data.task)
                : invalid()
            : action === "close"
                ? Form.close()
                : false;
    });
    textColorInput.addEventListener("input", showFinalColor);
    borderColorInput.addEventListener("input", showFinalColor);
})(Form || (Form = {}));
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
        TaskDesk.description.innerHTML = self.content;
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
    function Task(task) {
        Task.tasks.push(task);
        Task.__oncreate(task);
        Form.close();
        Task.save();
    }
    Task.build = function (_a) {
        var name = _a.name, color = _a.color, date = _a.date, description = _a.content;
        var border = color.border, text = color.text;
        var day = date.day, month = date.month, year = date.year;
        var task = this.createNodeWithClass("div", "task");
        var head = this.createNodeWithClass("div", "task__head");
        var body = this.createNodeWithClass("div", "task__body");
        task.appendChild(head);
        task.appendChild(body);
        body.innerHTML = description;
        head.innerHTML = name + " - <i style=\"color:" + text + "\">[ " + year + " / " + month + " / " + day + " ]</i>";
        body.style.color = text;
        task.style.borderColor = border;
        head.style.borderBottomColor = border;
        task.style.boxShadow = "0 0 10px " + border;
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
Form.onsubmit = function (task) {
    task.content = task.content.replace(/(\n)/g, "br>");
    new Task(task);
};
var Interface = (function () {
    function Interface() {
    }
    Interface.application = document.getElementById("app");
    Interface.taskActivator = document.getElementById("activator");
    Interface.taskContainer = document.getElementById("container");
    return Interface;
}());
