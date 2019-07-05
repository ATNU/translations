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

/* GET all texts published in year provided e.g texts/1792 */
router.get('/', function (req, res) {
    console.log("all texts route reached");
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
            res.send(rows);
        });
    })
});

module.exports = router;
