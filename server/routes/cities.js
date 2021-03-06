const express = require('express');
const router = express.Router();
const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.js');
const _ = require('lodash/core');

//cities spreadsheet
const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_NAME_CITIES);

//parse creds to process env variable password into required format
const JScreds = require('../util/credsParser.js').parse(creds);

/**
 *  GET all cities saved in spreadsheet along with longitude and latitude
 *  */
router.get('/', function (req, res) {
    console.log("Cities route reached");

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
    });
});


module.exports = router;