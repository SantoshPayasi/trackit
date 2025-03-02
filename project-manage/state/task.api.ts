import { GetTaskRequestDto, Task, updateStatusDto } from "@/app/types/task.types";
import { api } from "./api";
import { Tags } from "@/constants";

export const taskApiSlice = api.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<Task[], GetTaskRequestDto>({
            query: (data: GetTaskRequestDto) => (
                {
                    url: "tasks",
                    method: "GET",
                    params: {
                        projectId: data.projectId
                    },
                }
            ),
            transformResponse: (response: any) => response.data,
            providesTags: (result) => result ? result.map(({ id }) => ({ type: Tags.Tasks as const, id })) : [{ type: Tags.Tasks as const }]
        }),
        createNewTask: build.mutation<Task, Partial<Task>>({
            query: (task) => ({
                url: "tasks/create",
                method: "POST",
                body: task
            }),
            invalidatesTags: [Tags.Tasks]
        }),
        updateTaskStatus: build.mutation<Task, updateStatusDto>({
            query: (data: updateStatusDto) => ({
                url: "tasks/updateStatus",
                method: "PATCH",
                body: {
                    status: data.status,
                },
                params: {
                    taskId: data.taskId
                }
            }),
            transformResponse: (response: any) => response.data,
            invalidatesTags: (result, error, { taskId }) => [{ type: Tags.Tasks, id: taskId }]
        })
    }),
})


export const { useCreateNewTaskMutation, useGetTasksQuery, useUpdateTaskStatusMutation } = taskApiSlice