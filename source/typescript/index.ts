///<reference path="visual/display-adapter.ts"/>

const main = () => {
    const fragment = Note.createArrayOfTasks(...Task.tasks);

    Interface.taskActivator.addEventListener("click", () => {
        Form.show();
    });

    TaskDesk.remove.addEventListener("click", () => {
        const key = TaskDesk.name.dataset.key as string;
        document.getElementById(key)?.remove();
        TaskDesk.close.click();
        Task.remove(key);
    });

    TaskDesk.close.addEventListener("click", () => {
        TaskDesk.modal.classList.add("hide");
        TaskDesk.name.textContent = "";
        TaskDesk.name.dataset.key = "";
        TaskDesk.description.textContent = "";
    });

    Task.onCreate = (task) => {
        Interface.taskContainer.appendChild(new Note(task).task);
    };

    Interface.taskContainer.appendChild(fragment);
};

addEventListener("load", () => {
    DisplayAdapter.adapt();
    Translator.translate();
    main();
});

addEventListener("resize", DisplayAdapter.adapt, false);
