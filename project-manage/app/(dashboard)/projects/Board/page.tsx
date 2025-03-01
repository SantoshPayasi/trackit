"use client"
import React from 'react'
import { Task, Status as TaskStatus } from '@/app/types/task.types'
import { useGetTasksQuery, useUpdateTaskStatusMutation } from '@/state/task.api';
import { DndProvider, useDrop } from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend'

type BoardProps = {
    id: string,
    setIsModelNewTaskOpen: (isOpen: boolean) => void;
}
const page = ({ id, setIsModelNewTaskOpen }: BoardProps) => {
    const { data: tasks, isLoading, error } = useGetTasksQuery({ projectId: Number(id) })

    const [updateTaskStatus] = useUpdateTaskStatusMutation()
    const moveTask = (taskId: number, toStatus: TaskStatus) => {
        updateTaskStatus({ taskId, status: toStatus })
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error occured during fetching the tasks</div>
    return (
        <DndProvider backend={HTML5Backend}>
            <div className='grid grid-cols-1 gap-4 p-4 md-grid-cols-2 xl:grid-cols-4'>
                {
                    Object.values(TaskStatus).map(status => (
                        <TaskColumn
                            key={status}
                            status={status}
                            tasks={tasks || []}
                            moveTask={moveTask}
                            setIsModelNewTaskOpen={setIsModelNewTaskOpen}
                        />
                    ))
                }
            </div>
        </DndProvider>
    )
}

type TaskColumnProps = {
    status: TaskStatus,
    tasks: Task[],
    moveTask: (taskId: number, toStatus: TaskStatus) => void,
    setIsModelNewTaskOpen: (isOpen: boolean) => void;
}

const TaskColumn = ({
    status,
    tasks,
    moveTask,
    setIsModelNewTaskOpen
}: TaskColumnProps) => {
    const [{ isOver }, drop] = useDrop(() => (
        {
            accept: "task",
            drop: (item: { id: number }) => moveTask(item.id, status),
            collect: (monitor: any) => ({
                isOver: !!monitor.isOver()
            })
        }
    ))

    const taskCount = tasks?.filter(task => task.status === status).length;

    const statusColor: any = {
        [TaskStatus.ToDo]: "#2563EB",
        [TaskStatus.InProgress]: "#059669",
        [TaskStatus.UnerReview]: "#D97706",
        [TaskStatus.Done]: "#000000"
    }

    return (
        <div
            ref={(instance) => {
                drop(instance)
            }}

            className={`sl:py-4 rounded-lg py-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
        >
            <div className='mb-3 flex w-full'>
                <div
                    className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
                    style={{ backgroundColor: statusColor[status] }}
                >
                </div>
                <div className='flex w-full items-center justify-center rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary'>
                    <h3 className='flex items-center text-lg font-semibold dark:text-white'>
                        {status}
                    </h3>
                </div>
            </div>

        </div>
    )
}
export default page
