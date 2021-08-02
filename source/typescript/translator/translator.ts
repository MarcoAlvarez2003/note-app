/// <reference path="translations.ts" />

class Translator {
    public static translate(): void {
        const lang = this.lang === "es" ? "es" : "en";
        this.translateTo(lang);
    }

    public static translateTo(lang: Languages): void {
        const traduction = translations[lang];
        for (const node of this.translatableNodes) {
            const key = node.dataset.key as TraductionKey;
            if (node.dataset.key === "appTheme") {
                const theme = localStorage.getItem("theme") as string;
                const key = appThemesTranslations[lang][theme as "dark"];
                node.textContent = key;
            } else {
                this.isInputOrTextArea(node)
                    ? (node.placeholder = traduction[key])
                    : (node.textContent = traduction[key]);
            }
        }
        this.translateHTML(lang);
    }

    public static get lang(): Languages {
        const lang = navigator.language.split("-")[0] as Languages;
        return lang;
    }

    protected static get translatableNodes(): HTMLElement[] {
        const nodes = document.getElementsByClassName("translatable");
        return Array.from(nodes) as HTMLElement[];
    }

    protected static isInputOrTextArea(node: any): node is HTMLInputElement {
        return node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement;
    }

    protected static translateHTML(lang: Languages) {
        const html = document.lastChild as HTMLElement;
        if (html) html.lang = lang;
    }
}
