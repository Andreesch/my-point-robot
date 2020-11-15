const test = require('ava');

require('dotenv').config();

test('make sure env variables are loaded', t => {
    t.truthy(process.env.LOGIN);
    t.truthy(process.env.PASSWORD);
    t.truthy(process.env.UID);
    t.truthy(process.env.INIT_DAY_HOUR);
    t.truthy(process.env.LUNCH_DAY_HOUR);
    t.truthy(process.env.FIRST_RETURN_DAY_HOUR);
    t.truthy(process.env.END_DAY_HOUR);
});
