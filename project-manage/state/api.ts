import { createApi } from "@reduxjs/toolkit/query/react";
import { SetUpBaseQuery } from "./setUpBaseQuery.api";
import { Tags } from "../constants";


// export const api = createApi({
//     baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
//     reducerPath: "api",
//     tagTypes: [Tags.Projects],
//     endpoints: (build) => ({
//         getProjects: build.query<Project[], void>({
//             query: () => "projects",
//             providesTags: [Tags.Projects]
//         }),

//         createProject: build.mutation<Project, Partial<Project>>({
//             query: (project) => (
//                 {
//                     url: "projects/create",
//                     method: "POST",
//                     body: project
//                 }
//             ),
//             invalidatesTags: [Tags.Projects]
//         })
//     })
// })

export const api = createApi({
    baseQuery: SetUpBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL! }),
    reducerPath: "api",
    tagTypes: [Tags.Projects, Tags.Tasks],
    endpoints: () => ({})
})
export const { } = api