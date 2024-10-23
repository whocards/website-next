import {NextResponse} from 'next/server'
import {UTApi} from 'uploadthing/server'

const utapi = new UTApi()

export async function POST(req: Request) {
  const {imageKeys} = (await req.json()) as {imageKeys: string[]}

  try {
    if (!Array.isArray(imageKeys)) {
      return new NextResponse('Bad Request: imageKeys should be an array', {
        status: 400,
      })
    }

    const results = []
    for (const key of imageKeys) {
      const res = await utapi.deleteFiles(key)
      results.push(res)
    }

    return NextResponse.json({results})
  } catch (error) {
    console.log('error at uploadthing/delete', error)
    return new NextResponse('Internal Server Error/ delete', {status: 500})
  }
}
