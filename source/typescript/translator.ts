interface TranslationObject {
    en: Traduction;
    es: Traduction;
}

interface Traduction {
    appName: string;
    formNamePlace: string;
    formDescriptionPlace: string;
    formColorPlace: string;
    formCreateButton: string;
    formCloseButton: string;
    modalRemoveButton: string;
    modalCloseButton: string;
}

type Languages = keyof TranslationObject;

type TraductionKey = keyof Traduction;

class Translator {
    private static __translations: TranslationObject = {
        en: {
            appName: "Notes",
            formNamePlace: "Write a name for the task",
            formDescriptionPlace: "Write a description for the task",
            formColorPlace: "Color",
            formCreateButton: "Create",
            formCloseButton: "Close",
            modalRemoveButton: "Remove",
            modalCloseButton: "Close",
        },
        es: {
            appName: "Notas",
            formNamePlace: "Escribe un nombre para la tarea",
            formDescriptionPlace: "Escribe una descripcion para la tarea",
            formColorPlace: "Color",
            formCreateButton: "Crear",
            formCloseButton: "Cerrar",
            modalRemoveButton: "Remover",
            modalCloseButton: "Cerrar",
        },
    };

    public static translate(): void {
        const lang = this.lang === "es" ? "es" : "en";
        this.translateTo(lang);
    }

    public static translateTo(lang: Languages): void {
        const traduction = this.__translations[lang];
        for (const node of this.translatableNodes) {
            const key = node.dataset.key as TraductionKey;
            this.isInputOrTextArea(node)
                ? (node.placeholder = traduction[key])
                : (node.textContent = traduction[key]);
        }
        this.translateHTML(lang);
    }

    public static get lang(): Languages {
        const lang = localStorage.getItem("@notes/lang") as Languages;
        return lang ? lang : this.requestLanguage();
    }

    protected static requestLanguage(): Languages {
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
