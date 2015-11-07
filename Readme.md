#js-calendar

A JavaScript calendar days generator for datepickers and apps where weekdays are needed.

---

## install

    npm install js-calendar
	
## methods

	- generator - the main Core feature, a function to generate calendar days for the requested month
	- addLabels - the default iterator that adds basic CSS classes to each day object and labels for column head

## syntax

	var january = jsCalendar.generator(year, month, iteratorFn, weekStart);

#### arguments:

1. year - (number) the year
2. month - (number) the month, zero based (ie. january is month number `0`).
3. iteratorFns - a function (or array of functions) to be used while iterating each day, receives a object with:
	- (_desc_) the generated day or week number. Will be set `false` if its a label cell.
	- (_week_) the number of the week in the year
	- (_type_) the type of the iterated object. Can be `weekLabel`, `dayLabel`, `prevMonth`, `nextMonth` or `monthDay`.
	- (_date_) a Date object for that day. Will be set `false` if its a label cell.
	- (_index_) index position in the 8 x 7 position in the return of the callendar.
	
Note:
The iterator function(s) must `return` the value/object.

4. onlyDays - (boolean) generate only days and no labels or week numebrs. When not specified it will default to `false`;
5. weekStart - (number) the starting day of the week. Can be `0` for sunday or `1` for monday. When not specified it will default to `1`;


#### returns:

* (*object*) O object with keys:

	* (*month*) The generated month.
	* (*year*) The generated year.
	* (*cells*) A array with objects as passed to the iterator function above.
	* (*daysInMonth*) The number of days in the month.

#### examples:

Get just the days in a month:

	var jsCalendar = require('js-calendar').generator;
	var januaryDays = jsCalendar(2016, 1, false, true).daysInMonth;	// 29
	var days = jsCalendar(2016, 1).cells;
	// 	[
	//     	{"desc":1,"week":6,"type":"monthDay","date":"2016-01-31T23:00:00.000Z","index":5},
	//     	{"desc":2,"week":6,"type":"monthDay","date":"2016-02-01T23:00:00.000Z","index":6},
	//     	etc...
	
Get days and labels in a month:

	var jsCalendar = require('js-calendar');
	var days = jsCalendar.generator(2016, 1, jsCalendar.addLabels).cells;
	// 	[
	//		{"desc":"monday","week":5,"type":"weekLabel","date":false,"index":1,"class":["week-number"]},
	//		{"desc":"tuesday","week":5,"type":"dayLabel","date":false,"index":2,"class":["column-name"]},
	//		etc...

Compile HTML with jade
	
## testing

js-calendar uses [mocha](http://mochajs.org/). To run the tests do in your command line:

    npm install
	npm test

## todo:

	- add even more tests
	- add more usefull iterator function for standard uses
	- add more examples like jade compiler or some other use case
	




