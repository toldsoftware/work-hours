"use strict";
var work_hours_1 = require("./work-hours");
describe('processWorkHours with simple document', function () {
    var result = null;
    beforeAll(function () {
        var doc = "\n# 2017-01-01\n\n## 9:00-10:00\n\n- Task 1\n\n## 10:01-11:00\n\n- Task 2\n";
        result = work_hours_1.processWorkHours(doc);
        console.log('beforeAll');
        console.log(result);
        console.log(result.totalHours);
        console.log(result.days);
    });
    it('should have correct total hours', function () {
        console.log('it');
        console.log(result);
        expect(result.totalHours).toBe(2);
    });
});
//# sourceMappingURL=work-hours.spec.js.map