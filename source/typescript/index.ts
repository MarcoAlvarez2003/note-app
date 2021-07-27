///<reference path="visual/display-adapter.ts"/>

const main = () => {
    const fragment = Note.createArrayOfTasks(...Task.tasks);

    Interface.taskActivator.addEventListener("click", () => {
        DisplayAdapter.adapt();
        Form.show();
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

!localStorage.getItem("restared")
    ? (localStorage.clear(), localStorage.setItem("restared", "true"))
    : console.log("this version has updated");
