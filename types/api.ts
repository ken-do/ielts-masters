/* API Signatures */
// This file for design purpose only //

export interface API {
    getTests(page: number, pageSize: number): Promise<GetTestsResponse>
    getPosts(page: number, pageSize: number): Promise<GetPostsResponse>
}

interface GetTestsResponse {
    id: string
    title: string
    testType: string
}

interface GetPostsResponse {
    id: string
    title: string
    heroUrl: string
    excerpt: string
}
