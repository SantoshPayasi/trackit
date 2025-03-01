import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const SetUpBaseQuery = ({ baseUrl }: { baseUrl: string }) => {
    console.log(baseUrl)
    return fetchBaseQuery({
        baseUrl: `${baseUrl}/api`
    })
}