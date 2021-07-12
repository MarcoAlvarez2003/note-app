namespace Task {
    export interface TaskObject {
        name: string;
        color: string;
        description: string;
    }

    type Actions = "create" | "close";

    export const tasks: TaskObject[] = JSON.parse(localStorage.getItem("TaskStore") || "[]");

    export let onCreateTask = (task: TaskObject) => {};

    const create = (task: TaskObject) => {
        tasks.push(task);
        onCreateTask(task);
        close();
        save();
    };

    const close = () => {
        Formulary.modal.classList.add("hide");
        Formulary.form.reset();
    };

    export const builder = ({ name, description, color }: TaskObject) => {
        const task = document.createElement("div");
        const taskHead = document.createElement("div");
        const taskBody = document.createElement("div");

        task.classList.add("task");
        taskHead.classList.add("task__head");
        taskBody.classList.add("task__body");

        taskHead.textContent = name;
        taskBody.innerHTML = description;

        task.appendChild(taskHead);
        task.appendChild(taskBody);
        task.style.borderColor = color;
        taskHead.style.borderBottomColor = color;
        task.style.boxShadow = `0 0 10px ${color}`;

        return task;
    };

    export const remove = (key: string): void => {
        tasks.splice(
            tasks.findIndex((task) => task.name === key),
            1
        );
        save();
    };

    export const save = () => localStorage.setItem("TaskStore", JSON.stringify(tasks));

    export const createTask = () => {
        create({
            name: Formulary.name.value,
            color: Formulary.color.value,
            description: Formulary.description.value,
        });
    };

    Formulary.form.addEventListener("click", (e) => {
        e.preventDefault();
        const action = (e.target as HTMLElement).dataset.action as Actions;
        if (action) {
            if (action === "create") {
                if (Formulary.isValidForm()) createTask();
                else alert("Invalid Task");
            } else close();
        }
    });
}
