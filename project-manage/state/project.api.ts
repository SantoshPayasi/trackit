import { CreateProjectRequestDto, Project } from "@/app/types/project.types";
import { api } from "./api";
import { Tags } from "@/constants";

export const projectApiSlice = api.injectEndpoints({
    endpoints: (build) => ({
        getProjects: build.query<Project[], void>({
            query: () => "projects",
            providesTags: [Tags.Projects],
            transformResponse: (response: any) => {
                return response.data?.map((project: Project) => project)
            }
        }),

        createProject: build.mutation<Project, CreateProjectRequestDto>({
            query: (project) => (
                {
                    url: "projects/create",
                    method: "POST",
                    body: {
                        projectInput: project
                    }
                }
            ),
            invalidatesTags: [Tags.Projects]
        })
    }),
})


export const { useGetProjectsQuery, useCreateProjectMutation, } = projectApiSlice