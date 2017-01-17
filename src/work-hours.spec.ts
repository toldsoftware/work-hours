import { processWorkHours, Report } from './work-hours';

describe('processWorkHours with simple document', () => {

    let result: Report = null;

    beforeAll(() => {
        let doc = `
# 2017-01-01

## 9:00-10:00

- Task 1

## 10:01-11:00

- Task 2
`;

        result = processWorkHours(doc);
        console.log('START beforeAll');
        console.log('result', result);
        console.log('result.totalHours', result.totalHours);
        result.days.forEach(x => console.log('x.totalHours', x.totalHours));
        result.days.forEach(x => console.log('x.dateText', x.dateText));
        result.days.forEach(x => x.periods.forEach(p => console.log('p.totalHours', p.totalHours)));
        result.days.forEach(x => x.periods.forEach(p => console.log('p.timeStartText', p.timeStartText)));
        result.days.forEach(x => x.periods.forEach(p => console.log('p.timeStart', p.timeStart)));
        result.days.forEach(x => x.periods.forEach(p => console.log('p.timeEndText', p.timeEndText)));
        result.days.forEach(x => x.periods.forEach(p => console.log('p.timeEnd', p.timeEnd)));
    });

    it('should have correct total hours', () => {

        console.log('START it');
        console.log(result);

        expect(result.totalHours).toBe(2);
    });
});