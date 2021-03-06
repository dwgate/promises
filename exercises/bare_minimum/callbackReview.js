/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  let file = '';
  fs.readFile(filePath, 'utf8', (err, res) => {
    if (!err) {
      let firstLine = res.split('\n')[0];
      callback(null, firstLine);
    } else {
      callback(err, null);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request(url, (err, res) => {
    if (!err) {
      callback(null, res.statusCode);
    } else {
      callback(err, null);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
