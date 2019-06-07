const express = require('express');
const router = express.Router();
const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.json');
const _ = require('lodash/core');

//translations spreadsheet
const doc = new GoogleSpreadsheet('1rXkE-S5jIf--YrEzAfNbEd9YyAgRNJ5cVTuwRE81nWM');




/* GET all texts published in year provided e.g texts/1792 */
router.get('/', function (req, res) {
    console.log("all texts route reached");
    doc.useServiceAccountAuth(creds, function (err) {
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
