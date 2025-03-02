"use client";

import { Task } from '@/app/types/task.types';
import Header from '@/components/Header';
import TaskCard from '@/components/TaskCard';
import { useGetProjectsQuery } from '@/state/project.api';
import { useGetTasksQuery } from '@/state/task.api';
import React from 'react'


type props = {
    id: number,
    setIsModelNewTaskOpen: (isOpen: boolean) => void
}

const ListView = ({ id, setIsModelNewTaskOpen }: props) => {
    const { data: tasks, error, isLoading } = useGetTasksQuery({ projectId: id })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error occured during fetching the tasks</div>

    return (
        <div className='px-4 pb-8 xl:px-6'>
            <div className='pl-5'>
                <Header name="List" />
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6'>
                {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
            </div>
            ListView
        </div>
    )
}

export default ListView
