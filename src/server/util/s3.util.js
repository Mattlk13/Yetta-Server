import aws from 'aws-sdk';

aws.config.region = 'ap-northeast-2';
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const bucket = process.env.S3_BUCKET_NAME;
const baseKeys = {
    profile : 'profileImage',
    node : 'nodeImage',
    item : 'itemImage'
};

function uploadImageToS3(key, file, baseKey) {
    return new Promise((resolve, reject) => {
        const s3config = {
            Bucket: bucket,
            Key: `${baseKey}/${key}`,
            ACL: 'public-read',
            ContentType: file.mimetype
        };
        const s3obj = new aws.S3({ params: s3config });
        s3obj.upload({ Body: file.buffer }).
        on('httpUploadProgress', function (evt) {
            console.log(evt);
        }).
        send(function (err, data) {
            if (!err) {
                return resolve(data);
            }
            return reject('An error occured while upload image.');
        });
    });
}

export default {
    uplaoadImageToProfileImage(key,file){
        return uploadImageToS3(key,file,baseKeys.profile);
    },
    uploadImageToNodeImage(key,file){
        return uploadImageToS3(key,file,baseKeys.node);
    },
    uploadImageToItemImage(key,file){
        return uploadImageToS3(key,file,baseKeys.item);
    }
};
