const _ = require('lodash');

module.exports = {
//take a json object and filter by the city variable
    filterByCity: function(city, sheet) {
        return _.filter(sheet, function (o) {
            return o.city === city;
        });
    },

    //take a json object and filter by the year variable
    filterByYear: function(year, sheet) {
    return _.filter(sheet, function (o) {
        return o.year === year;
    });
}

};

