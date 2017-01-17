import { processWorkHours } from './../src/work-hours';

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
        output.innerHTML = JSON.stringify(report);
    });


    host.innerHTML = '';
    host.appendChild(input);
    host.appendChild(output);
}

setup();