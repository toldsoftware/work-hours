"use strict";
var work_hours_1 = require("./work-hours");
describe('processWorkHours with simple document', function () {
    var result = null;
    beforeAll(function () {
        var doc = "\n# 2017-01-01\n\n## 9:00-10:00\n\n- Task 1\n\n## 10:01-11:00\n\n- Task 2\n";
        result = work_hours_1.processWorkHours(doc);
        console.log('START beforeAll');
        console.log('result', result);
        console.log('result.totalHours', result.totalHours);
        result.days.forEach(function (x) { return console.log('x.totalHours', x.totalHours); });
        result.days.forEach(function (x) { return console.log('x.dateText', x.dateText); });
        result.days.forEach(function (x) { return x.periods.forEach(function (p) { return console.log('p.totalHours', p.totalHours); }); });
        result.days.forEach(function (x) { return x.periods.forEach(function (p) { return console.log('p.timeStartText', p.timeStartText); }); });
        result.days.forEach(function (x) { return x.periods.forEach(function (p) { return console.log('p.timeStart', p.timeStart); }); });
        result.days.forEach(function (x) { return x.periods.forEach(function (p) { return console.log('p.timeEndText', p.timeEndText); }); });
        result.days.forEach(function (x) { return x.periods.forEach(function (p) { return console.log('p.timeEnd', p.timeEnd); }); });
    });
    it('should have correct total hours', function () {
        console.log('START it');
        console.log(result);
        expect(result.totalHours).toBe(2);
    });
});
//# sourceMappingURL=work-hours.spec.js.map