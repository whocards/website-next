import {NextResponse} from 'next/server'
import {UTApi} from 'uploadthing/server'

const utapi = new UTApi()
export async function POST(req: Request) {
  try {
    const imageKey = (await req.json()) as {img: {key: string}}

    const key = imageKey.img.key

    const res = await utapi.deleteFiles(key)

    return NextResponse.json(res)
  } catch (error) {
    console.log('error at uploadthing/delete', error)
    return new NextResponse('Internal Server Error/ delete', {status: 500})
  }
}
