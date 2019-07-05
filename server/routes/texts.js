const express = require('express');
const router = express.Router();
const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.js');
const _ = require('lodash/core');

//translations spreadsheet
const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_NAME_TRANSLATIONS);

//convert to JSON to remove extra '\'
const tempCreds = JSON.stringify(creds, null, 2);
const JSONcreds = tempCreds.replace(/\\\\n/gm, "\\n");
//convert back to js object
const JScreds = JSON.parse(JSONcreds);

function filterByYear(year, sheet) {
    return _.filter(sheet, function (o) {
        return o.year === year;
    });
}


/* GET all texts published in year provided e.g texts/1792 */
router.get('/:year', function (req, res) {
    let year = req.params.year;

    doc.useServiceAccountAuth(JScreds, function (err) {
        if (err) {
            res.status(401);
            res.send('Service account access forbidden');
        }

        // Get all of the rows from the spreadsheet.
        doc.getRows(1, function (err, rows) {
            if (err) {
                res.status(401);
                res.send('Access to spreadsheet forbidden');
            }

            //Filter rows by year
            const filtered = filterByYear(year, rows);
            console.log(filtered.length);
            res.send(filtered);
        });
    })
});


module.exports = router;
