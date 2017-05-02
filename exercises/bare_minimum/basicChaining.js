/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var github = require('./promisification.js');
var files = require('./promiseConstructor.js');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return files.pluckFirstLineFromFileAsync(readFilePath)
    .then( (str) => {
      return github.getGitHubProfileAsync(str);
    })
    .then( (result) => {
      let results = JSON.stringify(result);
      // fs.writeFileSync(writeFilePath, results, (err) => {
      //   if (!err) {
      //     console.log('success');
      //     return;
      //   } else {
      //     console.log('error: ', err);
      //   }
      // });
      return new Promise( (resolve, reject) => {
        fs.writeFile(writeFilePath, results, (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        });
      });
    })
    .catch( (error) => {
      console.log('error: ', error);
    });
};
// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
