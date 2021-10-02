import type { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getTestList } from 'pages/api/tests'
import Layout from '../../components/layout'

export const getStaticProps = async () => {
    const tests = await getTestList()

    return {
        props: {
            tests,
        },
    }
}

const Test: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
    tests,
}) => {
    return (
        <Layout title="IELTS Tests">
            <Head>
                <title>IELTS Tests</title>
            </Head>
            <ul>
                {tests.map((test) => (
                    <li key={test.id}>
                        <Link href={`/tests/${test.id}`}>{test.title}</Link>
                    </li>
                ))}
            </ul>
        </Layout>
    )
}

export default Test
