namespace Form {
    type SubmitFunction = (task: Task) => void;

    export let onsubmit: SubmitFunction = (task: Task) => {};
    const form = document.getElementById("form") as HTMLFormElement;
    const modal = document.getElementById("form-modal") as HTMLDivElement;
    const borderColorInput = document.getElementById("form-color") as HTMLInputElement;
    const textColorInput = document.getElementById("form-text-color") as HTMLInputElement;

    class Data {
        public static body = document.getElementById("form-content") as HTMLTextAreaElement;
        public static selectionStart: number = Data.body.selectionStart;

        private static get id(): string {
            return new Date().getTime().toString();
        }

        private static get title(): string {
            return (document.getElementById("form-name") as HTMLInputElement).value;
        }

        private static get content(): string {
            return this.body.value;
        }

        private static get year(): number {
            const year = (document.getElementById("form-year") as HTMLInputElement).value;
            return DateParser.parseYear(parseInt(year));
        }

        private static get month(): number {
            const month = (document.getElementById("form-month") as HTMLInputElement).value;
            return DateParser.parseMonth(parseInt(month));
        }

        private static get day(): number {
            const day = (document.getElementById("form-day") as HTMLInputElement).value;
            return DateParser.parseDay(parseInt(day));
        }

        private static get borderColor(): string {
            return borderColorInput.value;
        }

        private static get textColor(): string {
            return textColorInput.value;
        }

        public static get task(): Task {
            return {
                id: this.id,
                name: this.title,
                content: this.content,
                color: {
                    text: this.textColor,
                    border: this.borderColor,
                },
                date: {
                    year: this.year,
                    month: this.month,
                    day: this.day,
                },
            };
        }
    }

    const invalid = () => alert("this task is invali");

    const showFinalColor = (e: Event) => {
        const input = e.target as HTMLInputElement;
        input.style.color = input.value;
    };

    export const hide = () => modal.classList.add("hide");
    export const show = () => modal.classList.remove("hide");

    export const reset = () => form.reset();
    export const close = () => (hide(), reset());

    form.addEventListener("click", (e) => {
        e.preventDefault();
        const action = (e.target as HTMLElement).dataset.action;

        action === "create"
            ? FormValidator.isValid(Data.task)
                ? onsubmit(Data.task)
                : invalid()
            : action === "close"
            ? close()
            : false;
    });

    textColorInput.addEventListener("input", showFinalColor);
    borderColorInput.addEventListener("input", showFinalColor);
    Data.body.addEventListener("input", () => (Data.selectionStart = Data.body.selectionStart));
}
