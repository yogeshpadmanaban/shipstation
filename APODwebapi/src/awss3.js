const AWS = require('aws-sdk');

exports.uploadFile = (buffer, name, type) => {
    AWS.config.update({
        accessKeyId: "AKIAVTHGOICUWRHG4D7K",
        secretAccessKey: "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",
    });
    const s3 = new AWS.S3();
    const params = {
      ACL: 'public-read',
      Body: buffer,
      Bucket: "myapoddev",
      ContentType: type.mime,
      Key: `${name}.${type.ext}`,
    };
    return s3.upload(params).promise();
};