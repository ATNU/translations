
module.exports = {
/**When read from an environment variable extra back slashes are added to the private key. This method removes them
 ('\\n' is changed to '\n').
*/

    parse: function(creds) {
//convert to string to remove extra '\'
        const tempCreds = JSON.stringify(creds, null, 2);
        const JSONcreds = tempCreds.replace(/\\\\n/gm, "\\n");
//convert back to object
       return JSON.parse(JSONcreds);
    }

};