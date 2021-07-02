///<reference path="form.ts"/>

namespace Task {
    export interface TaskObject {
        name: string;
        date: DateArray;
        description: string;
    }

    type DateArray = [year: string, month: string, day: string];

    type Actions = "create" | "close";

    export const tasks: TaskObject[] = JSON.parse(localStorage.getItem("TaskStore") || "[]");

    export let onCreateTask = ({ name, description, date }: TaskObject) => {};

    const create = ({ name, description, date }: TaskObject) => {
        tasks.push({ name, description, date });
        onCreateTask({ name, description, date });
        close();
        save();
    };

    const close = () => {
        Formulary.modal.classList.add("hide");
        Formulary.form.reset();
    };

    export const builder = ({ name, description, date }: TaskObject) => {
        const task = document.createElement("div");
        const taskHead = document.createElement("div");
        const taskBody = document.createElement("div");

        task.classList.add("task");
        taskHead.classList.add("task__head");
        taskBody.classList.add("task__body");

        taskHead.innerHTML = `
        ${name} -
            <small>
                <i>
                    ${date.join(" / ")}
                </i>
            </small>
        `;
        taskBody.textContent = description;

        task.appendChild(taskHead);
        task.appendChild(taskBody);
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

    Formulary.form.addEventListener("click", (e) => {
        e.preventDefault();
        const action = (e.target as HTMLElement).dataset.action as Actions;
        action
            ? action === "create"
                ? create({
                      name: Formulary.name.value,
                      description: Formulary.description.value,
                      date: Formulary.date.value.split("-") as DateArray,
                  })
                : close()
            : false;
    });
}
