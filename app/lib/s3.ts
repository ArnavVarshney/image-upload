import {createPresignedPost} from '@aws-sdk/s3-presigned-post'
import {S3Client} from '@aws-sdk/client-s3'
import {v4 as uuidv4} from 'uuid'

export async function createPresignedPostRequest(contentType: string) {
    try {
        const client = new S3Client({region: process.env.AWS_REGION})
        const {url, fields} = await createPresignedPost(client, {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: uuidv4(),
            Conditions: [['content-length-range', 0, 5242880], ['starts-with', '$Content-Type', contentType],],
            Fields: {
                acl: 'public-read', 'Content-Type': contentType,
            },
            Expires: 600,
        })

        return {url, fields}
    } catch (error) {
        throw error;
    }
}