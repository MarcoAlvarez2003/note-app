namespace Desk {
    const __modal = document.getElementById("modal") as HTMLDivElement;
    const __title = document.getElementById("desk-title") as HTMLDivElement;
    const __content = document.getElementById("desk-content") as HTMLParagraphElement;
    const __remove = document.getElementById("remove-desk") as HTMLButtonElement;
    const __close = document.getElementById("close-desk") as HTMLButtonElement;

    export class Operations {
        static set assignTaskToDisplay(task: Task) {
            __title.dataset.taskIdentifier = task.id;
            __content.innerHTML = task.content;
            __title.textContent = task.name;
            show();
        }
        static async removeDisplayedTask() {
            (await Archive.open()).delete(getId());
            document.getElementById(getId())?.remove();
            hide();
        }
    }

    const hide = () => __modal.classList.add("hide");
    const show = () => __modal.classList.remove("hide");
    const edit = () => (__content.contentEditable = "true");
    const getId = () => __title.dataset.taskIdentifier as string;

    const modify = async () => {
        __content.focus();
        const id = getId();
        modifyNodeContent(id);
        await modifyTaskContent(id);
        __content.contentEditable = "false";
        await save(id);
        hide();
    };

    async function save(id: string) {
        const store = await Archive.open();
        console.log(id, store);
    }

    const modifyTaskContent = async (id: string) => {
        (await Archive.open()).openCursor().addEventListener("success", async function () {
            const cursor = this.result;
            if (cursor) {
                const data = cursor.value as Task;
                if (data.id === id) {
                    data.content = __content.innerHTML;
                    return (await Archive.open()).put(data);
                }
                cursor.continue();
            }
        });
    };

    const modifyNodeContent = (id: string) => {
        const element = document.getElementById(id) as HTMLDivElement;
        element.children[0].children[1].innerHTML = __content.innerHTML;
    };

    __close.addEventListener("click", modify, false);
    __content.addEventListener("dblclick", edit, false);
    __remove.addEventListener("click", Operations.removeDisplayedTask, false);
}
