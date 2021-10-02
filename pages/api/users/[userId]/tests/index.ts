// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserTest, UserTestInstance } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from 'types'

export interface UserTestList {
    userTests: Pick<UserTestInstance, 'id'>[]
}

async function getUserTestList(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<UserTestList>>
) {
    const userTests = await UserTest.findAll({
        attributes: ['id', 'totalCorrectAnswers'],
    })
    res.status(200).json({ data: { userTests } })
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            getUserTestList(req, res)
            break
        default:
            res.status(500)
            break
    }
}
