class FormValidator {
    public static isValid({ name, content: description }: Task): boolean {
        return !!name && !!description;
    }
}
