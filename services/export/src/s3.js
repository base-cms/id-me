const AWS = require('aws-sdk');
const {
  AWS_ACCESS_KEY_ID,
  AWS_S3_BUCKET_NAME,
  AWS_SECRET_ACCESS_KEY,
} = require('./env');

const client = new AWS.S3({
  signatureVersion: 'v4',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

module.exports = {
  client,
  upload: ({ filename, contents }) => new Promise((resolve, reject) => client.putObject({
    ACL: 'public-read',
    Body: contents,
    Bucket: AWS_S3_BUCKET_NAME,
    ContentDisposition: `attachment; filename="${filename}"`,
    ContentType: 'text/plain; charset=utf8',
    Expires: Math.floor(Date.now().valueOf() / 1000),
    Key: filename,
  }, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  })),
};
