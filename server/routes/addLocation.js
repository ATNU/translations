const express = require('express');
const router = express.Router();
const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.json');
const _ = require('lodash');

//translations spreadsheet
const doc = new GoogleSpreadsheet('1tuEa2KegHT85-Gzey5GKJnu4rtTx6qrMOUsA68fTeAU');

var row;
var exists = false;

function filterByCity(city, sheet) {
    return _.filter(sheet, function (o) {
        return o.city === city;
    });
}

router.post('/', function (req, res) {
    console.log("add location route reached");

    doc.useServiceAccountAuth(creds, function (err) {
        if (err) {
            res.status(401);
            res.send('Service account access forbidden');
        }

        console.log(req.body.city);

        var city = req.body.city;
        var longitude = req.body.longitude;
        var latitude = req.body.latitude;


        row = {city: city, latitude: latitude, longitude: longitude};

        console.log(city, latitude, longitude);

        doc.getRows(1, function (err, rows) {
            if (err) {
                res.status(401);
                res.send('Access to spreadsheet forbidden');
            }

            //Filter rows by year
            const filtered = filterByCity(city, rows);
            console.log(filtered.length);

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