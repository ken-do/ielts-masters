// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User, UserInstance } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from 'types'

export interface UserList {
    user: Pick<UserInstance, 'id' | 'email' | 'userName' | 'description'>
}

async function getUserList(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<UserList>>
) {
    const { userId } = req.query
    const user = await User.findByPk(userId as string, {
        attributes: ['id', 'email', 'userName', 'description'],
    })
    res.status(200).json({ data: { user } })
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            getUserList(req, res)
            break
        default:
            res.status(500)
            break
    }
}
