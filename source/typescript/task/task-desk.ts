/**
 * Dedicated space for handling task samples
 */
namespace Desk {
    const __modal = document.getElementById("modal") as HTMLDivElement;
    const __title = document.getElementById("desk-title") as HTMLDivElement;
    const __content = document.getElementById("desk-content") as HTMLParagraphElement;
    const __remove = document.getElementById("remove-desk") as HTMLButtonElement;
    const __close = document.getElementById("close-desk") as HTMLButtonElement;

    /**
     * This class allows you to interact with the counter
     */
    export class Operations {
        /**
         * Assign a task to display
         */
        static set assignTaskToDisplay(task: Task) {
            __title.dataset.taskIdentifier = task.id;
            __content.innerHTML = task.content;
            __title.textContent = task.name;
            show();
        }
        /**
         * remove current task on the counter
         */
        static removeDisplayedTask(): void {
            Task.remove(getId());
            hide();
        }
    }

    const hide = () => __modal.classList.add("hide");
    const show = () => __modal.classList.remove("hide");
    const edit = () => (__content.contentEditable = "true");
    const task = (id: string) => Task.tasks[Task.findIndex(id)];
    const getId = () => __title.dataset.taskIdentifier as string;

    const modify = () => {
        __content.focus();
        const id = getId();
        modifyTaskContent(id);
        modifyNodeContent(id);
        __content.contentEditable = "false";
        Task.save();
        hide();
    };

    const modifyTaskContent = (id: string) => {
        task(id).content = __content.innerHTML;
    };

    const modifyNodeContent = (id: string) => {
        const element = document.getElementById(id) as HTMLDivElement;
        element.children[0].children[1].innerHTML = __content.innerHTML;
    };

    __close.addEventListener("click", modify, false);
    __content.addEventListener("dblclick", edit, false);
    __remove.addEventListener("click", Operations.removeDisplayedTask, false);
}
