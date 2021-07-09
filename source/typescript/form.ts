namespace Formulary {
    // ? Nodes
    export const form = document.getElementById("form") as HTMLFormElement;
    export const modal = document.getElementById("form-modal") as HTMLDivElement;
    export const listNames = document.getElementById("task-names") as HTMLDataListElement;

    // ? Basic Data
    export const name = document.getElementById("name") as HTMLInputElement;
    export const description = document.getElementById("description") as HTMLTextAreaElement;

    // ? Date Data
    export const day = document.getElementById("day") as HTMLInputElement;
    export const year = document.getElementById("year") as HTMLInputElement;
    export const month = document.getElementById("month") as HTMLInputElement;

    // ? Special Data
    export const color = document.getElementById("color") as HTMLInputElement;

    export const reset = () => {
        form.reset();
        resetDateData();
    };

    const showEndColor = () => {
        color.style.color = color.value;
    };

    const resetDateData = () => {
        const date = new Date();
        day.value = date.getDate().toString();
        year.value = date.getFullYear().toString();
        month.value = (date.getMonth() + 1).toString();
    };

    export const isValidForm = () => !!name.value && !!description.value;

    export const getDateData = () => `${year.value} / ${month.value} / ${day.value}`;

    color.addEventListener("input", showEndColor, false);

    reset();
}
