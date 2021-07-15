///<reference path="visual/display-adapter.ts"/>

const main = () => {
    const fragment = Note.createArrayOfTasks(...Task.tasks);
    const optionFragment = document.createDocumentFragment();

    Interface.taskActivator.addEventListener("click", () => {
        Formulary.modal.classList.remove("hide");
    });

    const createOption = ({ id, name, description }: Task) => {
        const option = document.createElement("option");
        option.textContent = description;
        option.id = `$${id}`;
        option.value = name;
        return option;
    };

    TaskDesk.remove.addEventListener("click", () => {
        const key = TaskDesk.name.dataset.key as string;

        Task.remove(key);
        document.getElementById(`$${key}`)?.remove();
        document.getElementById(key)?.remove();
        TaskDesk.close.click();
    });

    TaskDesk.close.addEventListener("click", () => {
        TaskDesk.modal.classList.add("hide");
        TaskDesk.name.textContent = "";
        TaskDesk.name.dataset.key = "";
        TaskDesk.description.textContent = "";
    });

    Task.onCreate = (task) => {
        Interface.taskContainer.appendChild(new Note(task).task);
        Formulary.listNames.appendChild(createOption(task));
    };

    Interface.taskContainer.appendChild(fragment);
    Formulary.listNames.appendChild(optionFragment);
};

addEventListener("load", () => {
    DisplayAdapter.adapt();
    Translator.translate();
    main();
});

addEventListener("resize", DisplayAdapter.adapt, false);
