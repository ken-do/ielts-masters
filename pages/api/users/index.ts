// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User, UserInstance } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from 'types'

export interface UserList {
    users: Pick<UserInstance, 'id' | 'userName'>[]
}

async function getUserList(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<UserList>>
) {
    const users = await User.findAll({ attributes: ['id', 'userName'] })
    res.status(200).json({ data: { users } })
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
