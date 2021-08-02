interface Task {
    id: string;
    name: string;
    content: string;
    date: {
        year: number;
        month: number;
        day: number;
    };
    color: {
        border: string;
        text: string;
    };
}

class Model {
    protected container = document.createElement("div");
    private task = document.createElement("div");
    private head = document.createElement("div");
    private body = document.createElement("div");

    constructor(private data: Task) {
        this.assignClasses();
        this.build(data);
    }

    private build({ name, color, content }: Task) {
        this.head.innerHTML = `<span style="color: ${color.text}">${name}</span>`;
        this.body.innerHTML = content;

        this.container.appendChild(this.task);
        this.task.appendChild(this.head);
        this.task.appendChild(this.body);
    }

    private assignClasses() {
        this.task.classList.add("note");
        this.head.classList.add("head");
        this.body.classList.add("body");
    }
}
