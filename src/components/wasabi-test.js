// Load the SDK and UUID
var AWS = require('aws-sdk');

// Create an S3 client
AWS.config.loadFromPath('../credentials/config.json');
const  ep = new AWS.Endpoint('s3.eu-central-1.wasabisys.com');
const  s3 = new AWS.S3({endpoint: ep});

// Create new array for Wasabi
const listKeysWasabi = (result) => {
    const objectitems = result.map(item => {
        const chain = listMeta(item.Key)
        const download_url = 'https://s3.eu-central-1.wasabisys.com/'
        const container = {};
    
        container.Key = item.Key
        container.LastModified = item.LastModified
        container.Size = item.Size
        container.url = download_url + item.Key
        container.chain = chain
    
        return container
    })  
return objectitems;
}

// Get list of all Objects from Wasabi Bucket
const listKeys = () => {
    return new Promise ((resolve, reject) => {
      const s3params = {
        Bucket: 'waxtest2',
        MaxKeys: 100,
      };
      s3.listObjectsV2 (s3params, (err, data) => {
        if (err) {
          reject (err);
        }
        // Promise.resolve function returns a Promise that is resolved.
        // Return each key and its contents
        resolve (data['Contents']);
      });
    });
  };

   // Create new promise using listKeys() function.
var initializePromise = listKeys();

// Receive that promise then pass results to listKeysWasabi
initializePromise.then(function(result) {
    // Return results which contains new array.
    return listKeysWasabi(result)
}, function(err) {
    console.log(err);
}).then(function(result) {
    // Handler receives new listKeysWasabi array
    // Prints To Console
    // Pass to react usestate
    console.log(result)
});



const listMeta = (key) => {
  return new Promise ((resolve, reject) => {
  var params3 = {
      Bucket: 'waxtest2', 
      Key: key
      }
  s3.headObject(params3, function(err, data2) {
      if (err) {
          reject (err);
        }
      resolve (data2);          
  });
}); 
}

  
///Uploading objects
/*
// Create a bucket and upload something into it
var bucketName = 'waxtestnet' 
var keyName = 'hello_world2.txt';
s3.createBucket({Bucket: bucketName}, function() {
var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
s3.putObject(params, function(err, data) {
if (err)
console.log(err)
else
console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
});
});
*/