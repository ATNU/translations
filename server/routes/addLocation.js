const express = require('express');
const router = express.Router();
const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.js');
const _ = require('lodash');
const filter = require('../util/filter.js');

//parse creds to process env variable password into required format
const JScreds = require('../util/credsParser.js').parse(creds);

//translations spreadsheet
const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_NAME_CITIES);

/**
POST a new entry to the 'cities' google spreadsheet. Must provide a city, longitude and latitude field in JSON.
 */
router.post('/', function (req, res) {
    console.log("add location route reached");

    doc.useServiceAccountAuth(JScreds, function (err) {
        if (err) {
            res.status(401);
            res.send('Service account access forbidden');
        }


        //get fields and build a row object
        const city = req.body.city;
        const longitude = req.body.longitude;
        const latitude = req.body.latitude;

        const row = {city: city, latitude: latitude, longitude: longitude};

        //todo check correct JSON provided

        console.log(city, latitude, longitude);

        doc.getRows(1, function (err, rows) {
            if (err) {
                res.status(401);
                res.send('Access to spreadsheet forbidden');
            }

            //See if there are already entries for that city
            const filtered = filter.filterByCity(city, rows);
            console.log(filtered.length);

            //If there aren't already entries add new one
            if ( filtered.length < 1) {
            doc.addRow(1, row, function (err) {
                if (err) {
                    res.status(401);
                    res.send('Problem adding a row');
                } else {
                    res.status(200);
                    res.send('Spreadsheet updated')
                }
            });
        } else {
            res.status(404);
            res.send('City already exists');

        }
     });
    })

});



module.exports = router;