namespace Formulary {
    // ? Nodes
    export const form = document.getElementById("form") as HTMLFormElement;
    export const modal = document.getElementById("form-modal") as HTMLDivElement;
    export const listNames = document.getElementById("task-names") as HTMLDataListElement;

    // ? Basic Data
    export const name = document.getElementById("name") as HTMLInputElement;
    export const description = document.getElementById("description") as HTMLTextAreaElement;

    // ? Special Data
    export const color = document.getElementById("color") as HTMLInputElement;

    export const reset = () => {
        form.reset();
    };

    const showEndColor = () => {
        color.style.color = color.value;
    };

    export const isValidForm = () => !!name.value && !!description.value;

    color.addEventListener("input", showEndColor, false);

    reset();
}
