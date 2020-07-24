import AWS from 'aws-sdk';


// AWS SETUP
const credentials = {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  };
  
  AWS.config.update({
    credentials,
    region: 'eu-central-1',
  });

const  ep = new AWS.Endpoint('s3.eu-central-1.wasabisys.com');
const  s3 = new AWS.S3({endpoint: ep});


// Get list of all Objects from Wasabi Bucket
export const listKeys = (bucket) => {
    return new Promise ((resolve, reject) => {
      const s3params = {
        Bucket: bucket,
        MaxKeys: 48,
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

export const listMeta = (bucket, key) => {
    return new Promise ((resolve, reject) => {
    var params3 = {
        Bucket: bucket, 
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
