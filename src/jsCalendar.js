// calendar with 8 column x 7 rows

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getDateInfo(day) {
    // http://jsfiddle.net/ormfm5o8/ testing
    var d = new Date(+day);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    var yearStart = new Date(d.getFullYear(), 0, 1);
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return {
        y: day.getFullYear(),
        m: day.getMonth(),
        d: day.getDate(),
        w: weekNo
    };
}

function getMonthCalender(year, month, iteratorFns){

	// config passed by binding
	var lang = this.lang || 'en';
	var onlyDays = this.onlyDays;
	var weekStart = typeof this.weekStart == 'undefined' ? 1 : this.weekStart;

	var cells = [];
	var monthStartDate = new Date(year, month, 1);	// make a date object
	var dayOfWeek = monthStartDate.getDay() || 7;	// month week day for day 1
	var currentDay = weekStart - dayOfWeek; 		// starting position of first day in the week
	var weekNr = getDateInfo(monthStartDate).w;	// get week number of month start
	var maxDays = daysInMonth(year, month);			// total days in current month
	var lastMonthMaxDays = daysInMonth(year, month - 1);
	var currentMonth, day;

	var returnObject = {
		month: month,
		year: year,
		daysInMonth: maxDays
	};

	for (var i = 0; i < 7; i++){					// 7 rows in the calendar
		var dayBefore = currentDay;
		for (var j = 0; j < 8; j++){				// 8 columns: week nr + 7 days p/ week
			if (i > 0 && j > 0) currentDay++;		// not first row, not week nr column
			
			if (currentDay > maxDays || currentDay < 1){ // day belongs to sibling month
				// calculate day in sibling month
				day = currentDay > maxDays ? currentDay - maxDays : lastMonthMaxDays + currentDay;
				currentMonth = currentDay > maxDays ? month + 1 : month - 1;
			} else {
				day = currentDay;
				currentMonth = month;
			}

			var type = (function(){
				if (j == 0) return 'weekLabel';
				else if (i == 0) return 'dayLabel';
				else if (currentDay < 1) return 'prevMonth';
				else if (currentDay > maxDays) return 'nextMonth';
				else return 'monthDay';
			})();
			var isDay = dayBefore != currentDay && i > 0;
			var _date = new Date(year, currentMonth, day);

			var returnYear = currentMonth < 0 ? year - 1 : currentMonth > 11 ? year + 1 : year;
			if ((currentMonth === 11 || currentMonth === -1) && (weekNr === 1)) returnYear++;

			var dayData = {
				desc: isDay ? day : weekNr,
				week: weekNr,
				type: type,
				date: isDay ? _date : false,
				year: returnYear,
				index: cells.length
			};

			if (iteratorFns){
				if (typeof iteratorFns === "function") dayData = iteratorFns(dayData, lang);
				else iteratorFns.forEach(function(fn){
					dayData = fn.call(returnObject, dayData, lang);
				});
			}
			if (onlyDays && isDay) cells.push(dayData);	// add only days
			else if (!onlyDays) cells.push(dayData);	// add also week numbers and labels
		}
		if (i > (this.weekStart === 0 ? -1 : 0)) {
			weekNr = getDateInfo(new Date(year, currentMonth, day + 1)).w;
		}
	}

	returnObject.cells = cells;
	return returnObject;
}

module.exports = function (config){
	return getMonthCalender.bind(config);
}
