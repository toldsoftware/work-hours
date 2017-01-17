"use strict";
function processWorkHours(text) {
    var report = { days: [] };
    var lines = text.split('\n').map(function (x) { return x.trim(); }).filter(function (x) { return x.length > 0; });
    var day = null;
    var period = null;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var l = lines_1[_i];
        if (l.match(/^# 20\d{2}/)) {
            // Date
            var dateText = l.replace('# ', '').trim();
            day = {
                dateText: dateText,
                date: new Date(Date.parse(dateText)),
                periods: [],
                totalHours: 0
            };
            report.days.push(day);
        }
        else if (l.match(/^## \d{1,2}:/)) {
            if (day == null) {
                console.warn('Time period has no day:', l);
                continue;
            }
            var parts = l.split('-');
            var timeStartText = parts[0].replace('## ', '').trim();
            var timeEndText = parts[1].trim();
            var timeStart = new Date(Date.parse(day.dateText + ' ' + timeStartText));
            var timeEnd = timeEndText.length > 0 ? new Date(Date.parse(day.dateText + ' ' + timeEndText)) : null;
            var total5Minutes = timeEnd != null ? (timeEnd.getTime() - timeStart.getTime()) / (5 * 60 * 1000) : 0;
            var totalHours = Math.round(total5Minutes) / 12;
            period = {
                timeStartText: timeStartText,
                timeStart: timeStart,
                timeEndText: timeEndText,
                timeEnd: timeEnd,
                totalHours: totalHours,
                tasks: []
            };
            day.periods.push(period);
        }
        else if (l.match('^#')) {
            // Ignore section
            day = null;
            period = null;
        }
        else {
            if (day == null) {
                console.warn('Task has no period:', l);
                continue;
            }
            period.tasks.push(l);
        }
    }
    report.days.forEach(function (d) { return d.totalHours = d.periods.reduce(function (out, p) { return out += p.totalHours; }, 0); });
    report.totalHours = report.days.reduce(function (out, d) { return out += d.totalHours; }, 0);
    return report;
}
exports.processWorkHours = processWorkHours;
//# sourceMappingURL=work-hours.js.map