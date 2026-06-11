import { env } from "./env";
import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";


const s3 = new S3Client({
    region: env.AWS_REGION,
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    }
});

export class S3 {
    async getUploadUrl(
        key: string,
        content_type: string,
    ) {
        return await getSignedUrl(s3, new PutObjectCommand({
            Bucket: env.AWS_BUCKET_NAME,
            Key: key,
            ContentType: content_type,
        }), { expiresIn: 3000 });
    }

    async delete(
        key: string,
    ) {
        return await s3.send(new DeleteObjectCommand({
            Bucket: env.AWS_BUCKET_NAME,
            Key: key,
        }));
    }
}