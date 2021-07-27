namespace DateAnalyzer {
    /**
     * Argument required for the parser
     */
    type ParserArgument = [current: number, received: number, max: number];
    export class Parse {
        static year(year: number): number {
            const currentYear = new Date().getFullYear();
            return this.parse([currentYear, year, Infinity]);
        }

        static month(month: number): number {
            const currentMonth = new Date().getMonth();
            return this.parse([currentMonth, month, 11]);
        }

        static day(day: number): number {
            const currentDay = new Date().getDate();
            return this.parse([currentDay, day, 30]);
        }

        private static parse([current, received, max]: ParserArgument): number {
            return !Number.isNaN(received) && received >= current
                ? received <= max
                    ? received
                    : max
                : current;
        }
    }
}
