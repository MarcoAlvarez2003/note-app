namespace Translator {
    interface ObjectTranslator {
        [name: string]: Translation;
    }

    interface Translation {
        app_title: string;
        form_name_placeholder: string;
        form_description_placeholder: string;
        form_year_placeholder: string;
        form_month_placeholder: string;
        form_day_placeholder: string;
        form_color_placeholder: string;
        form_create_button: string;
        form_close_button: string;
        modal_remove_button: string;
        modal_close_button: string;
    }

    document.getElementById("reset-lang")?.addEventListener("dblclick", async () => {
        localStorage.removeItem("@notes/lang");
        await translate();
    });

    const getDefaultLanguage = () => {
        let language = localStorage.getItem("@notes/lang");
        return language
            ? language
            : isValidLanguage(prompt("what is your language / cual es tu idioma", "en") as string);
    };

    const isValidLanguage = (lang: string): string => {
        while (!/(es|en)/.test(lang)) {
            lang = prompt("what is your language / cual es tu idioma", "en") as string;
        }
        localStorage.setItem("@notes/lang", lang);
        return lang;
    };

    const getFile = async (): Promise<ObjectTranslator> => {
        const text = localStorage.getItem("@notes/translation");
        return text ? JSON.parse(text) : await readFile("./source/assets/translations.json");
    };

    const readFile = async (path: string) => {
        const request = await fetch(path);
        const text = await request.text();
        saveFile(text);

        return JSON.parse(text);
    };

    const saveFile = async (data: string) => {
        localStorage.setItem("@notes/translation", data);
    };

    export const translate = async () => {
        const lang = getDefaultLanguage();
        const translations = await getFile();

        const translation = translations[lang];
        const nodes = Array.from(document.getElementsByClassName("traductor")) as HTMLElement[];
        for (const node of nodes) {
            const traduction = translation[node.dataset.keyname as keyof Translation];
            if ("placeholder" in node) (node as HTMLInputElement).placeholder = traduction;
            else node.textContent = traduction;
        }
    };
}
