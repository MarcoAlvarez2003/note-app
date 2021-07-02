/// <reference path="tasks.ts"/>
/// <reference path="modal.ts"/>

const app = document.getElementById("app") as HTMLDivElement;
const toggle = document.getElementById("toggle") as HTMLDivElement;
const container = document.getElementById("container") as HTMLDivElement;

const fragment = document.createDocumentFragment();
const optionFragment = document.createDocumentFragment();

toggle.addEventListener("click", () => {
    Formulary.modal.classList.remove("hide");
});

const createTask = ({ name, description, date }: Task.TaskObject) => {
    const block = document.createElement("div");
    const task = Task.builder({ name, description, date });

    block.classList.add("block");
    block.appendChild(task);

    block.id = name;

    block.addEventListener("click", () => {
        Modal.modal.classList.remove("hide");

        Modal.name.textContent = name;
        Modal.name.dataset.key = name;
        Modal.description.textContent = description;
    });
    return block;
};

const createOption = ({ name, description }: Task.TaskObject) => {
    const option = document.createElement("option");
    option.textContent = description;
    option.id = `__${name}`;
    option.value = name;
    return option;
};

Task.tasks.forEach((task) => {
    fragment.appendChild(createTask(task));
    optionFragment.appendChild(createOption(task));
});

Modal.remove.addEventListener("click", () => {
    const key = Modal.name.dataset.key as string;

    Task.remove(key);
    document.getElementById(key)?.remove();
    document.getElementById(`__${key}`)?.remove();
    Modal.close.click();
});

Modal.close.addEventListener("click", () => {
    Modal.modal.classList.add("hide");
    Modal.name.textContent = "";
    Modal.name.dataset.key = "";
    Modal.description.textContent = "";
});

Task.onCreateTask = ({ name, description, date }) => {
    container.appendChild(createTask({ name, description, date }));
    Formulary.listNames.appendChild(createOption({ name, description, date }));
};

container.appendChild(fragment);
Formulary.listNames.appendChild(optionFragment);
