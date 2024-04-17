import clientPromise from "../../lib/mongo";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const description = searchParams.get('description');

    try {
        const client = await clientPromise;
        const collection = client.db("image-upload-next").collection("images");
        const pipeline = [
            {
                $search: {
                    "text": {
                        "query": description,
                        "path": "description",
                        "fuzzy": {
                            "maxEdits": 2
                        }
                    }
                }
            }
        ];
        return Response.json(await collection.aggregate(pipeline).toArray())
    } catch (error) {
        return Response.json({error: error.message})
    }
}