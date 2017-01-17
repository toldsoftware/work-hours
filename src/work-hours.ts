
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

export function processWorkHours(text: string): Report {
    let report = { days: [] } as Report;

    let lines = text.split('\n').map(x => x.trim()).filter(x => x.length > 0);

    let day: ReportDay = null;
    let period: ReportPeriod = null;

    for (let l of lines) {

        if (l.match(/^# 20\d{2}/)) {
            // Date
            let dateText = l.replace('# ', '').trim();

            day = {
                dateText,
                date: new Date(Date.parse(dateText)),
                periods: [] as ReportPeriod[],
                totalHours: 0
            };
            report.days.push(day);

        } else if (l.match(/^## \d{1,2}:/)) {

            if (day == null) {
                console.warn('Time period has no day:', l);
                continue;
            }

            let parts = l.split('-');
            let timeStartText = parts[0].replace('## ', '').trim();
            let timeEndText = parts[1].trim();

            let timeStart = new Date(Date.parse(day.dateText + ' ' + timeStartText));
            let timeEnd = timeEndText.length > 0 ? new Date(Date.parse(day.dateText + ' ' + timeEndText)) : null as Date;

            let total5Minutes = timeEnd != null ? (timeEnd.getTime() - timeStart.getTime()) / (5 * 60 * 1000) : 0;
            let totalHours = Math.round(total5Minutes) / 12;

            period = {
                timeStartText,
                timeStart,
                timeEndText,
                timeEnd,
                totalHours,
                tasks: []
            };
            day.periods.push(period);

        } else if (l.match('^#')) {
            // Ignore section
            day = null;
            period = null;
        } else {
            if (day == null) {
                console.warn('Task has no period:', l);
                continue;
            }

            period.tasks.push(l);
        }

    }

    report.days.forEach(d => d.totalHours = d.periods.reduce((out, p) => out += p.totalHours, 0));
    report.totalHours = report.days.reduce((out, d) => out += d.totalHours, 0);

    return report;
}