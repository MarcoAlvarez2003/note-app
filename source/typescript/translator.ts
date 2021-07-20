interface TranslationObject {
    en: Traduction;
    es: Traduction;
}

interface Traduction {
    appName: string;
    formNamePlace: string;
    formDescriptionPlace: string;
    formBorderColorPlace: string;
    formTextColorPlace: string;
    formYearPlace: string;
    formMonthPlace: string;
    formDayPlace: string;
    formCreateButton: string;
    formCloseButton: string;
    modalRemoveButton: string;
    modalCloseButton: string;
}

type Languages = keyof TranslationObject;

type TraductionKey = keyof Traduction;

/**
 * Allows the translation of the page
 */
class Translator {
    /**
     * Warehouse with all available translations
     */
    private static __translations: TranslationObject = {
        en: {
            appName: "Notes",
            formNamePlace: "Name of task",
            formDescriptionPlace: "Write a description for the task",
            formBorderColorPlace: "Border color",
            formTextColorPlace: "Text color",
            formYearPlace: "Year",
            formMonthPlace: "Month",
            formDayPlace: "Day",
            formCreateButton: "Create",
            formCloseButton: "Close",
            modalRemoveButton: "Remove",
            modalCloseButton: "Close",
        },
        es: {
            appName: "Notas",
            formNamePlace: "Nombre de la tarea",
            formDescriptionPlace: "Escribe una descripcion para la tarea",
            formBorderColorPlace: "Color del borde",
            formTextColorPlace: "Color del texto",
            formYearPlace: "Año",
            formMonthPlace: "Mes",
            formDayPlace: "Día",
            formCreateButton: "Crear",
            formCloseButton: "Cerrar",
            modalRemoveButton: "Remover",
            modalCloseButton: "Cerrar",
        },
    };
    /**
     * translate the page automatically
     */
    public static translate(): void {
        const lang = this.lang === "es" ? "es" : "en";
        this.translateTo(lang);
    }
    /**
     * Translate the page into a language that is available
     * @param lang Language to translate
     */
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
    /**
     * get browser language
     */
    public static get lang(): Languages {
        const lang = localStorage.getItem("@notes/lang") as Languages;
        return lang ? lang : this.requestLanguage();
    }
    /**
     * makes a language request to the browser
     * @returns returns the browser language
     */
    protected static requestLanguage(): Languages {
        const lang = navigator.language.split("-")[0] as Languages;
        return lang;
    }
    /**
     * find all translatable nodes
     */
    protected static get translatableNodes(): HTMLElement[] {
        const nodes = document.getElementsByClassName("translatable");
        return Array.from(nodes) as HTMLElement[];
    }
    /**
     * check if the element is an **_HTMLInputElement_** or an **_HTMLTextAreaElement_**
     * @param node node to verify
     * @returns returns if the node is an **_HTMLInputElement_** or an **_HTMLTextAreaElemen_*t*
     */
    protected static isInputOrTextArea(node: any): node is HTMLInputElement {
        return node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement;
    }
    /**
     * notifies the browser of the page language
     * @param lang Language to translate
     */
    protected static translateHTML(lang: Languages) {
        const html = document.lastChild as HTMLElement;
        if (html) html.lang = lang;
    }
}
