var request = require('request');
var token = require('./secret');
var fs = require('fs');
var input = process.argv.slice(2);
if(!input[0]){
  console.log('Please specify the Owner and the Name of the repository!')
  return;
}

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


getRepoContributors(input[0], input[1], function(err, result) {
  if(err){
    console.log("Errors:", err);
  };
  result.forEach(function(result) {
    var avatarURL = result.avatar_url;
    var userName = result.login;
    downloadImageByURL(avatarURL, 'avatars/' + userName + '.jpg')
  });
});

function downloadImageByURL(url, filePath) {
  fs.mkdir('avatars', function(err){
    request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .pipe(fs.createWriteStream(filePath))
  });

};




