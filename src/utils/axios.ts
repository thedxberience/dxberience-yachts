import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: "https://dxberienceapi.up.railway.app/api/v1",
})

export const makeRequest = async (url: string, config?: AxiosRequestConfig) => {
    try {
        const response = await axiosInstance(url, config)
        return response.data
    } catch (error) {
        console.error(error)
        throw new AxiosError(`Could not make request: ${error}`)
    }
}