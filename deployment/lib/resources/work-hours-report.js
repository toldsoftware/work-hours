/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var work_hours_1 = __webpack_require__(1);
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


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=work-hours-report.js.map