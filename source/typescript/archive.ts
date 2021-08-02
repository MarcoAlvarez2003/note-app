class Archive {
    public static version: number = 1;

    public static async open(): Promise<IDBObjectStore> {
        return new Promise((resolve, reject) => {
            const aux = indexedDB?.open("@notes", this.version);

            aux.addEventListener("upgradeneeded", this.upgrade, false);

            aux.addEventListener("success", () => {
                const store = aux.result.transaction("storage", "readwrite").objectStore("storage");
                resolve(store);
            });

            aux.addEventListener("error", reject, false);
        });
    }

    private static upgrade(this: IDBOpenDBRequest) {
        this.result.createObjectStore("storage", { keyPath: "id" });
    }
}
