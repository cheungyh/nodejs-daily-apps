var cron = require('node-schedule');

var rule = new cron.RecurrenceRule();
rule.second = 30;
cron.scheduleJob(rule, function(){
    console.log(new Date(), 'The 30th second of the minute.');
});