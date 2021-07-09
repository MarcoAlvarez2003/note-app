const main = () => {
    const fragment = document.createDocumentFragment();
    const optionFragment = document.createDocumentFragment();

    Interface.taskActivator.addEventListener("click", () => {
        Formulary.modal.classList.remove("hide");
    });

    const createTask = (taskObject: Task.TaskObject) => {
        const block = document.createElement("div");
        const task = Task.builder(taskObject);

        block.classList.add("block");
        block.appendChild(task);

        block.id = taskObject.name;

        block.addEventListener("click", () => {
            TaskDesk.modal.classList.remove("hide");
            TaskDesk.name.textContent = taskObject.name;
            TaskDesk.name.dataset.key = taskObject.name;
            TaskDesk.description.textContent = taskObject.description;
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

    TaskDesk.remove.addEventListener("click", () => {
        const key = TaskDesk.name.dataset.key as string;

        Task.remove(key);
        document.getElementById(key)?.remove();
        document.getElementById(`__${key}`)?.remove();
        TaskDesk.close.click();
    });

    TaskDesk.close.addEventListener("click", () => {
        TaskDesk.modal.classList.add("hide");
        TaskDesk.name.textContent = "";
        TaskDesk.name.dataset.key = "";
        TaskDesk.description.textContent = "";
    });

    Task.onCreateTask = (task) => {
        Interface.taskContainer.appendChild(createTask(task));
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
