var request = require('request');
var token = require('./secret');
var fs = require('fs');

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
       // .on('response', function (response) {
       //  console.log('Downloading image...')})
       .pipe(fs.createWriteStream(filePath))
       // .on('finish', function(){
       //  console.log('Download complete.')})
  });

};

//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")




