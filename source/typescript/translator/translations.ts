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
    formWidgetDateData: string;
    formWidgetColorData: string;
    formWidgetRequiredData: string;
    formWidgetOptionalData: string;
}

type Languages = keyof TranslationObject;

type TraductionKey = keyof Traduction;

const translations: Readonly<TranslationObject> = {
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
        formWidgetRequiredData: "Required Data",
        formWidgetOptionalData: "Optional Data",
        formWidgetColorData: "Colors",
        formWidgetDateData: "Date Data",
    },
    es: {
        appName: "Notas",
        formNamePlace: "Nombre de la tarea",
        formDescriptionPlace: "Escribe una descripción para la tarea",
        formBorderColorPlace: "Color del borde",
        formTextColorPlace: "Color del texto",
        formYearPlace: "Año",
        formMonthPlace: "Mes",
        formDayPlace: "Día",
        formCreateButton: "Crear",
        formCloseButton: "Cerrar",
        modalRemoveButton: "Remover",
        modalCloseButton: "Cerrar",
        formWidgetRequiredData: "Datos Requeridos",
        formWidgetOptionalData: "Datos Opcionales",
        formWidgetColorData: "Colores",
        formWidgetDateData: "Datos de Fechas",
    },
};

const appThemesTranslations = {
    en: {
        dark: "dark",
        light: "light",
    },
    es: {
        dark: "Oscuro",
        light: "Claro",
    },
};
