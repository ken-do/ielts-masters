import Head from 'next/head'
import { ReactNode } from 'react'
import { Container, Navbar } from 'react-bootstrap'

export interface LayoutProps {
    children: ReactNode
    title: string
}

function Layout({ children, title }: LayoutProps) {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta name="og:title" content={title} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">{title}</Navbar.Brand>
                    </Container>
                </Navbar>
            </header>
            <main>{children}</main>
        </div>
    )
}

export default Layout
