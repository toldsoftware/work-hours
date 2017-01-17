export interface Report {
    totalHours: number;
    days: ReportDay[];
}
export interface ReportDay {
    date: Date;
    dateText: string;
    totalHours: number;
    periods: ReportPeriod[];
}
export interface ReportPeriod {
    timeStartText: string;
    timeEndText: string;
    timeStart: Date;
    timeEnd: Date;
    totalHours: number;
    tasks: string[];
}
export declare function processWorkHours(text: string): Report;
