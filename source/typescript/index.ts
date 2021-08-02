///<reference path="visual/display-adapter.ts"/>
/// <reference path="visual/interface.ts" />
/// <reference path="form/formulary.ts" />
/// <reference path="archive.ts" />

async function Main() {
    loadTheme();
    Widget.init();
    convertOldData();
    Translator.translate();
    Archive.open().then(loadNotes).catch(console.log);
}

function loadTheme() {
    if (!localStorage.getItem("theme")) localStorage.setItem("theme", "dark");

    if (Interface.themeButton.firstElementChild) {
        const theme = localStorage.getItem("theme") as string;
        const _theme = appThemesTranslations[Translator.lang][theme as "dark"];
        Interface.application.classList.replace("app--dark", "app--" + theme);
        Interface.application.classList.remove("hide");
        Interface.themeButton.firstElementChild.textContent = _theme;
    }
}

async function convertOldData() {
    const data = localStorage.getItem("TaskStore");
    if (data) {
        const tasks = JSON.parse(data);
        for (const task of tasks) (await Archive.open()).add(task);
        localStorage.clear();
    }
}

function loadNotes(store: IDBObjectStore) {
    const fragment = document.createDocumentFragment();

    store.openCursor().addEventListener("success", function (this: IDBRequest<IDBCursorWithValue>) {
        const cursor = this.result;
        if (cursor) {
            Interface.taskActivator.classList.remove("hide");
            const data = cursor.value;
            const note = new _Note(data).node;
            note.onclick = async () => await showNote(data);
            fragment.appendChild(note);
            _Note.delay += 0.25;
            cursor.continue();
        } else {
            Interface.taskContainer.appendChild(fragment);
            _Note.delay = 0;
        }
    });
}

async function showNote(data: Task) {
    ((await Archive.open()).get(data.id) as IDBRequest<Task>).addEventListener(
        "success",
        function () {
            Desk.Operations.assignTaskToDisplay = this.result;
        }
    );
}

function createNote(data: Task) {
    const note = new _Note(data).node;
    note.onclick = () => showNote(data);
    Interface.taskContainer.appendChild(note);
}

async function saveNote(data: Task) {
    const store = await Archive.open();
    store.add(data).onsuccess = () => {};
}

Interface.taskActivator.addEventListener("click", () => {
    DisplayAdapter.adapt();
    Form.show();
});

Interface.taskContainer.addEventListener("dblclick", () => {
    const contain = !!!Interface.taskContainer.children[1];
    if (contain) Interface.taskActivator.click();
});

Interface.themeButton.addEventListener("click", () => {
    let theme: string;
    const tag = Interface.themeButton.firstElementChild as HTMLElement;

    if (Interface.application.classList.contains("app--dark")) {
        Interface.application.classList.replace("app--dark", "app--light");
        theme = "light";
    } else {
        Interface.application.classList.replace("app--light", "app--dark");
        theme = "dark";
    }

    tag.textContent = appThemesTranslations[Translator.lang][theme as "dark"];
    localStorage.setItem("theme", theme);
});

Form.onsubmit = async (data: Task) => {
    Interface.taskActivator.classList.remove("hide");
    await saveNote(data);
    createNote(data);
    Form.close();
};

addEventListener("load", Main, false);
addEventListener("resize", DisplayAdapter.adapt, false);
