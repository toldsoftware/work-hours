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
        console.log('beforeAll');
        console.log(result);
        console.log(result.totalHours);
        console.log(result.days);
    });

    it('should have correct total hours', () => {

        console.log('it');
        console.log(result);

        expect(result.totalHours).toBe(2);
    });
});