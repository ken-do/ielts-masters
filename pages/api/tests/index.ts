// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Test, TestInstance } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'

export type TestList = Pick<TestInstance, 'id' | 'title'>[]

export async function getTests(): Promise<TestList> {
    const tests = await Test.findAll({ attributes: ['id', 'title'], raw: true })
    return tests
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET': {
            const tests = await getTests()
            res.status(200).json({ data: { tests } })
            break
        }
        default: {
            res.status(500)
            break
        }
    }
}
