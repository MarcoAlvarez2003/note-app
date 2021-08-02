namespace DisplayAdapter {
    const viewport = document.querySelector("meta[name=viewport") as HTMLMetaElement;
    let height = innerHeight;

    export function adapt() {
        document.body.style.height = `${height}px`;
        meta();
    }

    function meta() {
        const content = `width=device-width, height=${height}px, initial-scale=1.0`;
        viewport.content = content;
    }

    window.addEventListener("resize", () => {
        height = innerHeight;
    });
}
