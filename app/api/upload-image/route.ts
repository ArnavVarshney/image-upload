import {createPresignedPostRequest} from '../../lib/s3'

export async function POST(request: Request) {
    const {contentType} = await request.json()

    try {
        const {url, fields} = await createPresignedPostRequest(contentType);
        return Response.json({url, fields})
    } catch (error) {
        return Response.json({error: error.message})
    }
}