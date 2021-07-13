interface Task {
    name: string;
    color: string;
    description: string;
}

class Task {
    protected static __oncreate = (task: Task) => {};
    public static tasks: Task[] = JSON.parse(localStorage.getItem("TaskStore") || "[]");

    constructor({ name, color, description }: Task) {
        Task.tasks.push({ name, color, description });
        Task.__oncreate({ name, color, description });
        Formulary.close();
        Task.save();
    }

    public static build({ name, color, description }: Task) {
        const task = this.createNodeWithClass("div", "task");
        const head = this.createNodeWithClass("div", "task__head");
        const body = this.createNodeWithClass("div", "task__body");

        task.appendChild(head);
        task.appendChild(body);
        head.textContent = name;
        body.innerHTML = description;
        task.style.borderColor = color;
        head.style.borderBottomColor = color;
        task.style.boxShadow = `0 0 10px ${color}`;

        return task;
    }

    protected static createNodeWithClass(tagName: string, className: string) {
        const node = document.createElement(tagName);
        node.classList.add(className);
        return node;
    }

    public static remove(name: string) {
        this.tasks.splice(this.findIndex(name), 1);
        this.save();
    }

    protected static findIndex(key: string): number {
        return this.tasks.findIndex(({ name }) => name === key);
    }

    protected static save(): void {
        localStorage.setItem("TaskStore", JSON.stringify(this.tasks));
    }

    public static set onCreate(fn: (task: Task) => void) {
        this.__oncreate = fn;
    }
}

Formulary.form.addEventListener("click", (e) => {
    e.preventDefault();
    const action = (e.target as HTMLElement).dataset.action as string;

    if (action === "create" && Formulary.isValidForm())
        new Task({
            name: Formulary.name.value,
            color: Formulary.color.value,
            description: Formulary.description.value,
        });
    else if (action === "ceate" && !Formulary.isValidForm()) alert("Invalid Task");
    else if (action === "close") Formulary.close();
});
