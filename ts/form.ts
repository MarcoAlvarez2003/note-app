namespace Formulary {
    export const form = document.getElementById("form") as HTMLFormElement;
    export const modal = document.getElementById("form-modal") as HTMLDivElement;

    export const name = document.getElementById("name") as HTMLInputElement;
    export const listNames = document.getElementById("task-names") as HTMLDataListElement;
    export const description = document.getElementById("description") as HTMLTextAreaElement;

    export const day = document.getElementById("day") as HTMLInputElement;
    export const year = document.getElementById("year") as HTMLInputElement;
    export const month = document.getElementById("month") as HTMLInputElement;

    const resetDateInfo = () => {
        const date = new Date();
        year.value = date.getFullYear().toString();
        day.value = date.getDate().toString().padStart(2, "0");
        month.value = (date.getMonth() + 1).toString().padStart(2, "0");
    };

    export const parseDate = (date: string) => date.padStart(2, "0");

    export const isValidForm = () => !!name.value && !!description.value;

    resetDateInfo();
}
