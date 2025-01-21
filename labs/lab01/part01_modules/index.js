const _ = require('lodash');

const holidays = [
        { name: "New Year's Day", date: new Date("2026-01-01") },
        { name: "Good Friday", date: new Date("2025-04-18") },
        { name: "Easter Monday", date: new Date("2025-04-21") },
        { name: "Victoria Day", date: new Date("2025-05-19") },
        { name: "Canada Day", date: new Date("2025-07-01") },
        { name: "Civic Holiday", date: new Date("2025-08-03") },
        { name: "Labour Day", date: new Date("2025-09-01") },
        { name: "Thanksgiving Day", date: new Date("2025-10-13") },
        { name: "Remembrance Day", date: new Date("2025-11-11") },
        { name: "Christmas Day", date: new Date("2025-12-25") },
        { name: "Boxing Day", date: new Date("2025-12-26") }
]

const daysUntilHoliday = (date) => {
    const currentDay = new Date();
    const timeUntil = date - currentDay;
    return Math.ceil(timeUntil / (1000 * 3600 * 24))
}

console.log(`\n`)
console.log(`Days until each holiday:`)
holidays.forEach(holiday => {
    console.log(`Days until ${holiday.name}: ${daysUntilHoliday(holiday.date)} days`);
});

console.log(`\n`)
const randomHoliday = _.sample(holidays);
console.log(`Random holiday: ${randomHoliday.name} on ${randomHoliday.date}`);

const christmasIndex = _.findIndex(holidays, { name: 'Christmas Day' });
const canadaDayIndex = _.findIndex(holidays, { name: 'Canada Day' });
console.log(`\n`)
console.log(`Index of Christmas: ${christmasIndex}`);
console.log(`Index of Canada Day: ${canadaDayIndex}`);
console.log(`\n`)
    
