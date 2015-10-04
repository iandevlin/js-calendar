#js-calendar

A JavaScript calendar days generator for datepickers and apps where weekdays are needed.

---

## install

    npm install js-calendar

## syntax

	var january = jsCalendar(year, month, iteratorFn, weekStart);

#### arguments:

1. year - the year
2. month - the month, zero based (ie. january is month number `0`).
3. iteratorFn - a function to be used on each day, receives a object with:
	- (_day_) the generated day. Will be set `false` if its a label cell.
	- (_week_) the number of the week in the year
	- (_type_) the type of the iterated object. Can be `weekLabel`, `dayLabel`, `prevMonth`, `nextMonth` or `monthDay`.
	- (_date_) a Date object for that day. Will be set `false` if its a label cell.

4. weekStart - the starting day of the week. Can be `0` for sunday or `1` for monday. When not specified it will default to `1`;


#### returns:

* (*object*) O object with keys:

	* (*month*) The generated month.
	* (*year*) The generated year.
	* (*cells*) A array with objects as passed to the iterator function above.
	* (*daysInMonth*) The number of days in the month.

#### examples:


	var jsCalendar = require('js-calendar');
	var januaryDays = jsCalendar(2016, 1).days;

## testing

js-calendar uses [mocha](http://mochajs.org/). To run the tests do in your command line:

    npm install
	npm test

## todo:

	- add more tests
	- add usefull iterator function for standard uses
	- add more examples like jade compiler or some other use case
	




