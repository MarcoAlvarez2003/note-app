/**
 * Manage tasks and their events
 */
class Note {
    /**
     * contains information about the task
     */
    protected information: Task;
    /**
     * contains homework
     */
    protected container = document.createElement("div");
    /**
     * defines the delay of the animation
     */
    protected static delay: number = 0;

    constructor(task: Task) {
        this.information = task;
        this.container.addEventListener("click", () => this.show(task));
    }
    /**
     * packages the task to be inserted
     */
    protected build() {
        this.container.appendChild(Task.build(this.information));
        this.container.id = this.information.id;
        this.setContainerStyles();
    }
    /**
     *
     * display the task on the task counter
     * @param self Parameter with the task information
     */
    protected show(self: Task) {
        Desk.Operations.assignTaskToDisplay = self;
    }
    /**
     * assign the styles for the task
     */
    protected setContainerStyles() {
        this.container.classList.add("block", "block--container");
        this.container.style.animationDelay = Note.delay + "s";
    }
    /**
     * returns the task ready to insert
     */
    public get task(): HTMLElement {
        this.build();
        return this.container;
    }
    /**
     * insert all tasks into a snippet to insert
     * @param tasks matrix with tasks
     * @returns returns a fragment with all inscrutable
     */
    public static createArrayOfTasks(...tasks: Task[]): DocumentFragment {
        const fragment = document.createDocumentFragment();

        for (const task of tasks) {
            fragment.appendChild(new Note(task).task);
            this.delay += 0.25;
        }

        this.delay = 0;

        return fragment;
    }
}
