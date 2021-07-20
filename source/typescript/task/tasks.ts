///<reference path="../form/form.ts"/>

interface Task {
    id: string;
    name: string;
    content: string;
    color: ColorInfo;
    date: DateInfo;
}

interface ColorInfo {
    border: string;
    text: string;
}

interface DateInfo {
    year: number;
    month: number;
    day: number;
}

class Task {
    protected static __oncreate = (task: Task) => {};
    public static tasks: Task[] = JSON.parse(localStorage.getItem("TaskStore") || "[]");

    constructor(task: Task) {
        Task.tasks.push(task);
        Task.__oncreate(task);
        Form.close();
        Task.save();
    }

    public static build({ name, color, date, content: description }: Task) {
        const { border, text } = color;
        const { day, month, year } = date;
        const task = this.createNodeWithClass("div", "task");
        const head = this.createNodeWithClass("div", "task__head");
        const body = this.createNodeWithClass("div", "task__body");

        task.appendChild(head);
        task.appendChild(body);
        body.innerHTML = description;
        head.innerHTML = `${name} - <i style="color:${text}">[ ${year} / ${month} / ${day} ]</i>`;

        body.style.color = text;
        task.style.borderColor = border;
        head.style.borderBottomColor = border;
        task.style.boxShadow = `0 0 10px ${border}`;

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

Form.onsubmit = (task) => {
    task.content = task.content.replace(/(\n)/g, "br>");
    new Task(task);
};
