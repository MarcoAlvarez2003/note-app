"use strict";
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
var Archive = (function () {
    function Archive() {
    }
    Archive.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var aux = indexedDB === null || indexedDB === void 0 ? void 0 : indexedDB.open("@notes", _this.version);
                        aux.addEventListener("upgradeneeded", _this.upgrade, false);
                        aux.addEventListener("success", function () {
                            var store = aux.result.transaction("storage", "readwrite").objectStore("storage");
                            resolve(store);
                        });
                        aux.addEventListener("error", reject, false);
                    })];
            });
        });
    };
    Archive.upgrade = function () {
        this.result.createObjectStore("storage", { keyPath: "id" });
    };
    Archive.version = 1;
    return Archive;
}());
var DisplayAdapter;
(function (DisplayAdapter) {
    var viewport = document.querySelector("meta[name=viewport");
    var height = innerHeight;
    function adapt() {
        document.body.style.height = height + "px";
        meta();
    }
    DisplayAdapter.adapt = adapt;
    function meta() {
        var content = "width=device-width, height=" + height + "px, initial-scale=1.0";
        viewport.content = content;
    }
    window.addEventListener("resize", function () {
        height = innerHeight;
    });
})(DisplayAdapter || (DisplayAdapter = {}));
var Interface = (function () {
    function Interface() {
    }
    Interface.application = document.getElementById("app");
    Interface.taskActivator = document.getElementById("activator");
    Interface.taskContainer = document.getElementById("container");
    Interface.themeButton = document.getElementById("theme-button");
    return Interface;
}());
var Form;
(function (Form) {
    var _this = this;
    Form.onsubmit = function (task) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2];
    }); }); };
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
                return DateAnalyzer.Parse.year(parseInt(year));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Data, "month", {
            get: function () {
                var month = document.getElementById("form-month").value;
                return DateAnalyzer.Parse.month(parseInt(month));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Data, "day", {
            get: function () {
                var day = document.getElementById("form-day").value;
                return DateAnalyzer.Parse.day(parseInt(day));
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
        Data.selectionStart = Data.body.selectionStart;
        return Data;
    }());
    var invalid = function () { return alert("this task is invalid"); };
    var showFinalColor = function (e) {
        var input = e.target;
        input.style.color = input.value;
    };
    Form.hide = function () { return modal.classList.add("hide"); };
    Form.show = function () { return modal.classList.remove("hide"); };
    Form.reset = function () { return form.reset(); };
    Form.close = function () { return (Form.hide(), Form.reset()); };
    var isValid = function (_a) {
        var name = _a.name, content = _a.content;
        return name && content;
    };
    form.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
        var action, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    e.preventDefault();
                    action = e.target.dataset.action;
                    if (!(action === "create")) return [3, 4];
                    if (!isValid(Data.task)) return [3, 2];
                    return [4, Form.onsubmit(Data.task)];
                case 1:
                    _b = _c.sent();
                    return [3, 3];
                case 2:
                    _b = invalid();
                    _c.label = 3;
                case 3:
                    _a = _b;
                    return [3, 5];
                case 4:
                    _a = action === "close"
                        ? Form.close()
                        : false;
                    _c.label = 5;
                case 5:
                    _a;
                    return [2];
            }
        });
    }); });
    textColorInput.addEventListener("input", showFinalColor);
    borderColorInput.addEventListener("input", showFinalColor);
    Data.body.addEventListener("input", function () { return (Data.selectionStart = Data.body.selectionStart); });
})(Form || (Form = {}));
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
function Main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            loadTheme();
            Widget.init();
            convertOldData();
            Translator.translate();
            Archive.open().then(loadNotes).catch(console.log);
            return [2];
        });
    });
}
function loadTheme() {
    if (!localStorage.getItem("theme"))
        localStorage.setItem("theme", "dark");
    if (Interface.themeButton.firstElementChild) {
        var theme = localStorage.getItem("theme");
        var _theme = appThemesTranslations[Translator.lang][theme];
        Interface.application.classList.replace("app--dark", "app--" + theme);
        Interface.application.classList.remove("hide");
        Interface.themeButton.firstElementChild.textContent = _theme;
    }
}
function convertOldData() {
    return __awaiter(this, void 0, void 0, function () {
        var data, tasks, tasks_1, tasks_1_1, task, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = localStorage.getItem("TaskStore");
                    if (!data) return [3, 9];
                    tasks = JSON.parse(data);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    tasks_1 = __values(tasks), tasks_1_1 = tasks_1.next();
                    _b.label = 2;
                case 2:
                    if (!!tasks_1_1.done) return [3, 5];
                    task = tasks_1_1.value;
                    return [4, Archive.open()];
                case 3:
                    (_b.sent()).add(task);
                    _b.label = 4;
                case 4:
                    tasks_1_1 = tasks_1.next();
                    return [3, 2];
                case 5: return [3, 8];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 8];
                case 7:
                    try {
                        if (tasks_1_1 && !tasks_1_1.done && (_a = tasks_1.return)) _a.call(tasks_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 8:
                    localStorage.clear();
                    _b.label = 9;
                case 9: return [2];
            }
        });
    });
}
function loadNotes(store) {
    var fragment = document.createDocumentFragment();
    store.openCursor().addEventListener("success", function () {
        var _this = this;
        var cursor = this.result;
        if (cursor) {
            Interface.taskActivator.classList.remove("hide");
            var data_1 = cursor.value;
            var note = new _Note(data_1).node;
            note.onclick = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, showNote(data_1)];
                    case 1: return [2, _a.sent()];
                }
            }); }); };
            fragment.appendChild(note);
            _Note.delay += 0.25;
            cursor.continue();
        }
        else {
            Interface.taskContainer.appendChild(fragment);
            _Note.delay = 0;
        }
    });
}
function showNote(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Archive.open()];
                case 1:
                    (_a.sent()).get(data.id).addEventListener("success", function () {
                        Desk.Operations.assignTaskToDisplay = this.result;
                    });
                    return [2];
            }
        });
    });
}
function createNote(data) {
    var note = new _Note(data).node;
    note.onclick = function () { return showNote(data); };
    Interface.taskContainer.appendChild(note);
}
function saveNote(data) {
    return __awaiter(this, void 0, void 0, function () {
        var store;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Archive.open()];
                case 1:
                    store = _a.sent();
                    store.add(data).onsuccess = function () { };
                    return [2];
            }
        });
    });
}
Interface.taskActivator.addEventListener("click", function () {
    DisplayAdapter.adapt();
    Form.show();
});
Interface.taskContainer.addEventListener("dblclick", function () {
    var contain = !!!Interface.taskContainer.children[1];
    if (contain)
        Interface.taskActivator.click();
});
Interface.themeButton.addEventListener("click", function () {
    var theme;
    var tag = Interface.themeButton.firstElementChild;
    if (Interface.application.classList.contains("app--dark")) {
        Interface.application.classList.replace("app--dark", "app--light");
        theme = "light";
    }
    else {
        Interface.application.classList.replace("app--light", "app--dark");
        theme = "dark";
    }
    tag.textContent = appThemesTranslations[Translator.lang][theme];
    localStorage.setItem("theme", theme);
});
Form.onsubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Interface.taskActivator.classList.remove("hide");
                return [4, saveNote(data)];
            case 1:
                _a.sent();
                createNote(data);
                Form.close();
                return [2];
        }
    });
}); };
addEventListener("load", Main, false);
addEventListener("resize", DisplayAdapter.adapt, false);
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
var DateAnalyzer;
(function (DateAnalyzer) {
    var Parse = (function () {
        function Parse() {
        }
        Parse.year = function (year) {
            var currentYear = new Date().getFullYear();
            return this.parse([currentYear, year, Infinity]);
        };
        Parse.month = function (month) {
            var currentMonth = new Date().getMonth();
            return this.parse([currentMonth, month, 11]);
        };
        Parse.day = function (day) {
            var currentDay = new Date().getDate();
            return this.parse([currentDay, day, 30]);
        };
        Parse.parse = function (_a) {
            var _b = __read(_a, 3), current = _b[0], received = _b[1], max = _b[2];
            return !Number.isNaN(received) && received >= current
                ? received <= max
                    ? received
                    : max
                : current;
        };
        return Parse;
    }());
    DateAnalyzer.Parse = Parse;
})(DateAnalyzer || (DateAnalyzer = {}));
var Desk;
(function (Desk) {
    var _this = this;
    var __modal = document.getElementById("modal");
    var __title = document.getElementById("desk-title");
    var __content = document.getElementById("desk-content");
    var __remove = document.getElementById("remove-desk");
    var __close = document.getElementById("close-desk");
    var Operations = (function () {
        function Operations() {
        }
        Object.defineProperty(Operations, "assignTaskToDisplay", {
            set: function (task) {
                __title.dataset.taskIdentifier = task.id;
                __content.innerHTML = task.content;
                __title.textContent = task.name;
                show();
            },
            enumerable: false,
            configurable: true
        });
        Operations.removeDisplayedTask = function () {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, Archive.open()];
                        case 1:
                            (_b.sent()).delete(getId());
                            (_a = document.getElementById(getId())) === null || _a === void 0 ? void 0 : _a.remove();
                            hide();
                            return [2];
                    }
                });
            });
        };
        return Operations;
    }());
    Desk.Operations = Operations;
    var hide = function () { return __modal.classList.add("hide"); };
    var show = function () { return __modal.classList.remove("hide"); };
    var edit = function () { return (__content.contentEditable = "true"); };
    var getId = function () { return __title.dataset.taskIdentifier; };
    var modify = function () { return __awaiter(_this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    __content.focus();
                    id = getId();
                    modifyNodeContent(id);
                    return [4, modifyTaskContent(id)];
                case 1:
                    _a.sent();
                    __content.contentEditable = "false";
                    return [4, save(id)];
                case 2:
                    _a.sent();
                    hide();
                    return [2];
            }
        });
    }); };
    function save(id) {
        return __awaiter(this, void 0, void 0, function () {
            var store;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Archive.open()];
                    case 1:
                        store = _a.sent();
                        console.log(id, store);
                        return [2];
                }
            });
        });
    }
    var modifyTaskContent = function (id) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Archive.open()];
                case 1:
                    (_a.sent()).openCursor().addEventListener("success", function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var cursor, data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        cursor = this.result;
                                        if (!cursor) return [3, 3];
                                        data = cursor.value;
                                        if (!(data.id === id)) return [3, 2];
                                        data.content = __content.innerHTML;
                                        return [4, Archive.open()];
                                    case 1: return [2, (_a.sent()).put(data)];
                                    case 2:
                                        cursor.continue();
                                        _a.label = 3;
                                    case 3: return [2];
                                }
                            });
                        });
                    });
                    return [2];
            }
        });
    }); };
    var modifyNodeContent = function (id) {
        var element = document.getElementById(id);
        element.children[0].children[1].innerHTML = __content.innerHTML;
    };
    __close.addEventListener("click", modify, false);
    __content.addEventListener("dblclick", edit, false);
    __remove.addEventListener("click", Operations.removeDisplayedTask, false);
})(Desk || (Desk = {}));
var Model = (function () {
    function Model(data) {
        this.data = data;
        this.container = document.createElement("div");
        this.task = document.createElement("div");
        this.head = document.createElement("div");
        this.body = document.createElement("div");
        this.assignClasses();
        this.build(data);
    }
    Model.prototype.build = function (_a) {
        var name = _a.name, color = _a.color, content = _a.content;
        this.head.innerHTML = "<span style=\"color: " + color.text + "\">" + name + "</span>";
        this.body.innerHTML = content;
        this.container.appendChild(this.task);
        this.task.appendChild(this.head);
        this.task.appendChild(this.body);
    };
    Model.prototype.assignClasses = function () {
        this.task.classList.add("note");
        this.head.classList.add("head");
        this.body.classList.add("body");
    };
    return Model;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _Note = (function (_super) {
    __extends(_Note, _super);
    function _Note(task) {
        var _this = _super.call(this, task) || this;
        _this.assignStyles();
        _this.container.id = task.id;
        _this.container.addEventListener("click", function () { return _this.show(task); });
        return _this;
    }
    _Note.prototype.show = function (task) {
        Desk.Operations.assignTaskToDisplay = task;
    };
    _Note.prototype.assignStyles = function () {
        this.container.classList.add("block", "block--container");
        this.container.style.animationDelay = _Note.delay + "s";
    };
    Object.defineProperty(_Note.prototype, "node", {
        get: function () {
            return this.container;
        },
        enumerable: false,
        configurable: true
    });
    _Note.delay = 0;
    return _Note;
}(Model));
var translations = {
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
        formWidgetRequiredData: "Required Data",
        formWidgetOptionalData: "Optional Data",
        formWidgetColorData: "Colors",
        formWidgetDateData: "Date Data",
    },
    es: {
        appName: "Notas",
        formNamePlace: "Nombre de la tarea",
        formDescriptionPlace: "Escribe una descripción para la tarea",
        formBorderColorPlace: "Color del borde",
        formTextColorPlace: "Color del texto",
        formYearPlace: "Año",
        formMonthPlace: "Mes",
        formDayPlace: "Día",
        formCreateButton: "Crear",
        formCloseButton: "Cerrar",
        modalRemoveButton: "Remover",
        modalCloseButton: "Cerrar",
        formWidgetRequiredData: "Datos Requeridos",
        formWidgetOptionalData: "Datos Opcionales",
        formWidgetColorData: "Colores",
        formWidgetDateData: "Datos de Fechas",
    },
};
var appThemesTranslations = {
    en: {
        dark: "dark",
        light: "light",
    },
    es: {
        dark: "Oscuro",
        light: "Claro",
    },
};
var Translator = (function () {
    function Translator() {
    }
    Translator.translate = function () {
        var lang = this.lang === "es" ? "es" : "en";
        this.translateTo(lang);
    };
    Translator.translateTo = function (lang) {
        var e_2, _a;
        var traduction = translations[lang];
        try {
            for (var _b = __values(this.translatableNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var node = _c.value;
                var key = node.dataset.key;
                if (node.dataset.key === "appTheme") {
                    var theme = localStorage.getItem("theme");
                    var key_1 = appThemesTranslations[lang][theme];
                    node.textContent = key_1;
                }
                else {
                    this.isInputOrTextArea(node)
                        ? (node.placeholder = traduction[key])
                        : (node.textContent = traduction[key]);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.translateHTML(lang);
    };
    Object.defineProperty(Translator, "lang", {
        get: function () {
            var lang = navigator.language.split("-")[0];
            return lang;
        },
        enumerable: false,
        configurable: true
    });
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
    return Translator;
}());
var Widget;
(function (Widget) {
    function init() {
        var e_3, _a;
        var widgets = Array.from(document.getElementsByClassName("widget"));
        var _loop_1 = function (widget) {
            var head = widget.children[0];
            var body = widget.children[1];
            head.addEventListener("click", function () {
                var display = getComputedStyle(body).display;
                if (display === "block")
                    body.style.display = "none";
                else
                    body.style.display = "block";
            });
        };
        try {
            for (var widgets_1 = __values(widgets), widgets_1_1 = widgets_1.next(); !widgets_1_1.done; widgets_1_1 = widgets_1.next()) {
                var widget = widgets_1_1.value;
                _loop_1(widget);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (widgets_1_1 && !widgets_1_1.done && (_a = widgets_1.return)) _a.call(widgets_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }
    Widget.init = init;
})(Widget || (Widget = {}));
//# sourceMappingURL=bundle.js.map