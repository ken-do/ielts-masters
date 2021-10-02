/* eslint-disable no-case-declarations */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
    Article,
    ArticleInstance,
    Paragraph,
    Question,
    QuestionInstance,
    TaskType,
    Test,
    TestInstance,
    TestMode,
    TestModeInstance,
    TestType,
    TestTypeInstance,
} from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'

interface CustomTestInstance extends TestInstance {
    id: string
    title: string
    testType: Pick<TestTypeInstance, 'name'>
    testModeName: Pick<TestModeInstance, 'name'>
    articles: ArticleInstance[]
    questions: QuestionInstance[]
}

export async function getTest(testId: string) {
    const test = (await Test.findByPk(testId as string, {
        attributes: ['id', 'title'],
        include: [
            {
                model: TestType,
                attributes: ['name'],
            },
            {
                model: TestMode,
                attributes: ['name'],
            },
            {
                model: Article,
                attributes: ['title'],
                through: {
                    attributes: [],
                },
                include: [
                    {
                        model: Paragraph,
                        attributes: ['id', 'text'],
                    },
                ],
            },
            {
                model: Question,
                attributes: ['number', 'text', 'description'],
                through: {
                    attributes: [],
                },
                include: [
                    {
                        model: TaskType,
                        attributes: ['name'],
                    },
                    {
                        model: Question,
                        as: 'relatedQuestion',
                        attributes: ['number'],
                    },
                ],
            },
        ],
        order: [[Question, 'number', 'ASC']],
    })) as CustomTestInstance

    return test
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            const { testId } = req.query
            const test = getTest(testId as string)
            res.status(200).json({ data: { test } })
            break
        default:
            res.status(500)
            break
    }
}
