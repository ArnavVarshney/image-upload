import clientPromise from "../../lib/mongo";

export async function POST(request: Request) {
    const {_id, filename, contentType, s3Url, description, dimension} = await request.json();

    try {
        const client = await clientPromise;
        const db = client.db("image-upload-next");
        const collection = db.collection("images");

        await collection.insertOne({
            _id: _id,
            filename: filename,
            contentType: contentType,
            s3Url: s3Url,
            uploadDate: new Date(),
            description: description,
            Photos: [
                {
                    Dimension: dimension
                }
            ]
        });

        return Response.json({message: 'Entry added successfully'})
    } catch (error) {
        return Response.json({error: error.message})
    }
}