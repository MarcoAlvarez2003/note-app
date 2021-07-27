class DisplayAdapter {
    private static viewport = document.querySelector("meta[name=viewport") as HTMLMetaElement;
    private static height = innerHeight;

    public static adapt() {
        document.body.style.height = `${this.height}px`;
        this.adaptMeta();
    }

    protected static adaptMeta() {
        const content = `width=device-width, height=${this.height}px, initial-scale=1.0`;
        this.viewport.content = content;
    }
}
