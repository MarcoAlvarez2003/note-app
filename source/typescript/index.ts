///<reference path="visual/display-adapter.ts"/>

const main = () => {
    let delay = 0;
    const fragment = document.createDocumentFragment();
    const optionFragment = document.createDocumentFragment();

    Interface.taskActivator.addEventListener("click", () => {
        Formulary.modal.classList.remove("hide");
    });

    const createTask = (__task: Task) => {
        const block = document.createElement("div");
        const { id, name, description } = __task;
        const task = Task.build(__task);

        block.classList.add("block");
        block.appendChild(task);

        block.id = id;
        block.style.position = "relative";
        block.style.right = "100%";
        block.style.animation = "Task 1s 1 forwards";
        block.style.animationDelay = `${delay}s`;

        block.addEventListener("click", () => {
            TaskDesk.modal.classList.remove("hide");
            TaskDesk.name.textContent = name;
            TaskDesk.name.dataset.key = id;
            TaskDesk.description.innerHTML = description;
        });

        delay += 0.25;

        return block;
    };

    const createOption = ({ id, name, description }: Task) => {
        const option = document.createElement("option");
        option.textContent = description;
        option.id = `$${id}`;
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
