import type { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { getTest } from 'pages/api/tests/[testId]'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../../components/layout'
import styles from './[id].module.scss'

export const getStaticProps = async () => {
    const tests = await getTest('1')

    return {
        props: {
            tests,
        },
    }
}

const Test: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = () => {
    return (
        <Layout title="First test">
            <Head>
                <title>First test</title>
            </Head>
            <Container>
                <Row>
                    <Col className={styles.colFirst}>questions</Col>
                    <Col xs={8}>tets</Col>
                    <Col className={styles.colThird}>info</Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Test
