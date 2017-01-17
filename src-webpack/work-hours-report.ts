import { processWorkHours, Report } from './../src/work-hours';

export function setup() {
    let host = document.createElement('div');
    host.innerHTML = 'LOADED';
    document.body.appendChild(host);

    let output = document.createElement('div');
    let input = document.createElement('textarea');

    input.rows = 10;
    input.style.width = '100%';

    input.addEventListener('change', () => {
        let text = input.value;

        let report = processWorkHours(text);
        output.innerHTML = generateReportHtml(report);
    });


    host.innerHTML = '';
    host.appendChild(input);
    host.appendChild(output);
}

export function generateReportHtml(report: Report): string {

    let summary = `</div>
Total Hours: ${report.totalHours}
</div>`;

    let days = '';

    for (let d of report.days) {

        let periods = '';
        for (let p of d.periods) {
            let tasks = p.tasks.map(t => `<div  style='margin-left:40px'>${t}</div>`).join('\n');

            periods += `<div>
<div style='margin-left:20px'>
## ${p.timeStartText}-${p.timeEndText} (${p.totalHours})
</div>
${tasks}
</div>`;
        }

        days += `<div>
<div>
# ${d.dateText} (${d.totalHours})
</div>
${periods}
</div>`;
    }



    return `<div>
${summary}
${days}
</div>`;

}

setup();