const express = require('express');
const router = express.Router();
const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.json');

//translations spreadsheet
const doc = new GoogleSpreadsheet('1tuEa2KegHT85-Gzey5GKJnu4rtTx6qrMOUsA68fTeAU');

router.post('/', function (req, res) {
    console.log("add location route reached");

    doc.useServiceAccountAuth(creds, function (err) {
        if (err) {
            res.status(401);
            res.send('Service account access forbidden');
        }

        console.log(req.body.city);

        var city= req.body.city;
        var longitude = req.body.longitude;
        var latitude = req.body.latitude;


        var row = { city: city,  latitude: latitude, longitude : longitude};

        console.log(city, latitude, longitude);

        doc.addRow(1, row, function (err) {
            if (err) {
                res.status(401);
                res.send('Problem adding a row');
            } else {
                res.status(200);
                res.send('Spreadsheet updated')
            }
        });
    })
});

module.exports = router;