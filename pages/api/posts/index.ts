// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Post, PostInstance } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'

export type PostList = Pick<PostInstance, 'id' | 'title'>[]

export async function getPosts(): Promise<PostList> {
    const tests = await Post.findAll({ attributes: ['id', 'title'], raw: true })
    return tests
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET': {
            const tests = await getPosts()
            res.status(200).json({ data: { tests } })
            break
        }
        default: {
            res.status(500)
            break
        }
    }
}
