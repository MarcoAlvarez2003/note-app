/// <reference path="model.ts" />

class _Note extends Model {
    public static delay: number = 0;

    constructor(task: Task) {
        super(task);
        this.assignStyles();
        this.container.id = task.id;
        this.container.addEventListener("click", () => this.show(task));
    }

    protected show(task: Task) {
        Desk.Operations.assignTaskToDisplay = task;
    }

    protected assignStyles() {
        this.container.classList.add("block", "block--container");
        this.container.style.animationDelay = `${_Note.delay}s`;
    }

    public get node() {
        return this.container;
    }
}
