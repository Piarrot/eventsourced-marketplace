import { S3 } from "@aws-sdk/client-s3";

const REGION = "us-east-1";

export class ImageBucket {
    private s3Bucket: S3;
    constructor(bucketName: string) {
        this.s3Bucket = new S3({
            region: REGION,
        });
    }
}
