export type GenericObject = Record<string, any>

export interface ApiResponseError {
    code: number
    message: string
}

export interface ApiResponseData {
    [key: string]: GenericObject
}
export interface ApiResponse<D = ApiResponseData> {
    data?: D
    error?: ApiResponseError
}
