namespace Widget {
    export function init() {
        const widgets = Array.from(document.getElementsByClassName("widget")) as HTMLElement[];
        for (const widget of widgets) {
            const head = widget.children[0] as HTMLElement;
            const body = widget.children[1] as HTMLElement;

            head.addEventListener("click", () => {
                const display = getComputedStyle(body).display;
                if (display === "block") body.style.display = "none";
                else body.style.display = "block";
            });
        }
    }
}
