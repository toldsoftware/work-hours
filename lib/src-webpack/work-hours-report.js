"use strict";
var work_hours_1 = require("./../src/work-hours");
function setup() {
    var host = document.createElement('div');
    host.innerHTML = 'LOADED';
    document.body.appendChild(host);
    var output = document.createElement('div');
    var input = document.createElement('textarea');
    input.rows = 10;
    input.style.width = '100%';
    input.addEventListener('change', function () {
        var text = input.value;
        var report = work_hours_1.processWorkHours(text);
        output.innerHTML = generateReportHtml(report);
    });
    host.innerHTML = '';
    host.appendChild(input);
    host.appendChild(output);
}
exports.setup = setup;
function generateReportHtml(report) {
    var summary = "</div>\nTotal Hours: " + report.totalHours + "\n</div>";
    var days = '';
    for (var _i = 0, _a = report.days; _i < _a.length; _i++) {
        var d = _a[_i];
        var periods = '';
        for (var _b = 0, _c = d.periods; _b < _c.length; _b++) {
            var p = _c[_b];
            var tasks = p.tasks.map(function (t) { return "<div  style='margin-left:40px'>" + t + "</div>"; }).join('\n');
            periods += "<div>\n<div style='margin-left:20px'>\n## " + p.timeStartText + "-" + p.timeEndText + " (" + p.totalHours + ")\n</div>\n" + tasks + "\n</div>";
        }
        days += "<div>\n<div>\n# " + d.dateText + " (" + d.totalHours + ")\n</div>\n" + periods + "\n</div>";
    }
    return "<div>\n" + summary + "\n" + days + "\n</div>";
}
exports.generateReportHtml = generateReportHtml;
setup();
//# sourceMappingURL=work-hours-report.js.map