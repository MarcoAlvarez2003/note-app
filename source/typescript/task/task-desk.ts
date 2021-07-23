namespace TaskDesk {
    export const modal = document.getElementById("modal") as HTMLDivElement;
    export const name = document.getElementById("task-desk-title") as HTMLDivElement;
    export const description = document.getElementById("task-desk-content") as HTMLParagraphElement;

    export const remove = document.getElementById("remove") as HTMLButtonElement;
    export const close = document.getElementById("close-modal") as HTMLButtonElement;

    description.addEventListener("dblclick", () => {
        description.contentEditable = "true";
    });

    close.addEventListener("click", () => {
        description.focus();
        const id = name.textContent?.trim();
        const index = Task.findIndex(id as string);
        Task.tasks[index].content = description.innerHTML;
        modifyContent(name.dataset.key as string, description.innerHTML);
        description.contentEditable = "false";
        Task.save();
    });

    const modifyContent = (id: string, content: string): void => {
        const node = document.getElementById(id) as HTMLDivElement;
        node.children[0].children[1].innerHTML = content;
    };
}
