namespace Formulary {
    export const form = document.getElementById("form") as HTMLFormElement;
    export const modal = document.getElementById("form-modal") as HTMLDivElement;

    export const name = document.getElementById("name") as HTMLInputElement;
    export const date = document.getElementById("date") as HTMLInputElement;
    export const listNames = document.getElementById("task-names") as HTMLDataListElement;
    export const description = document.getElementById("description") as HTMLTextAreaElement;

    const resetDate = () => {
        const _date = new Date();
        date.value = date.min = `${_date.getFullYear()}-${(_date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${(_date.getDate() + 1).toString().padStart(2, "0")}`;
    };

    resetDate();
}
