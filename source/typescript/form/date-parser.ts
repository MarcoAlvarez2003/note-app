class DateParser {
    static parseYear(year: number): number {
        const currentYear = new Date().getFullYear();
        return this.checkDate(currentYear, year);
    }

    static parseMonth(month: number): number {
        const currentMonth = new Date().getMonth();
        return this.checkDate(currentMonth, month);
    }

    static parseDay(day: number): number {
        const currentDay = new Date().getDate();
        return this.checkDate(currentDay, day);
    }

    private static checkDate(current: number, recived: number): number {
        return !Number.isNaN(recived) && recived >= current ? recived : current;
    }
}
