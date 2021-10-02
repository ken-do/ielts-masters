// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserTest, UserTestInstance } from 'models'
import { Answer, AnswerInstance } from 'models/Answer'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from 'types'

interface GetUserTestResponse {
    userTest: Pick<UserTestInstance, 'id' | 'totalCorrectAnswers'>
}

async function getUserTest(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<GetUserTestResponse>>
) {
    const { testId, userId } = req.query
    const userTest = await UserTest.findOne({
        where: { testId, userId },
        attributes: ['id', 'totalCorrectAnswers'],
    })

    res.status(200).json({
        data: { userTest },
    })
}

type CustomAnswerInstance = Pick<AnswerInstance, 'id' | 'questionId'>

interface UserTestPayload {
    userAnswers: CustomAnswerInstance[]
}

interface CreateUserTestResponse {
    userTest: UserTestInstance
}

async function createUserTest(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<CreateUserTestResponse>>
) {
    const { testId, userId } = req.query
    const { userAnswers } = req.body as UserTestPayload

    const totalCorrectAnswers = await Answer.count({
        where: {
            id: userAnswers.map(({ id }) => id),
            isCorrect: true,
        },
    })

    // create a new user test if the user is logged in
    await UserTest.create({
        testId: testId as string,
        userId: userId as string,
        totalCorrectAnswers,
    })

    const userTest = await UserTest.findOne({
        where: {
            testId,
            userId,
        },
        attributes: ['totalCorrectAnswers'],
        include: [
            {
                model: Answer,
                as: 'correctAnswers',
                where: {
                    isCorrect: true,
                },
            },
        ],
    })

    res.status(200).json({
        data: { userTest },
    })
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            getUserTest(req, res)
            break
        case 'POST':
            createUserTest(req, res)
            break
        default:
            res.status(500).json({})
            break
    }
}
