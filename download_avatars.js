var request = require('request');
var token = require('./secret')

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    },
    qs:{
      access_token: token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var contributors = JSON.parse(body);
    cb(err, contributors);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  if(err){
    console.log("Errors:", err);
  };
  result.forEach(function(result) {
      console.log(result.avatar_url);
    });
});